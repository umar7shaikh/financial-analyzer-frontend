import React, { useState, useEffect } from 'react';
import { checkStatus } from '../services/api';
import { useLocation } from 'react-router-dom';
import ResultsDisplay from './ResultsDisplay';

export default function StatusChecker() {
  const location = useLocation();
  const [jobId, setJobId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusData, setStatusData] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(false);

  // Auto-populate jobId if passed from upload page
  useEffect(() => {
    if (location.state?.jobId) {
      setJobId(location.state.jobId);
    } else {
      // Try to get last job from localStorage
      const lastJob = localStorage.getItem('lastJobId');
      if (lastJob) setJobId(lastJob);
    }
  }, [location]);

  // Auto-refresh functionality
  useEffect(() => {
    let interval;
    if (autoRefresh && jobId && statusData?.['⏱️ status'] !== 'completed') {
      interval = setInterval(() => {
        handleCheckStatus();
      }, 10000); // Check every 10 seconds
    }
    return () => clearInterval(interval);
  }, [autoRefresh, jobId, statusData]);

  const handleCheckStatus = async () => {
    if (!jobId.trim()) {
      setError('Please enter a job ID');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await checkStatus(jobId);
      setStatusData(result);
      
      // Stop auto-refresh if completed or failed
      if (result['⏱️ status'] === 'completed' || result['⏱️ status'] === 'failed') {
        setAutoRefresh(false);
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch status. Please check your job ID.');
      console.error('Status check error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      queued: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
        
        {/* Job ID Input */}
        <div className="flex gap-4">
          <input
            type="text"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            placeholder="Enter Job ID (e.g., abc12345)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleCheckStatus}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {loading ? 'Checking...' : 'Check Status'}
          </button>
        </div>

        {/* Auto-refresh Toggle */}
        {statusData && statusData['⏱️ status'] !== 'completed' && (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="autoRefresh"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="w-4 h-4 text-blue-600"
            />
            <label htmlFor="autoRefresh" className="text-sm text-gray-700">
              Auto-refresh every 10 seconds
            </label>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Status Display */}
        {statusData && (
          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">Analysis Status</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(statusData['⏱️ status'])}`}>
                  {statusData['⏱️ status']?.toUpperCase()}
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Job ID:</span> {statusData['🎯 job_id']}</p>
                <p><span className="font-medium">Message:</span> {statusData['✅ message'] || statusData.message}</p>
              </div>
            </div>

            {/* Results Display - only show if completed */}
            {statusData['⏱️ status'] === 'completed' && statusData['📊 analysis_result'] && (
              <ResultsDisplay results={statusData['📊 analysis_result']} />
            )}

            {/* Processing Message */}
            {(statusData['⏱️ status'] === 'queued' || statusData['⏱️ status'] === 'processing') && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800">
                  ⏳ Your analysis is being processed by our multi-agent AI system. This typically takes 5-15 minutes.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
