import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import SolarPanels from './pages/SolarPanels';
import Battery from './pages/Battery';
import EnergyAnalytics from './pages/EnergyAnalytics';
import Weather from './pages/Weather';
import Devices from './pages/Devices';
import Reports from './pages/Reports';
import Notifications from './pages/Notifications';
import Security from './pages/Security';
import Automation from './pages/Automation';
import Users from './pages/Users';
import Support from './pages/Support';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';

import { AuthProvider } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';
import { RealTimeDataProvider } from './context/RealTimeDataContext';
import { NotificationProvider } from './context/NotificationProvider';

import './i18n/i18n';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <SettingsProvider>
          <RealTimeDataProvider>
            <Router>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/*" element={
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/panels" element={<SolarPanels />} />
                      <Route path="/analytics" element={<EnergyAnalytics />} />
                      <Route path="/battery" element={<Battery />} />
                      <Route path="/weather" element={<Weather />} />
                      <Route path="/devices" element={<Devices />} />
                      <Route path="/reports" element={<Reports />} />
                      <Route path="/notifications" element={<Notifications />} />
                      <Route path="/security" element={<Security />} />
                      <Route path="/automation" element={<Automation />} />
                      <Route path="/users" element={<Users />} />
                      <Route path="/support" element={<Support />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </Layout>
                } />
              </Routes>
            </Router>
          </RealTimeDataProvider>
        </SettingsProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
