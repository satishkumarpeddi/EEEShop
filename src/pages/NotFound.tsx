import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-black mb-4">404</h1>
        <p className="text-2xl font-medium text-gray-600 mb-8">Page not found</p>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
        >
          <Home size={20} className="mr-2" /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;