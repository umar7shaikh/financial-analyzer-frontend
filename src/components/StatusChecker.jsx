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

  // Auto-populate jobId and results if passed from upload page
  useEffect(() => {
    // Check if results were passed directly (sync mode)
    if (location.state?.completed && location.state?.results) {
      setStatusData({
        '🎯 job_id': location.state.jobId,
        '⏱️ status': 'completed',
        '✅ message': 'Analysis completed successfully!',
        '📊 analysis_result': location.state.results
      });
      setJobId(location.state.jobId);
      return;
    }

    // Check if jobId was passed (async mode)
    if (location.state?.jobId) {
      setJobId(location.state.jobId);
      // Auto-check status on load for async mode
      checkStatusForJobId(location.state.jobId);
      setAutoRefresh(true); // Start auto-refresh for async mode
    } else {
      // Try to get last job from localStorage
      const lastJob = localStorage.getItem('lastJobId');
      if (lastJob) setJobId(lastJob);
    }
  }, [location]);

  // Auto-refresh functionality
  useEffect(() => {
    let interval;
    if (autoRefresh && jobId && statusData?.['⏱️ status'] !== 'completed' && statusData?.['⏱️ status'] !== 'failed') {
      interval = setInterval(() => {
        handleCheckStatus();
      }, 10000); // Check every 10 seconds
    }
    return () => clearInterval(interval);
  }, [autoRefresh, jobId, statusData]);

  const checkStatusForJobId = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const result = await checkStatus(id);
      setStatusData(result);
      
      // Stop auto-refresh if completed or failed
      if (result['⏱️ status'] === 'completed' || result['⏱️ status'] === 'failed') {
        setAutoRefresh(false);
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch status.');
      console.error('Status check error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckStatus = async () => {
    if (!jobId.trim()) {
      setError('Please enter a job ID');
      return;
    }

    await checkStatusForJobId(jobId);
  };

  const getStatusBadge = (status) => {
    const badges = {
      queued: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      pending: 'bg-gray-100 text-gray-800',
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
            disabled={location.state?.completed} // Disable if results already loaded
          />
          <button
            onClick={handleCheckStatus}
            disabled={loading || location.state?.completed}
            className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {loading ? 'Checking...' : 'Check Status'}
          </button>
        </div>

        {/* Auto-refresh Toggle */}
        {statusData && statusData['⏱️ status'] !== 'completed' && statusData['⏱️ status'] !== 'failed' && (
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
                
                {/* Show processing summary if available */}
                {statusData.processing_summary && (
                  <div className="mt-3 pt-3 border-t border-gray-300">
                    <p><span className="font-medium">Processing Duration:</span> {statusData.processing_summary.processing_duration?.toFixed(2)} seconds</p>
                    <p><span className="font-medium">Completed At:</span> {new Date(statusData.processing_summary.completed_at).toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Results Display - only show if completed */}
            {statusData['⏱️ status'] === 'completed' && statusData['📊 analysis_result'] && (
              <ResultsDisplay results={statusData['📊 analysis_result']} />
            )}

            {/* Failed Message */}
            {statusData['⏱️ status'] === 'failed' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 font-medium">❌ Analysis Failed</p>
                <p className="text-red-700 text-sm mt-2">
                  {statusData['🐛 error_details'] || 'An error occurred during analysis.'}
                </p>
                <p className="text-red-600 text-sm mt-2">
                  {statusData.retry_suggestion || 'Please try uploading the document again.'}
                </p>
              </div>
            )}

            {/* Processing Message */}
            {(statusData['⏱️ status'] === 'queued' || statusData['⏱️ status'] === 'processing' || statusData['⏱️ status'] === 'pending') && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  <div>
                    <p className="text-blue-800 font-medium">
                      ⏳ Your analysis is being processed by our multi-agent AI system.
                    </p>
                    <p className="text-blue-700 text-sm mt-1">
                      This typically takes 5-15 minutes. Status will update automatically.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
