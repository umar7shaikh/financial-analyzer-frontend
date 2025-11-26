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
      queued: 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-300',
      processing: 'bg-blue-500/20 border border-blue-500/30 text-blue-300',
      completed: 'bg-green-500/20 border border-green-500/30 text-green-300',
      failed: 'bg-red-500/20 border border-red-500/30 text-red-300',
      pending: 'bg-gray-500/20 border border-gray-500/30 text-gray-300',
    };
    return badges[status] || 'bg-gray-500/20 border border-gray-500/30 text-gray-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black py-16 px-4">
      <div className="max-w-4xl mx-auto bg-gray-900/50 backdrop-blur-md border border-gray-800/50 shadow-2xl rounded-2xl p-8 space-y-6">
        
        {/* Job ID Input */}
        <div>
          <label className="block text-gray-300 font-semibold mb-3">Check Analysis Status</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={jobId}
              onChange={(e) => setJobId(e.target.value)}
              placeholder="Enter Job ID (e.g., abc12345)"
              className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              disabled={location.state?.completed}
            />
            <button
              onClick={handleCheckStatus}
              disabled={loading || location.state?.completed}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              {loading ? 'Checking...' : 'Check'}
            </button>
          </div>
        </div>

        {/* Auto-refresh Toggle */}
        {statusData && statusData['⏱️ status'] !== 'completed' && statusData['⏱️ status'] !== 'failed' && (
          <div className="flex items-center gap-3 p-4 bg-gray-800/30 border border-gray-700/30 rounded-lg">
            <input
              type="checkbox"
              id="autoRefresh"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="w-5 h-5 accent-blue-500 cursor-pointer"
            />
            <label htmlFor="autoRefresh" className="text-sm text-gray-200 cursor-pointer">
              Auto-refresh every 10 seconds
            </label>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg backdrop-blur-sm">
            {error}
          </div>
        )}

        {/* Status Display */}
        {statusData && (
          <div className="space-y-6">
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg text-white">Analysis Status</h3>
                <span className={`px-4 py-2 rounded-full text-xs font-bold tracking-widest ${getStatusBadge(statusData['⏱️ status'])}`}>
                  {statusData['⏱️ status']?.toUpperCase()}
                </span>
              </div>
              
              <div className="space-y-3 text-sm text-gray-300">
                <p><span className="font-semibold text-gray-200">Job ID:</span> <code className="bg-gray-900/50 px-2 py-1 rounded text-gray-100 text-xs">{statusData['🎯 job_id']}</code></p>
                <p><span className="font-semibold text-gray-200">Message:</span> {statusData['✅ message'] || statusData.message}</p>
                
                {/* Show processing summary if available */}
                {statusData.processing_summary && (
                  <div className="mt-4 pt-4 border-t border-gray-700/50">
                    <p><span className="font-semibold text-gray-200">Processing Duration:</span> {statusData.processing_summary.processing_duration?.toFixed(2)} seconds</p>
                    <p><span className="font-semibold text-gray-200">Completed At:</span> {new Date(statusData.processing_summary.completed_at).toLocaleString()}</p>
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
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 backdrop-blur-sm">
                <p className="text-red-300 font-bold text-lg mb-3">❌ Analysis Failed</p>
                <p className="text-red-200 text-sm mb-2">
                  {statusData['🐛 error_details'] || 'An error occurred during analysis.'}
                </p>
                <p className="text-red-300 text-sm">
                  {statusData.retry_suggestion || 'Please try uploading the document again.'}
                </p>
              </div>
            )}

            {/* Processing Message */}
            {(statusData['⏱️ status'] === 'queued' || statusData['⏱️ status'] === 'processing' || statusData['⏱️ status'] === 'pending') && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center space-x-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500/30 border-t-blue-500 flex-shrink-0"></div>
                  <div>
                    <p className="text-blue-300 font-semibold text-base">
                      ⏳ Your analysis is being processed by our multi-agent AI system.
                    </p>
                    <p className="text-blue-400/70 text-sm mt-1">
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
