import React from 'react';
import StatusChecker from '../components/StatusChecker';

export default function StatusPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Check Analysis Status</h2>
      <p className="text-gray-600 mb-8">
        Enter your job ID to check the status of your document analysis.
      </p>
      <StatusChecker />
    </div>
  );
}
