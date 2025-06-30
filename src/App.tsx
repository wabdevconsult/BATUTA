import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MetiersLanding from './pages/MetiersLanding';
import Fonctionnalites from './pages/Fonctionnalites';
import Contact from './pages/Contact';
import PageAccueilPersonnalisee from './pages/PageAccueilPersonnalisee';

// Auth pages
import AuthLogin from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Unauthorized from './pages/Unauthorized';

// Dashboard pages
import DashboardLayout from './components/layout/DashboardLayout';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import TechnicienDashboard from './pages/dashboard/TechnicienDashboard';
import ClientDashboard from './pages/dashboard/ClientDashboard';
import FournisseurDashboard from './pages/dashboard/FournisseurDashboard';
import MessagesPage from './pages/dashboard/MessagesPage';

// Auth guard
import AuthGuard from './components/auth/AuthGuard';

// Import all 49 professional pagesimport React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MetiersLanding from './pages/MetiersLanding';
import Fonctionnalites from './pages/Fonctionnalites';
import Contact from './pages/Contact';
import Login from './pages/Login';
import PageAccueilPersonnalisee from './pages/PageAccueilPersonnalisee';

// Auth pages
import AuthLogin from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Unauthorized from './pages/Unauthorized';

// Dashboard pages
import DashboardLayout from './components/layout/DashboardLayout';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import TechnicienDashboard from './pages/dashboard/TechnicienDashboard';
import ClientDashboard from './pages/dashboard/ClientDashboard';
import FournisseurDashboard from './pages/dashboard/FournisseurDashboard';

// Auth guard
import AuthGuard from './components/auth/AuthGuard';

// Import all 49 professional pages
import AutoEntrepreneurs from './pages/metiers/AutoEntrepreneurs';
import Garagistes from './pages/metiers/Garagistes';
import IRVE from './pages/metiers/IRVE';
import MaintenanceHydraulique from './pages/metiers/MaintenanceHydraulique';
import Domotique from './pages/metiers/Domotique';
import Electriciens from './pages/metiers/Electriciens';
import Plombiers from './pages/metiers/Plombiers';
import Chauffagistes from './pages/metiers/Chauffagistes';
import Climaticiens from './pages/metiers/Climaticiens';
import Ventilation from './pages/metiers/Ventilation';
import Frigoristes from './pages/metiers/Frigoristes';
import Serruriers from './pages/metiers/Serruriers';
import Menuisiers from './pages/metiers/Menuisiers';
import Cuisinistes from './pages/metiers/Cuisinistes';
import TousCorpsEtat from './pages/metiers/TousCorpsEtat';
import MultiServices from './pages/metiers/MultiServices';
import EnergiesRenouvelables from './pages/metiers/EnergiesRenouvelables';
import Photovoltaiques from './pages/metiers/Photovoltaiques';
import Irrigation from './pages/metiers/Irrigation';
import Assainissement from './pages/metiers/Assainissement';
import Paysagistes from './pages/metiers/Paysagistes';
import Piscinistes from './pages/metiers/Piscinistes';
import SocietesDeMenage from './pages/metiers/SocietesDeMenage';
import LutteNuisibles from './pages/metiers/LutteNuisibles';
import Ramoneurs from './pages/metiers/Ramoneurs';
import Peintres from './pages/metiers/Peintres';
import CrmClients from './pages/metiers/CrmClients';
import PortailClient from './pages/metiers/PortailClient';
import GestionDepenses from './pages/metiers/GestionDepenses';
import SuiviTresorerie from './pages/metiers/SuiviTresorerie';
import SignatureElectronique from './pages/metiers/SignatureElectronique';
import PlanningPartage from './pages/metiers/PlanningPartage';
import MaintenanceEquipements from './pages/metiers/MaintenanceEquipements';
import BibliothequePrice from './pages/metiers/BibliothequePrice';
import GestionTechniciens from './pages/metiers/GestionTechniciens';
import PilotageChantiers from './pages/metiers/PilotageChantiers';
import RapportsIntervention from './pages/metiers/RapportsIntervention';
import SuiviStock from './pages/metiers/SuiviStock';
import PilotageActivite from './pages/metiers/PilotageActivite';
import GestionDocuments from './pages/metiers/GestionDocuments';
import HorodatageGeolocalisation from './pages/metiers/HorodatageGeolocalisation';
import Automatisations from './pages/metiers/Automatisations';
import Cerfa15497 from './pages/metiers/Cerfa15497';
import MarketplaceSimulateurs from './pages/metiers/MarketplaceSimulateurs';
import SimulateurBuilder from './pages/metiers/SimulateurBuilder';
import PaiementEnLigne from './pages/metiers/PaiementEnLigne';
import FAQ from './pages/metiers/FAQ';
import ContactMetiers from './pages/metiers/ContactMetiers';
import DemanderDevis from './pages/metiers/DemanderDevis';

// Dashboard pages
import UserProfile from './pages/dashboard/UserProfile';
import UserSettings from './pages/dashboard/UserSettings';
import UserPersonalization from './pages/dashboard/UserPersonalization';
import DisponibilitesPage from './pages/dashboard/DisponibilitesPage';
import DevisPage from './pages/dashboard/DevisPage';
import FacturesPage from './pages/dashboard/FacturesPage';
import PaiementsPage from './pages/dashboard/PaiementsPage';
import UsersPage from './pages/dashboard/UsersPage';
import ProduitsPage from './pages/dashboard/ProduitsPage';
import CommandesPage from './pages/dashboard/CommandesPage';
import LivraisonsPage from './pages/dashboard/LivraisonsPage';

import { useAuthStore } from './store/authStore';

function App() {
  const { user } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes with Header and Footer */}
          <Route path="/" element={
            <>
              <Header />
              <main className="flex-1">
                <Home />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers" element={
            <>
              <Header />
              <main className="flex-1">
                <MetiersLanding />
              </main>
              <Footer />
            </>
          } />
          <Route path="/fonctionnalites" element={
            <>
              <Header />
              <main className="flex-1">
                <Fonctionnalites />
              </main>
              <Footer />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Header />
              <main className="flex-1">
                <Contact />
              </main>
              <Footer />
            </>
          } />
          <Route path="/login" element={
            <>
              <Header />
              <main className="flex-1">
                <Login />
              </main>
              <Footer />
            </>
          } />
          <Route path="/personnaliser" element={
            <>
              <Header />
              <main className="flex-1">
                <PageAccueilPersonnalisee />
              </main>
              <Footer />
            </>
          } />
          
          {/* Auth Routes without Header and Footer */}
          <Route path="/auth/login" element={<AuthLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* Dashboard Routes with AuthGuard */}
          <Route path="/dashboard" element={
            <AuthGuard>
              <DashboardLayout>
                <DashboardRouter />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          {/* Dashboard Sub-Routes */}
          <Route path="/dashboard/profile" element={
            <AuthGuard>
              <DashboardLayout>
                <UserProfile />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/settings" element={
            <AuthGuard>
              <DashboardLayout>
                <UserSettings />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/personalization" element={
            <AuthGuard>
              <DashboardLayout>
                <UserPersonalization />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/disponibilites" element={
            <AuthGuard allowedRoles={['technicien']}>
              <DashboardLayout>
                <DisponibilitesPage />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/devis" element={
            <AuthGuard>
              <DashboardLayout>
                <DevisPage />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/factures" element={
            <AuthGuard>
              <DashboardLayout>
                <FacturesPage />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/paiements" element={
            <AuthGuard>
              <DashboardLayout>
                <PaiementsPage />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/users" element={
            <AuthGuard allowedRoles={['admin']}>
              <DashboardLayout>
                <UsersPage />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/produits" element={
            <AuthGuard allowedRoles={['fournisseur']}>
              <DashboardLayout>
                <ProduitsPage />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/commandes" element={
            <AuthGuard allowedRoles={['fournisseur']}>
              <DashboardLayout>
                <CommandesPage />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/livraisons" element={
            <AuthGuard allowedRoles={['fournisseur']}>
              <DashboardLayout>
                <LivraisonsPage />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          {/* Professional Services Routes with Header and Footer */}
          <Route path="/metiers/auto-entrepreneurs" element={
            <>
              <Header />
              <main className="flex-1">
                <AutoEntrepreneurs />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/garagistes" element={
            <>
              <Header />
              <main className="flex-1">
                <Garagistes />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/irve" element={
            <>
              <Header />
              <main className="flex-1">
                <IRVE />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/maintenance-hydraulique" element={
            <>
              <Header />
              <main className="flex-1">
                <MaintenanceHydraulique />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/domotique" element={
            <>
              <Header />
              <main className="flex-1">
                <Domotique />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/electriciens" element={
            <>
              <Header />
              <main className="flex-1">
                <Electriciens />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/plombiers" element={
            <>
              <Header />
              <main className="flex-1">
                <Plombiers />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/chauffagistes" element={
            <>
              <Header />
              <main className="flex-1">
                <Chauffagistes />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/climaticiens" element={
            <>
              <Header />
              <main className="flex-1">
                <Climaticiens />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/ventilation" element={
            <>
              <Header />
              <main className="flex-1">
                <Ventilation />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/frigoristes" element={
            <>
              <Header />
              <main className="flex-1">
                <Frigoristes />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/serruriers" element={
            <>
              <Header />
              <main className="flex-1">
                <Serruriers />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/menuisiers" element={
            <>
              <Header />
              <main className="flex-1">
                <Menuisiers />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/cuisinistes" element={
            <>
              <Header />
              <main className="flex-1">
                <Cuisinistes />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/tous-corps-etat" element={
            <>
              <Header />
              <main className="flex-1">
                <TousCorpsEtat />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/multi-services" element={
            <>
              <Header />
              <main className="flex-1">
                <MultiServices />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/energies-renouvelables" element={
            <>
              <Header />
              <main className="flex-1">
                <EnergiesRenouvelables />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/photovoltaiques" element={
            <>
              <Header />
              <main className="flex-1">
                <Photovoltaiques />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/irrigation" element={
            <>
              <Header />
              <main className="flex-1">
                <Irrigation />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/assainissement" element={
            <>
              <Header />
              <main className="flex-1">
                <Assainissement />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/paysagistes" element={
            <>
              <Header />
              <main className="flex-1">
                <Paysagistes />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/piscinistes" element={
            <>
              <Header />
              <main className="flex-1">
                <Piscinistes />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/societes-de-menage" element={
            <>
              <Header />
              <main className="flex-1">
                <SocietesDeMenage />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/lutte-nuisibles" element={
            <>
              <Header />
              <main className="flex-1">
                <LutteNuisibles />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/ramoneurs" element={
            <>
              <Header />
              <main className="flex-1">
                <Ramoneurs />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/peintres" element={
            <>
              <Header />
              <main className="flex-1">
                <Peintres />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/crm-clients" element={
            <>
              <Header />
              <main className="flex-1">
                <CrmClients />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/portail-client" element={
            <>
              <Header />
              <main className="flex-1">
                <PortailClient />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/gestion-depenses" element={
            <>
              <Header />
              <main className="flex-1">
                <GestionDepenses />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/suivi-tresorerie" element={
            <>
              <Header />
              <main className="flex-1">
                <SuiviTresorerie />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/signature-electronique" element={
            <>
              <Header />
              <main className="flex-1">
                <SignatureElectronique />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/planning-partage" element={
            <>
              <Header />
              <main className="flex-1">
                <PlanningPartage />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/maintenance-equipements" element={
            <>
              <Header />
              <main className="flex-1">
                <MaintenanceEquipements />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/bibliotheque-prix" element={
            <>
              <Header />
              <main className="flex-1">
                <BibliothequePrice />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/gestion-techniciens" element={
            <>
              <Header />
              <main className="flex-1">
                <GestionTechniciens />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/pilotage-chantiers" element={
            <>
              <Header />
              <main className="flex-1">
                <PilotageChantiers />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/rapports-intervention" element={
            <>
              <Header />
              <main className="flex-1">
                <RapportsIntervention />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/suivi-stock" element={
            <>
              <Header />
              <main className="flex-1">
                <SuiviStock />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/pilotage-activite" element={
            <>
              <Header />
              <main className="flex-1">
                <PilotageActivite />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/gestion-documents" element={
            <>
              <Header />
              <main className="flex-1">
                <GestionDocuments />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/horodatage-geolocalisation" element={
            <>
              <Header />
              <main className="flex-1">
                <HorodatageGeolocalisation />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/automatisations" element={
            <>
              <Header />
              <main className="flex-1">
                <Automatisations />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/cerfa-15497" element={
            <>
              <Header />
              <main className="flex-1">
                <Cerfa15497 />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/marketplace-simulateurs" element={
            <>
              <Header />
              <main className="flex-1">
                <MarketplaceSimulateurs />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/simulateur-builder" element={
            <>
              <Header />
              <main className="flex-1">
                <SimulateurBuilder />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/paiement-en-ligne" element={
            <>
              <Header />
              <main className="flex-1">
                <PaiementEnLigne />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/faq" element={
            <>
              <Header />
              <main className="flex-1">
                <FAQ />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/contact" element={
            <>
              <Header />
              <main className="flex-1">
                <ContactMetiers />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/demander-devis" element={
            <>
              <Header />
              <main className="flex-1">
                <DemanderDevis />
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

// Component to route to the correct dashboard based on user role
const DashboardRouter = () => {
  const { user } = useAuthStore();
  
  switch (user?.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'technicien':
      return <TechnicienDashboard />;
    case 'client':
      return <ClientDashboard />;
    case 'fournisseur':
      return <FournisseurDashboard />;
    default:
      return <Navigate to="/auth/login" />;
  }
};

export default App;
import AutoEntrepreneurs from './pages/metiers/AutoEntrepreneurs';
import Garagistes from './pages/metiers/Garagistes';
import IRVE from './pages/metiers/IRVE';
import MaintenanceHydraulique from './pages/metiers/MaintenanceHydraulique';
import Domotique from './pages/metiers/Domotique';
import Electriciens from './pages/metiers/Electriciens';
import Plombiers from './pages/metiers/Plombiers';
import Chauffagistes from './pages/metiers/Chauffagistes';
import Climaticiens from './pages/metiers/Climaticiens';
import Ventilation from './pages/metiers/Ventilation';
import Frigoristes from './pages/metiers/Frigoristes';
import Serruriers from './pages/metiers/Serruriers';
import Menuisiers from './pages/metiers/Menuisiers';
import Cuisinistes from './pages/metiers/Cuisinistes';
import TousCorpsEtat from './pages/metiers/TousCorpsEtat';
import MultiServices from './pages/metiers/MultiServices';
import EnergiesRenouvelables from './pages/metiers/EnergiesRenouvelables';
import Photovoltaiques from './pages/metiers/Photovoltaiques';
import Irrigation from './pages/metiers/Irrigation';
import Assainissement from './pages/metiers/Assainissement';
import Paysagistes from './pages/metiers/Paysagistes';
import Piscinistes from './pages/metiers/Piscinistes';
import SocietesDeMenage from './pages/metiers/SocietesDeMenage';
import LutteNuisibles from './pages/metiers/LutteNuisibles';
import Ramoneurs from './pages/metiers/Ramoneurs';
import Peintres from './pages/metiers/Peintres';
import CrmClients from './pages/metiers/CrmClients';
import PortailClient from './pages/metiers/PortailClient';
import GestionDepenses from './pages/metiers/GestionDepenses';
import SuiviTresorerie from './pages/metiers/SuiviTresorerie';
import SignatureElectronique from './pages/metiers/SignatureElectronique';
import PlanningPartage from './pages/metiers/PlanningPartage';
import MaintenanceEquipements from './pages/metiers/MaintenanceEquipements';
import BibliothequePrice from './pages/metiers/BibliothequePrice';
import GestionTechniciens from './pages/metiers/GestionTechniciens';
import PilotageChantiers from './pages/metiers/PilotageChantiers';
import RapportsIntervention from './pages/metiers/RapportsIntervention';
import SuiviStock from './pages/metiers/SuiviStock';
import PilotageActivite from './pages/metiers/PilotageActivite';
import GestionDocuments from './pages/metiers/GestionDocuments';
import HorodatageGeolocalisation from './pages/metiers/HorodatageGeolocalisation';
import Automatisations from './pages/metiers/Automatisations';
import Cerfa15497 from './pages/metiers/Cerfa15497';
import MarketplaceSimulateurs from './pages/metiers/MarketplaceSimulateurs';
import SimulateurBuilder from './pages/metiers/SimulateurBuilder';
import PaiementEnLigne from './pages/metiers/PaiementEnLigne';
import FAQ from './pages/metiers/FAQ';
import ContactMetiers from './pages/metiers/ContactMetiers';
import DemanderDevis from './pages/metiers/DemanderDevis';

// Dashboard pages
import UserProfile from './pages/dashboard/UserProfile';
import UserSettings from './pages/dashboard/UserSettings';
import UserPersonalization from './pages/dashboard/UserPersonalization';
import DisponibilitesPage from './pages/dashboard/DisponibilitesPage';
import DevisPage from './pages/dashboard/DevisPage';
import FacturesPage from './pages/dashboard/FacturesPage';
import PaiementsPage from './pages/dashboard/PaiementsPage';
import UsersPage from './pages/dashboard/UsersPage';
import ProduitsPage from './pages/dashboard/ProduitsPage';
import CommandesPage from './pages/dashboard/CommandesPage';
import LivraisonsPage from './pages/dashboard/LivraisonsPage';
import QuoteRequestsPage from './pages/dashboard/QuoteRequestsPage';
import InterventionsPage from './pages/dashboard/InterventionsPage';
import InterventionDetailPage from './pages/dashboard/InterventionDetailPage';
import InterventionMapPage from './pages/dashboard/InterventionMapPage';
import InterventionFormPage from './pages/dashboard/InterventionFormPage';
import EquipmentsPage from './pages/dashboard/EquipmentsPage';
import EquipmentDetailPage from './pages/dashboard/EquipmentDetailPage';
import EquipmentFormPage from './pages/dashboard/EquipmentFormPage';
import InstallationsPage from './pages/dashboard/InstallationsPage';
import InstallationDetailPage from './pages/dashboard/InstallationDetailPage';
import InstallationFormPage from './pages/dashboard/InstallationFormPage';

import { useAuthStore } from './store/authStore';

function App() {
  const { user } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes with Header and Footer */}
          <Route path="/" element={
            <>
              <Header />
              <main className="flex-1">
                <Home />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers" element={
            <>
              <Header />
              <main className="flex-1">
                <MetiersLanding />
              </main>
              <Footer />
            </>
          } />
          <Route path="/fonctionnalites" element={
            <>
              <Header />
              <main className="flex-1">
                <Fonctionnalites />
              </main>
              <Footer />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Header />
              <main className="flex-1">
                <Contact />
              </main>
              <Footer />
            </>
          } />
          <Route path="/personnaliser" element={
            <>
              <Header />
              <main className="flex-1">
                <PageAccueilPersonnalisee />
              </main>
              <Footer />
            </>
          } />
          
          {/* Auth Routes without Header and Footer */}
          <Route path="/auth/login" element={<AuthLogin />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* Dashboard Routes with AuthGuard */}
          <Route path="/dashboard" element={
            <AuthGuard>
              <DashboardLayout>
                <DashboardRouter />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          {/* Dashboard Sub-Routes */}
          <Route path="/dashboard/profile" element={
            <AuthGuard>
              <DashboardLayout>
                <UserProfile />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/settings" element={
            <AuthGuard>
              <DashboardLayout>
                <UserSettings />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/personalization" element={
            <AuthGuard>
              <DashboardLayout>
                <UserPersonalization />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/messages" element={
            <AuthGuard>
              <DashboardLayout>
                <MessagesPage />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/disponibilites" element={
            <AuthGuard allowedRoles={['technicien']}>
              <DashboardLayout>
                <DisponibilitesPage />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/devis" element={
            <AuthGuard>
              <DashboardLayout>
                <DevisPage />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/factures" element={
            <AuthGuard>
              <DashboardLayout>
                <FacturesPage />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/paiements" element={
            <AuthGuard>
              <DashboardLayout>
                <PaiementsPage />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/users" element={
            <AuthGuard allowedRoles={['admin']}>
              <DashboardLayout>
                <UsersPage />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/produits" element={
            <AuthGuard allowedRoles={['fournisseur']}>
              <DashboardLayout>
                <ProduitsPage />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/commandes" element={
            <AuthGuard allowedRoles={['fournisseur']}>
              <DashboardLayout>
                <CommandesPage />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/livraisons" element={
            <AuthGuard allowedRoles={['fournisseur']}>
              <DashboardLayout>
                <LivraisonsPage />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/quote-requests" element={
            <AuthGuard allowedRoles={['admin', 'technicien']}>
              <DashboardLayout>
                <QuoteRequestsPage />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/interventions" element={
            <AuthGuard>
              <DashboardLayout>
                <InterventionsPage />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/interventions/new" element={
            <AuthGuard allowedRoles={['admin', 'technicien']}>
              <DashboardLayout>
                <InterventionFormPage />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/interventions/:id" element={
            <AuthGuard>
              <DashboardLayout>
                <InterventionDetailPage />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/interventions/:id/edit" element={
            <AuthGuard allowedRoles={['admin', 'technicien']}>
              <DashboardLayout>
                <InterventionFormPage />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/interventions/:id/map" element={
            <AuthGuard>
              <DashboardLayout>
                <InterventionMapPage />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/equipments" element={
            <AuthGuard>
              <DashboardLayout>
                <EquipmentsPage />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/equipments/new" element={
            <AuthGuard allowedRoles={['admin', 'technicien']}>
              <DashboardLayout>
                <EquipmentFormPage />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/equipments/:id" element={
            <AuthGuard>
              <DashboardLayout>
                <EquipmentDetailPage />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/equipments/:id/edit" element={
            <AuthGuard allowedRoles={['admin', 'technicien']}>
              <DashboardLayout>
                <EquipmentFormPage />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/installations" element={
            <AuthGuard allowedRoles={['admin', 'technicien']}>
              <DashboardLayout>
                <InstallationsPage />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/installations/new" element={
            <AuthGuard allowedRoles={['admin', 'technicien']}>
              <DashboardLayout>
                <InstallationFormPage />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/installations/:id" element={
            <AuthGuard allowedRoles={['admin', 'technicien']}>
              <DashboardLayout>
                <InstallationDetailPage />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          <Route path="/dashboard/installations/:id/edit" element={
            <AuthGuard allowedRoles={['admin', 'technicien']}>
              <DashboardLayout>
                <InstallationFormPage />
              </DashboardLayout>
            </AuthGuard>
          } />
          
          {/* Professional Services Routes with Header and Footer */}
          <Route path="/metiers/auto-entrepreneurs" element={
            <>
              <Header />
              <main className="flex-1">
                <AutoEntrepreneurs />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/garagistes" element={
            <>
              <Header />
              <main className="flex-1">
                <Garagistes />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/irve" element={
            <>
              <Header />
              <main className="flex-1">
                <IRVE />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/maintenance-hydraulique" element={
            <>
              <Header />
              <main className="flex-1">
                <MaintenanceHydraulique />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/domotique" element={
            <>
              <Header />
              <main className="flex-1">
                <Domotique />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/electriciens" element={
            <>
              <Header />
              <main className="flex-1">
                <Electriciens />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/plombiers" element={
            <>
              <Header />
              <main className="flex-1">
                <Plombiers />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/chauffagistes" element={
            <>
              <Header />
              <main className="flex-1">
                <Chauffagistes />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/climaticiens" element={
            <>
              <Header />
              <main className="flex-1">
                <Climaticiens />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/ventilation" element={
            <>
              <Header />
              <main className="flex-1">
                <Ventilation />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/frigoristes" element={
            <>
              <Header />
              <main className="flex-1">
                <Frigoristes />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/serruriers" element={
            <>
              <Header />
              <main className="flex-1">
                <Serruriers />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/menuisiers" element={
            <>
              <Header />
              <main className="flex-1">
                <Menuisiers />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/cuisinistes" element={
            <>
              <Header />
              <main className="flex-1">
                <Cuisinistes />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/tous-corps-etat" element={
            <>
              <Header />
              <main className="flex-1">
                <TousCorpsEtat />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/multi-services" element={
            <>
              <Header />
              <main className="flex-1">
                <MultiServices />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/energies-renouvelables" element={
            <>
              <Header />
              <main className="flex-1">
                <EnergiesRenouvelables />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/photovoltaiques" element={
            <>
              <Header />
              <main className="flex-1">
                <Photovoltaiques />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/irrigation" element={
            <>
              <Header />
              <main className="flex-1">
                <Irrigation />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/assainissement" element={
            <>
              <Header />
              <main className="flex-1">
                <Assainissement />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/paysagistes" element={
            <>
              <Header />
              <main className="flex-1">
                <Paysagistes />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/piscinistes" element={
            <>
              <Header />
              <main className="flex-1">
                <Piscinistes />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/societes-de-menage" element={
            <>
              <Header />
              <main className="flex-1">
                <SocietesDeMenage />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/lutte-nuisibles" element={
            <>
              <Header />
              <main className="flex-1">
                <LutteNuisibles />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/ramoneurs" element={
            <>
              <Header />
              <main className="flex-1">
                <Ramoneurs />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/peintres" element={
            <>
              <Header />
              <main className="flex-1">
                <Peintres />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/crm-clients" element={
            <>
              <Header />
              <main className="flex-1">
                <CrmClients />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/portail-client" element={
            <>
              <Header />
              <main className="flex-1">
                <PortailClient />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/gestion-depenses" element={
            <>
              <Header />
              <main className="flex-1">
                <GestionDepenses />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/suivi-tresorerie" element={
            <>
              <Header />
              <main className="flex-1">
                <SuiviTresorerie />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/signature-electronique" element={
            <>
              <Header />
              <main className="flex-1">
                <SignatureElectronique />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/planning-partage" element={
            <>
              <Header />
              <main className="flex-1">
                <PlanningPartage />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/maintenance-equipements" element={
            <>
              <Header />
              <main className="flex-1">
                <MaintenanceEquipements />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/bibliotheque-prix" element={
            <>
              <Header />
              <main className="flex-1">
                <BibliothequePrice />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/gestion-techniciens" element={
            <>
              <Header />
              <main className="flex-1">
                <GestionTechniciens />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/pilotage-chantiers" element={
            <>
              <Header />
              <main className="flex-1">
                <PilotageChantiers />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/rapports-intervention" element={
            <>
              <Header />
              <main className="flex-1">
                <RapportsIntervention />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/suivi-stock" element={
            <>
              <Header />
              <main className="flex-1">
                <SuiviStock />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/pilotage-activite" element={
            <>
              <Header />
              <main className="flex-1">
                <PilotageActivite />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/gestion-documents" element={
            <>
              <Header />
              <main className="flex-1">
                <GestionDocuments />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/horodatage-geolocalisation" element={
            <>
              <Header />
              <main className="flex-1">
                <HorodatageGeolocalisation />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/automatisations" element={
            <>
              <Header />
              <main className="flex-1">
                <Automatisations />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/cerfa-15497" element={
            <>
              <Header />
              <main className="flex-1">
                <Cerfa15497 />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/marketplace-simulateurs" element={
            <>
              <Header />
              <main className="flex-1">
                <MarketplaceSimulateurs />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/simulateur-builder" element={
            <>
              <Header />
              <main className="flex-1">
                <SimulateurBuilder />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/paiement-en-ligne" element={
            <>
              <Header />
              <main className="flex-1">
                <PaiementEnLigne />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/faq" element={
            <>
              <Header />
              <main className="flex-1">
                <FAQ />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/contact" element={
            <>
              <Header />
              <main className="flex-1">
                <ContactMetiers />
              </main>
              <Footer />
            </>
          } />
          <Route path="/metiers/demander-devis" element={
            <>
              <Header />
              <main className="flex-1">
                <DemanderDevis />
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

// Component to route to the correct dashboard based on user role
const DashboardRouter = () => {
  const { user } = useAuthStore();
  
  switch (user?.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'technicien':
      return <TechnicienDashboard />;
    case 'client':
      return <ClientDashboard />;
    case 'fournisseur':
      return <FournisseurDashboard />;
    default:
      return <Navigate to="/auth/login" />;
  }
};

export default App;