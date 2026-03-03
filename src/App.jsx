import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import ScanDetailPage from './pages/ScanDetailPage';
import { PlaceholderPage, NotFoundPage } from './pages/PlaceholderPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/scan/:id" element={<ScanDetailPage />} />
          
          {/* Placeholder pages for navbar items */}
          <Route path="/projects" element={<PlaceholderPage title="Projects" />} />
          <Route path="/scans" element={<PlaceholderPage title="Scans" />} />
          <Route path="/schedule" element={<PlaceholderPage title="Schedule" />} />
          <Route path="/notifications" element={<PlaceholderPage title="Notifications" />} />
          <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
          <Route path="/support" element={<PlaceholderPage title="Support" />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
