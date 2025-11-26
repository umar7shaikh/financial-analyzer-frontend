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
    <div className="space-y-6 sm:space-y-8 w-full max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto p-4 sm:p-5 md:p-6 lg:p-8 bg-gray-800/30 rounded-xl sm:rounded-2xl shadow-2xl border border-gray-700/50 backdrop-blur-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">📊 Analysis Results</h2>
        {results.confidence_rating && (
          <span className="px-4 sm:px-5 py-2 bg-green-500/20 border border-green-500/30 text-green-200 rounded-full text-xs sm:text-sm font-semibold tracking-wide shadow-sm select-none whitespace-nowrap">
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
            className={`border-l-4 sm:border-l-6 lg:border-l-8 rounded-lg p-4 sm:p-5 md:p-6 shadow-md ${getColorClasses(section.color)} transition-shadow duration-300 hover:shadow-lg border backdrop-blur-sm`}
          >
            <h3 className="font-bold text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 text-white drop-shadow-md">{section.title}</h3>
            <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none text-gray-200 prose-headings:text-white prose-strong:text-white prose-strong:font-bold prose-links:text-blue-400 prose-links:hover:text-blue-300 [&_strong]:text-white [&_strong]:font-semibold [&_h4]:text-gray-100 [&_h5]:text-gray-100 [&_em]:text-gray-300">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        );
      })}
    </div>
  );
}
