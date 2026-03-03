import { Link } from 'react-router-dom';
import { Button } from '../components/common';
import { DashboardLayout } from '../layout/Sidebar';

export const PlaceholderPage = ({ title }) => (
  <DashboardLayout>
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{title}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">This page is under construction.</p>
      <Link to="/dashboard">
        <Button variant="primary">Back to Dashboard</Button>
      </Link>
    </div>
  </DashboardLayout>
);

export const NotFoundPage = () => (
  <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center p-4">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-teal-accent mb-4">404</h1>
      <p className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Page Not Found</p>
      <p className="text-gray-600 dark:text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
      <Link to="/">
        <Button variant="primary">Go Home</Button>
      </Link>
    </div>
  </div>
);
