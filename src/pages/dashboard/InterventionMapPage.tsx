import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  User, 
  Building, 
  Navigation, 
  RefreshCw,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';

const InterventionMapPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [intervention, setIntervention] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentPosition, setCurrentPosition] = useState(null);
  const [updatingPosition, setUpdatingPosition] = useState(false);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const clientMarkerRef = useRef(null);
  const technicianMarkerRef = useRef(null);

  useEffect(() => {
    fetchIntervention();
    
    // Initialize map after component mounts
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, [id]);

  const fetchIntervention = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/interventions/${id}`);
      setIntervention(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching intervention:', err);
      setError('Erreur lors du chargement de l\'intervention');
      setLoading(false);
    }
  };

  const initializeMap = () => {
    if (!window.google || !intervention) return;
    
    const clientLocation = intervention.location?.coordinates;
    const technicianLocation = intervention.technicianLocation;
    
    if (!clientLocation) {
      setError('Coordonnées du client non disponibles');
      return;
    }
    
    // Create map centered on client location
    const mapOptions = {
      center: { lat: clientLocation.lat, lng: clientLocation.lng },
      zoom: 13,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP
    };
    
    const map = new window.google.maps.Map(mapRef.current, mapOptions);
    mapInstanceRef.current = map;
    
    // Add client marker
    const clientMarker = new window.google.maps.Marker({
      position: { lat: clientLocation.lat, lng: clientLocation.lng },
      map: map,
      title: intervention.clientId?.name || 'Client',
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
      }
    });
    clientMarkerRef.current = clientMarker;
    
    // Add info window for client
    const clientInfoWindow = new window.google.maps.InfoWindow({
      content: `
        <div>
          <h3 style="font-weight: bold; margin-bottom: 5px;">${intervention.clientId?.name || 'Client'}</h3>
          <p style="margin: 0;">${intervention.location?.address}</p>
        </div>
      `
    });
    
    clientMarker.addListener('click', () => {
      clientInfoWindow.open(map, clientMarker);
    });
    
    // Add technician marker if location is available
    if (technicianLocation) {
      const techMarker = new window.google.maps.Marker({
        position: { lat: technicianLocation.lat, lng: technicianLocation.lng },
        map: map,
        title: `${intervention.technicianId?.firstName} ${intervention.technicianId?.lastName}` || 'Technicien',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
        }
      });
      technicianMarkerRef.current = techMarker;
      
      // Add info window for technician
      const techInfoWindow = new window.google.maps.InfoWindow({
        content: `
          <div>
            <h3 style="font-weight: bold; margin-bottom: 5px;">${intervention.technicianId?.firstName} ${intervention.technicianId?.lastName}</h3>
            <p style="margin: 0;">Dernière mise à jour: ${new Date(technicianLocation.lastUpdated).toLocaleString()}</p>
          </div>
        `
      });
      
      techMarker.addListener('click', () => {
        techInfoWindow.open(map, techMarker);
      });
      
      // Fit bounds to include both markers
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(clientMarker.getPosition());
      bounds.extend(techMarker.getPosition());
      map.fitBounds(bounds);
    }
  };

  const updateTechnicianLocation = async () => {
    if (!navigator.geolocation) {
      setError('La géolocalisation n\'est pas supportée par votre navigateur');
      return;
    }
    
    setUpdatingPosition(true);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
        
        try {
          const response = await axios.put(`/interventions/${id}/location`, {
            lat: latitude,
            lng: longitude
          });
          
          setIntervention(response.data);
          setSuccess('Position mise à jour avec succès');
          
          // Update marker on map
          if (mapInstanceRef.current && technicianMarkerRef.current) {
            const newPosition = { lat: latitude, lng: longitude };
            technicianMarkerRef.current.setPosition(newPosition);
            
            // Update info window content
            const techInfoWindow = new window.google.maps.InfoWindow({
              content: `
                <div>
                  <h3 style="font-weight: bold; margin-bottom: 5px;">${intervention.technicianId?.firstName} ${intervention.technicianId?.lastName}</h3>
                  <p style="margin: 0;">Dernière mise à jour: ${new Date().toLocaleString()}</p>
                </div>
              `
            });
            
            technicianMarkerRef.current.addListener('click', () => {
              techInfoWindow.open(mapInstanceRef.current, technicianMarkerRef.current);
            });
            
            // Fit bounds to include both markers
            const bounds = new window.google.maps.LatLngBounds();
            bounds.extend(clientMarkerRef.current.getPosition());
            bounds.extend(technicianMarkerRef.current.getPosition());
            mapInstanceRef.current.fitBounds(bounds);
          }
          
          setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
          console.error('Error updating technician location:', err);
          setError('Erreur lors de la mise à jour de la position');
          setTimeout(() => setError(''), 3000);
        } finally {
          setUpdatingPosition(false);
        }
      },
      (err) => {
        console.error('Geolocation error:', err);
        setError('Erreur de géolocalisation: ' + err.message);
        setUpdatingPosition(false);
        setTimeout(() => setError(''), 3000);
      },
      { enableHighAccuracy: true }
    );
  };

  const getDirectionsUrl = () => {
    if (!intervention?.location?.coordinates) return '#';
    
    const destination = `${intervention.location.coordinates.lat},${intervention.location.coordinates.lng}`;
    return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error && !intervention) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (!intervention) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>Intervention non trouvée</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => navigate(`/dashboard/interventions/${id}`)}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Carte d'intervention</h1>
          </div>
          
          <div className="flex space-x-2">
            {user?.role === 'technicien' && intervention.technicianId?._id === user.id && (
              <button 
                onClick={updateTechnicianLocation}
                disabled={updatingPosition}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-70"
              >
                {updatingPosition ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    <span>Mise à jour...</span>
                  </>
                ) : (
                  <>
                    <MapPin className="h-5 w-5" />
                    <span>Mettre à jour ma position</span>
                  </>
                )}
              </button>
            )}
            
            <a 
              href={getDirectionsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Navigation className="h-5 w-5" />
              <span>Itinéraire</span>
            </a>
          </div>
        </div>

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Map */}
          <div className="md:col-span-2">
            <div 
              ref={mapRef} 
              className="w-full h-[500px] rounded-lg border border-gray-300"
            >
              {!window.google && (
                <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
                  <p className="text-gray-500">Chargement de la carte...</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Intervention Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">{intervention.title}</h2>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                  <span>{new Date(intervention.scheduledDate).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
                
                <div className="flex items-start text-sm">
                  <MapPin className="h-4 w-4 text-gray-500 mr-2 mt-1" />
                  <span>{intervention.location?.address}</span>
                </div>
              </div>
            </div>
            
            {/* Client Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Building className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="font-semibold text-gray-900">Client</h3>
              </div>
              
              <div className="space-y-2 pl-7">
                <div className="text-sm font-medium">{intervention.clientId?.name}</div>
                <div className="text-sm text-gray-600">{intervention.clientId?.phone}</div>
                <div className="text-sm text-gray-600">{intervention.clientId?.email}</div>
              </div>
            </div>
            
            {/* Technician Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <User className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="font-semibold text-gray-900">Technicien</h3>
              </div>
              
              <div className="space-y-2 pl-7">
                <div className="text-sm font-medium">
                  {intervention.technicianId?.firstName} {intervention.technicianId?.lastName}
                </div>
                <div className="text-sm text-gray-600">{intervention.technicianId?.phone}</div>
                <div className="text-sm text-gray-600">{intervention.technicianId?.email}</div>
                
                {intervention.technicianLocation && (
                  <div className="text-xs text-gray-500 mt-2">
                    Dernière position mise à jour:<br />
                    {new Date(intervention.technicianLocation.lastUpdated).toLocaleString()}
                  </div>
                )}
              </div>
            </div>
            
            {/* Legend */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Légende</h3>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm">Client</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Technicien</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterventionMapPage;