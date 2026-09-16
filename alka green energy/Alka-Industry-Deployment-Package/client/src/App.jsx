import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import { ProtectedRoute, AdminRoute } from './components/common/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ResidentialSolar from './pages/ResidentialSolar';
import CommercialSolar from './pages/CommercialSolar';
import IndustrialSolar from './pages/IndustrialSolar';
import Projects from './pages/Projects';
import Gallery from './pages/Gallery';
import GovernmentSchemes from './pages/GovernmentSchemes';
import FAQPage from './pages/FAQPage';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';

// Dashboard Placeholders
function UserDashboardPlaceholder() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 text-center space-y-4">
      <h1 className="text-3xl font-bold text-slate-900">Customer Dashboard</h1>
      <p className="text-slate-600">Welcome to your Alka Green Energy Solar Solutions customer portal.</p>
    </div>
  );
}

function AdminDashboardPlaceholder() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 text-center space-y-4">
      <h1 className="text-3xl font-bold text-slate-900">Administrator Control Center</h1>
      <p className="text-slate-600">Alka Green Energy Solar Solutions management portal.</p>
    </div>
  );
}

import SolarRooftopPortal from './pages/SolarRooftopPortal';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<SolarRooftopPortal />} />
            <Route path="rooftop" element={<SolarRooftopPortal />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="services/residential" element={<ResidentialSolar />} />
            <Route path="services/commercial" element={<CommercialSolar />} />
            <Route path="services/industrial" element={<IndustrialSolar />} />
            <Route path="projects" element={<Projects />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="government-schemes" element={<GovernmentSchemes />} />
            <Route path="faq" element={<FAQPage />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            {/* Dashboard & Admin Portal */}
            <Route path="dashboard" element={<SolarRooftopPortal />} />
            <Route path="admin" element={<SolarRooftopPortal />} />

            <Route path="*" element={<SolarRooftopPortal />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
