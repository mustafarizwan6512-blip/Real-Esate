/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import MobileStickyBar from './components/MobileStickyBar';
import AdminLayout from './components/admin/AdminLayout';
import Login from './pages/admin/Login';
import ResetPassword from './pages/admin/ResetPassword';
import Dashboard from './pages/admin/Dashboard';
import Leads from './pages/admin/Leads';
import Properties from './pages/admin/Properties';
import PropertyEditor from './pages/admin/PropertyEditor';
import Developers from './pages/admin/Developers';
import DeveloperEditor from './pages/admin/DeveloperEditor';
import WebsiteContent from './pages/admin/WebsiteContent';
import ClientSearch from './pages/admin/ClientSearch';
import MediaLibrary from './pages/admin/MediaLibrary';
import Settings from './pages/admin/Settings';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      {children}
    </main>
    <MobileStickyBar />
    <Footer />
  </div>
);

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/projects" element={<PublicLayout><Projects /></PublicLayout>} />
        <Route path="/projects/:id" element={<PublicLayout><ProjectDetail /></PublicLayout>} />
        <Route path="/properties/:id" element={<PublicLayout><ProjectDetail /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        
        {/* Admin Authentication Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/reset-password" element={<ResetPassword />} />

        {/* Admin Protected Dashboard Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="properties" element={<Properties />} />
          <Route path="properties/new" element={<PropertyEditor />} />
          <Route path="properties/:id" element={<PropertyEditor />} />
          <Route path="search" element={<ClientSearch />} />
          <Route path="leads" element={<Leads />} />
          <Route path="developers" element={<Developers />} />
          <Route path="developers/new" element={<DeveloperEditor />} />
          <Route path="developers/:id" element={<DeveloperEditor />} />
          <Route path="homepage" element={<WebsiteContent />} />
          <Route path="content" element={<WebsiteContent />} />
          <Route path="media" element={<MediaLibrary />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Dashboard />} />
        </Route>

        {/* Fallback to Home */}
        <Route path="*" element={<PublicLayout><Home /></PublicLayout>} />
      </Routes>
    </Router>
  );
}
