import React, { useState } from 'react';
import { uploadDocument } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [processingMode, setProcessingMode] = useState(null); // 'sync' or 'async'
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please select a valid PDF file');
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a PDF file');
      return;
    }
    if (!query.trim()) {
      setError('Please enter an analysis query');
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);
    setProcessingMode(null);

    try {
      const result = await uploadDocument(file, query);
      setResponse(result);
      
      // Detect processing mode
      const status = result['⏱️ status'] || result.status;
      const mode = result.processing_mode || (status === 'completed' ? 'sync' : 'async');
      setProcessingMode(mode);
      
      // Store job_id in localStorage for easy access
      const jobId = result['🎯 job_id'] || result.job_id;
      localStorage.setItem('lastJobId', jobId);
      
      // If sync mode and completed, store results too
      if (mode === 'sync' && status === 'completed') {
        localStorage.setItem('lastResults', JSON.stringify(result['📊 analysis_result'] || result.analysis_result));
      }
      
    } catch (err) {
      setError(err.response?.data?.detail || 'Upload failed. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  const goToStatus = () => {
    const jobId = response['🎯 job_id'] || response.job_id;
    
    if (processingMode === 'sync') {
      // For sync mode, navigate directly to results
      navigate('/status', { 
        state: { 
          jobId,
          completed: true,
          results: response['📊 analysis_result'] || response.analysis_result
        } 
      });
    } else {
      // For async mode, navigate to status checker
      navigate('/status', { state: { jobId } });
    }
  };

  const viewResults = () => {
    // Navigate directly to results for completed sync analysis
    navigate('/status', { 
      state: { 
        jobId: response['🎯 job_id'] || response.job_id,
        completed: true,
        results: response['📊 analysis_result'] || response.analysis_result
      } 
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
        
        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload PDF Document
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            disabled={loading}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
          />
          {file && (
            <p className="mt-2 text-sm text-green-600">
              ✓ Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
        </div>

        {/* Query Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Analysis Query
          </label>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
            placeholder="E.g., Analyze Tesla's financial performance and provide investment recommendations"
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {loading ? 'Processing... (This may take 5-15 minutes)' : 'Analyze Document'}
        </button>

        {/* Loading State */}
        {loading && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <div>
                <p className="font-medium text-blue-900">Analyzing your document...</p>
                <p className="text-sm text-blue-700 mt-1">
                  CrewAI agents are working: Market Research → Financial Analysis → Verification
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  ⏱️ Estimated time: 5-15 minutes • Please keep this page open
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Success Response - Async Mode (Queued) */}
        {response && processingMode === 'async' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-green-800 text-lg">✓ Analysis Queued Successfully!</h3>
            
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Job ID:</span> {response['🎯 job_id'] || response.job_id}</p>
              <p><span className="font-medium">File:</span> {response['📄 file_processed'] || response.file_processed}</p>
              <p><span className="font-medium">Status:</span> {response['⏱️ status'] || response.status}</p>
              <p><span className="font-medium">Estimated Time:</span> {response['⏰ estimated_time'] || response.estimated_time}</p>
              <p><span className="font-medium">Mode:</span> Async (Background Processing)</p>
            </div>

            <button
              onClick={goToStatus}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-green-700 transition mt-4"
            >
              Check Analysis Status →
            </button>
          </div>
        )}

        {/* Success Response - Sync Mode (Completed) */}
        {response && processingMode === 'sync' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-green-800 text-lg">✓ Analysis Completed Successfully!</h3>
            
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Job ID:</span> {response['🎯 job_id'] || response.job_id}</p>
              <p><span className="font-medium">File:</span> {response['📄 file_processed'] || response.file_processed}</p>
              <p><span className="font-medium">Status:</span> {response['⏱️ status'] || response.status}</p>
              <p><span className="font-medium">Processing Time:</span> {response['⏰ processing_time'] || response.processing_time}</p>
              <p><span className="font-medium">Mode:</span> Sync (Direct Processing)</p>
            </div>

            <div className="bg-white rounded-md p-3 text-sm border border-green-300">
              <p className="text-green-700">
                🎉 Your document has been analyzed! Results are ready to view.
              </p>
            </div>

            <button
              onClick={viewResults}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-green-700 transition mt-4"
            >
              View Analysis Results →
            </button>
          </div>
        )}
      </form>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">📋 Supported Features:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Market research and economic analysis</li>
          <li>• Financial metrics and performance evaluation</li>
          <li>• Investment recommendations (BUY/HOLD/SELL)</li>
          <li>• Risk assessment and confidence ratings</li>
          <li>• Multi-agent AI verification system</li>
        </ul>
      </div>
    </div>
  );
}
