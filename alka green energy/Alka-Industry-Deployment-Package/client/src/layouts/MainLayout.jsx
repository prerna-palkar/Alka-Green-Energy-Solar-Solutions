import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import FloatingActions from '../components/common/FloatingActions';
import Chatbot from '../components/common/Chatbot';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased selection:bg-emerald-500 selection:text-white">
      {/* Persistent Header Navbar */}
      <Navbar />

      {/* Main Page Route Viewport */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Persistent Floating Quick Buttons (WhatsApp & Call) */}
      <FloatingActions />

      {/* Persistent Virtual Lead Chatbot */}
      <Chatbot />

      {/* Persistent Footer */}
      <Footer />
    </div>
  );
}
