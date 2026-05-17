import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Landing from './pages/Landing'; // Import Landing
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
                {/* Landing Page is now the root */}
                <Route path="/" element={<Landing />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* All app routes wrapped in Layout */}
                <Route path="/app/*" element={
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
                      <Route path="*" element={<Navigate to="/app" replace />} />
                    </Routes>
                  </Layout>
                } />

                {/* Legacy redirect for old paths or deep links */}
                <Route path="/dashboard" element={<Navigate to="/app" replace />} />
                <Route path="/panels" element={<Navigate to="/app/panels" replace />} />
                <Route path="/analytics" element={<Navigate to="/app/analytics" replace />} />
                <Route path="/battery" element={<Navigate to="/app/battery" replace />} />
                <Route path="/weather" element={<Navigate to="/app/weather" replace />} />
                <Route path="/devices" element={<Navigate to="/app/devices" replace />} />
                <Route path="/reports" element={<Navigate to="/app/reports" replace />} />
                <Route path="/notifications" element={<Navigate to="/app/notifications" replace />} />
                <Route path="/security" element={<Navigate to="/app/security" replace />} />
                <Route path="/automation" element={<Navigate to="/app/automation" replace />} />
                <Route path="/users" element={<Navigate to="/app/users" replace />} />
                <Route path="/support" element={<Navigate to="/app/support" replace />} />
                <Route path="/settings" element={<Navigate to="/app/settings" replace />} />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
          </RealTimeDataProvider>
        </SettingsProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
