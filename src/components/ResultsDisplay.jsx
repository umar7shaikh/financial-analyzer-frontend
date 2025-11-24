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
      blue: 'bg-blue-50 border-blue-200 text-blue-900',
      purple: 'bg-purple-50 border-purple-200 text-purple-900',
      green: 'bg-green-50 border-green-200 text-green-900',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-900',
      indigo: 'bg-indigo-50 border-indigo-200 text-indigo-900',
    };
    return colors[color] || 'bg-gray-50 border-gray-200 text-gray-900';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">📊 Analysis Results</h2>
        {results.confidence_rating && (
          <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold">
            Confidence: {results.confidence_rating}
          </span>
        )}
      </div>

      {sections.map((section) => {
        const content = results[section.key];
        if (!content) return null;

        return (
          <div key={section.key} className={`border rounded-lg p-5 ${getColorClasses(section.color)}`}>
            <h3 className="font-bold text-lg mb-3">{section.title}</h3>
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        );
      })}
    </div>
  );
}
