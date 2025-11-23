import React from 'react';
import { Play, Pause, RotateCcw, Zap } from 'lucide-react';

const ControlPanel = ({ 
  onPlay, 
  onPause, 
  onReset, 
  onSpeedChange, 
  speed = 1,
  isPlaying = false,
  children 
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white mb-4">Controls</h3>
      
      {/* Custom Controls (passed as children) */}
      {children}
      
      {/* Playback Controls */}
      <div className="flex items-center gap-4 pt-4 border-t border-white/10">
        <button
          onClick={isPlaying ? onPause : onPlay}
          className="p-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors duration-200"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
        
        <button
          onClick={onReset}
          className="p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
          title="Reset"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        
        {/* Speed Control */}
        <div className="flex items-center gap-3 flex-1">
          <Zap className="w-5 h-5 text-yellow-400" />
          <input
            type="range"
            min="0.25"
            max="2"
            step="0.25"
            value={speed}
            onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
            className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-white font-mono text-sm w-12">{speed}x</span>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
