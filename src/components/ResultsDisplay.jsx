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
      blue: 'bg-blue-500/10 border-blue-500/30 text-blue-100',
      purple: 'bg-purple-500/10 border-purple-500/30 text-purple-100',
      green: 'bg-green-500/10 border-green-500/30 text-green-100',
      yellow: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-100',
      indigo: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-100',
    };
    return colors[color] || 'bg-gray-500/10 border-gray-500/30 text-gray-100';
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-6 bg-gray-800/30 rounded-2xl shadow-2xl border border-gray-700/50 backdrop-blur-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-extrabold text-white">📊 Analysis Results</h2>
        {results.confidence_rating && (
          <span className="px-5 py-2 bg-green-500/20 border border-green-500/30 text-green-200 rounded-full font-semibold tracking-wide shadow-sm select-none">
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
            className={`border-l-8 rounded-lg p-6 shadow-md ${getColorClasses(section.color)} transition-shadow duration-300 hover:shadow-lg border backdrop-blur-sm`}
          >
            <h3 className="font-bold text-xl mb-4 text-white drop-shadow-md">{section.title}</h3>
            <div className="prose prose-md max-w-none text-gray-200 prose-headings:text-white prose-links:text-blue-400 prose-links:hover:text-blue-300">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        );
      })}
    </div>
  );
}
