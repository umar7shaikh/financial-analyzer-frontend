import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function ResultsDisplay({ results }) {
  const sections = [
    {
      title: '🔍 Market Research Summary',
      key: 'market_research',
      color: 'blue'
    },
    {
      title: '💰 Financial Analysis',
      key: 'financial_analysis',
      color: 'purple'
    },
    {
      title: '🎯 Investment Recommendation',
      key: 'investment_recommendation',
      color: 'green'
    },
    {
      title: '⚠️ Risk Assessment',
      key: 'risk_assessment',
      color: 'yellow'
    },
    {
      title: '✅ Verification Report',
      key: 'verification_report',
      color: 'indigo'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-900 border-blue-700 text-blue-300',
      purple: 'bg-purple-900 border-purple-700 text-purple-300',
      green: 'bg-green-900 border-green-700 text-green-300',
      yellow: 'bg-yellow-900 border-yellow-700 text-yellow-300',
      indigo: 'bg-indigo-900 border-indigo-700 text-indigo-300',
    };
    return colors[color] || 'bg-gray-900 border-gray-700 text-gray-300';
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-3xl shadow-2xl border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-extrabold text-white">📊 Analysis Results</h2>
        {results.confidence_rating && (
          <span className="px-5 py-2 bg-green-700 text-green-100 rounded-full font-semibold tracking-wide shadow-sm select-none">
            Confidence: {results.confidence_rating}
          </span>
        )}
      </div>

      {sections.map((section) => {
        const content = results[section.key];
        if (!content) return null;

        return (
          <div
            key={section.key}
            className={`border-l-8 rounded-lg p-6 shadow-md ${getColorClasses(section.color)} transition-shadow duration-300 hover:shadow-lg`}
          >
            <h3 className="font-bold text-xl mb-4 text-white drop-shadow-md">{section.title}</h3>
            <div className="prose prose-md max-w-none text-gray-100 prose-headings:text-white prose-links:text-blue-400 prose-links:hover:text-blue-500">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        );
      })}
    </div>
  );
}
