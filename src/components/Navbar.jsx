import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Financial Document Analyzer</h1>
          <div className="flex gap-6">
            <Link
              to="/"
              className={`hover:text-blue-200 transition ${
                isActive('/') ? 'font-semibold border-b-2 border-white' : ''
              }`}
            >
              Upload
            </Link>
            <Link
              to="/status"
              className={`hover:text-blue-200 transition ${
                isActive('/status') ? 'font-semibold border-b-2 border-white' : ''
              }`}
            >
              Check Status
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
