import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Plus, Trash2, Save, AlertCircle, CheckCircle } from 'lucide-react';

const DisponibilitesPage = () => {
  const [disponibilite, setDisponibilite] = useState('disponible');
  const [indisponibilites, setIndisponibilites] = useState([
    { date: '2025-05-15', heureDebut: '09:00', heureFin: '12:00', motif: 'Rendez-vous personnel' },
    { date: '2025-05-20', heureDebut: '14:00', heureFin: '18:00', motif: 'Formation' }
  ]);
  const [newIndisponibilite, setNewIndisponibilite] = useState({
    date: '',
    heureDebut: '09:00',
    heureFin: '18:00',
    motif: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleDisponibiliteChange = (e) => {
    setDisponibilite(e.target.value);
  };

  const handleNewIndisponibiliteChange = (e) => {
    const { name, value } = e.target;
    setNewIndisponibilite(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addIndisponibilite = () => {
    // Validate form
    if (!newIndisponibilite.date || !newIndisponibilite.heureDebut || !newIndisponibilite.heureFin) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    setIndisponibilites(prev => [...prev, { ...newIndisponibilite }]);
    setNewIndisponibilite({
      date: '',
      heureDebut: '09:00',
      heureFin: '18:00',
      motif: ''
    });
    setSuccess('Indisponibilité ajoutée avec succès');
    setTimeout(() => setSuccess(''), 3000);
  };

  const removeIndisponibilite = (index) => {
    setIndisponibilites(prev => prev.filter((_, i) => i !== index));
    setSuccess('Indisponibilité supprimée avec succès');
    setTimeout(() => setSuccess(''), 3000);
  };

  const saveDisponibilites = () => {
    // In a real app, you would save the disponibilites to the server here
    setSuccess('Disponibilités enregistrées avec succès');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Gestion des disponibilités</h1>
        
        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        )}
        
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Statut général</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="disponible"
                name="disponibilite"
                value="disponible"
                checked={disponibilite === 'disponible'}
                onChange={handleDisponibiliteChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="disponible" className="ml-2 block text-sm text-gray-700">
                Je suis disponible (par défaut)
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="indisponible"
                name="disponibilite"
                value="indisponible"
                checked={disponibilite === 'indisponible'}
                onChange={handleDisponibiliteChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="indisponible" className="ml-2 block text-sm text-gray-700">
                Je suis indisponible
              </label>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Périodes d'indisponibilité</h2>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-md font-medium text-gray-900 mb-3">Ajouter une indisponibilité</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={newIndisponibilite.date}
                    onChange={handleNewIndisponibiliteChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="heureDebut" className="block text-sm font-medium text-gray-700 mb-2">
                  Heure de début *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="time"
                    id="heureDebut"
                    name="heureDebut"
                    value={newIndisponibilite.heureDebut}
                    onChange={handleNewIndisponibiliteChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="heureFin" className="block text-sm font-medium text-gray-700 mb-2">
                  Heure de fin *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="time"
                    id="heureFin"
                    name="heureFin"
                    value={newIndisponibilite.heureFin}
                    onChange={handleNewIndisponibiliteChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="motif" className="block text-sm font-medium text-gray-700 mb-2">
                  Motif
                </label>
                <input
                  type="text"
                  id="motif"
                  name="motif"
                  value={newIndisponibilite.motif}
                  onChange={handleNewIndisponibiliteChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Optionnel"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <button
                type="button"
                onClick={addIndisponibilite}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Ajouter</span>
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium text-gray-900 mb-3">Indisponibilités planifiées</h3>
            {indisponibilites.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Heure de début
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Heure de fin
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Motif
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {indisponibilites.map((indispo, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(indispo.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {indispo.heureDebut}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {indispo.heureFin}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {indispo.motif || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => removeIndisponibilite(index)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                Aucune indisponibilité planifiée
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={saveDisponibilites}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Save className="h-5 w-5" />
            <span>Enregistrer les disponibilités</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisponibilitesPage;