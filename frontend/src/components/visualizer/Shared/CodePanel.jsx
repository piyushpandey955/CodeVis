import React, { useState } from 'react';
import { Code2 } from 'lucide-react';

const CodePanel = ({ codeExamples, complexity }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  
  const languages = Object.keys(codeExamples || {});
  const currentCode = codeExamples?.[selectedLanguage] || '';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-purple-400" />
          <h3 className="text-xl font-bold text-white">Code</h3>
        </div>
        
        {/* Language Selector */}
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="bg-gray-800 text-white px-3 py-1 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Code Display */}
      <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10 overflow-x-auto">
        <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
          {currentCode}
        </pre>
      </div>

      {/* Complexity Analysis */}
      {complexity && (
        <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-lg p-4 border border-purple-500/20">
          <h4 className="text-sm font-bold text-purple-300 mb-2">Complexity Analysis</h4>
          <div className="space-y-1 text-sm text-gray-300">
            <div className="flex justify-between">
              <span>Time:</span>
              <span className="font-mono text-purple-400">{complexity.time}</span>
            </div>
            <div className="flex justify-between">
              <span>Space:</span>
              <span className="font-mono text-purple-400">{complexity.space}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodePanel;
