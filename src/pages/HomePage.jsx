import React from 'react';
import UploadForm from '../components/UploadForm';

export default function HomePage() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Upload Financial Document</h2>
      <p className="text-gray-600 mb-8">
        Upload a PDF financial document and get AI-powered analysis with investment recommendations.
      </p>
      <UploadForm />
    </div>
  );
}
