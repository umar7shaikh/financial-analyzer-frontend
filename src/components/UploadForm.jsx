import React, { useState } from 'react';
import { Upload, FileText, Sparkles, Clock, CheckCircle, AlertCircle, TrendingUp, Shield, Zap } from 'lucide-react';
import { uploadDocument } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [processingMode, setProcessingMode] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (selectedFile) => {
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please select a valid PDF file');
      setFile(null);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async () => {
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

      const status = result['⏱️ status'] || result.status;
      const mode = result.processing_mode || (status === 'completed' ? 'sync' : 'async');
      setProcessingMode(mode);

      const jobId = result['🎯 job_id'] || result.job_id;
      localStorage.setItem('lastJobId', jobId);

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
      navigate('/status', {
        state: {
          jobId,
          completed: true,
          results: response['📊 analysis_result'] || response.analysis_result,
        },
      });
    } else {
      navigate('/status', { state: { jobId } });
    }
  };

  const viewResults = () => {
    navigate('/status', {
      state: {
        jobId: response['🎯 job_id'] || response.job_id,
        completed: true,
        results: response['📊 analysis_result'] || response.analysis_result,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl shadow-lg shadow-blue-500/50">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI Document Analysis
          </h1>
          <p className="text-gray-400 text-lg">Powered by Multi-Agent Intelligence</p>
        </div>

        {/* Main Card */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden">
          <div className="p-8 space-y-6">
            {/* File Upload Zone */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Upload Document
              </label>
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${
                  dragActive
                    ? 'border-blue-500 bg-blue-500/10'
                    : file
                    ? 'border-green-500 bg-green-500/5'
                    : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                }`}
              >
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => handleFileChange(e.target.files[0])}
                  disabled={loading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />

                <div className="text-center pointer-events-none">
                  {file ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="bg-green-500/20 p-4 rounded-full">
                        <CheckCircle className="w-8 h-8 text-green-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{file.name}</p>
                        <p className="text-sm text-gray-400 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <div className="bg-blue-500/20 p-4 rounded-full">
                        <Upload className="w-8 h-8 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Drop your PDF here</p>
                        <p className="text-sm text-gray-400 mt-1">or click to browse</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Query Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Analysis Query
              </label>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={loading}
                placeholder="E.g., Analyze Tesla's financial performance and provide investment recommendations with risk assessment..."
                rows="4"
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 transition resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-3 group"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Analyzing Document...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Start AI Analysis</span>
                </>
              )}
            </button>

            {/* Loading State */}
            {loading && (
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-6 animate-pulse">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/20 p-3 rounded-xl flex-shrink-0">
                    <Clock className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white mb-2">AI Agents in Action</p>
                    <p className="text-sm text-gray-300 mb-3">
                      Multi-agent workflow: Market Research → Financial Analysis → Verification
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                        Estimated time: 5-15 minutes
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                        Please keep this page open
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-start gap-3 animate-fade-in">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Success Response - Async Mode (Queued) */}
            {response && processingMode === 'async' && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 space-y-4 animate-fade-in">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-500/20 p-2 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="font-bold text-white text-xl">Analysis Queued!</h3>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-white">
                  <div className="bg-gray-700/30 rounded-xl p-3">
                    <p className="text-gray-300 text-xs mb-1">Job ID</p>
                    <p className="font-mono text-xs truncate">{response['🎯 job_id'] || response.job_id}</p>
                  </div>
                  <div className="bg-gray-700/30 rounded-xl p-3">
                    <p className="text-gray-300 text-xs mb-1">Status</p>
                    <p className="text-green-400 font-semibold">{response['⏱️ status'] || response.status}</p>
                  </div>
                  <div className="bg-gray-700/30 rounded-xl p-3">
                    <p className="text-gray-300 text-xs mb-1">File</p>
                    <p className="truncate text-xs">{response['📄 file_processed'] || response.file_processed}</p>
                  </div>
                  <div className="bg-gray-700/30 rounded-xl p-3">
                    <p className="text-gray-300 text-xs mb-1">Estimated Time</p>
                    <p className="text-xs">{response['⏰ estimated_time'] || response.estimated_time}</p>
                  </div>
                </div>

                <button
                  onClick={goToStatus}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-2xl font-semibold hover:bg-green-700 transition"
                >
                  Check Status
                  <TrendingUp className="w-5 h-5 ml-2 inline-block" />
                </button>
              </div>
            )}

            {/* Success Response - Sync Mode (Completed) */}
            {response && processingMode === 'sync' && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 space-y-4 animate-fade-in">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-500/20 p-2 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="font-bold text-white text-xl">Analysis Complete!</h3>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-white">
                  <div className="bg-gray-700/30 rounded-xl p-3">
                    <p className="text-gray-300 text-xs mb-1">Job ID</p>
                    <p className="font-mono text-xs truncate">{response['🎯 job_id'] || response.job_id}</p>
                  </div>
                  <div className="bg-gray-700/30 rounded-xl p-3">
                    <p className="text-gray-300 text-xs mb-1">Status</p>
                    <p className="text-green-400 font-semibold">{response['⏱️ status'] || response.status}</p>
                  </div>
                  <div className="bg-gray-700/30 rounded-xl p-3">
                    <p className="text-gray-300 text-xs mb-1">File</p>
                    <p className="truncate text-xs">{response['📄 file_processed'] || response.file_processed}</p>
                  </div>
                  <div className="bg-gray-700/30 rounded-xl p-3">
                    <p className="text-gray-300 text-xs mb-1">Time</p>
                    <p className="text-xs">{response['⏰ processing_time'] || response.processing_time}</p>
                  </div>
                </div>

                <div className="bg-white rounded-md p-3 border border-green-300 text-green-700 text-sm">
                  🎉 Your document has been analyzed! Results are ready to view.
                </div>

                <button
                  onClick={viewResults}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-2xl font-semibold hover:bg-green-700 transition"
                >
                  View Results
                </button>
              </div>
            )}
          </div>

          {/* Features Footer */}
          <div className="bg-gray-800/80 px-8 py-6 border-t border-gray-700/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-500/20 p-2 rounded-lg flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm mb-1">Market Intelligence</h4>
                  <p className="text-gray-400 text-xs">Real-time analysis & trends</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-purple-500/20 p-2 rounded-lg flex-shrink-0">
                  <Shield className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm mb-1">Risk Assessment</h4>
                  <p className="text-gray-400 text-xs">AI-powered verification</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-500/20 p-2 rounded-lg flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm mb-1">Smart Recommendations</h4>
                  <p className="text-gray-400 text-xs">BUY/HOLD/SELL signals</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Powered by CrewAI Multi-Agent System • Enterprise-grade Analysis</p>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
