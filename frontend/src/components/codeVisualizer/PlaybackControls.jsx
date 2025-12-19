import { Play, Pause, SkipBack, SkipForward, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import useCodeVisualizerStore from '../../store/codeVisualizerStore';

export default function PlaybackControls() {
  const {
    isPlaying,
    currentStateIndex,
    executionStates,
    playbackSpeed,
    play,
    pause,
    stepForward,
    stepBackward,
    goToState,
    setPlaybackSpeed,
    reset
  } = useCodeVisualizerStore();

  const totalStates = executionStates.length;
  const progress = totalStates > 0 ? (currentStateIndex / (totalStates - 1)) * 100 : 0;

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const handleSliderChange = (e) => {
    const index = parseInt(e.target.value);
    goToState(index);
  };

  return (
    <div className="bg-gray-800 border-t border-white/10 px-6 py-4">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Progress Bar */}
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm font-mono min-w-[80px]">
            {currentStateIndex + 1} / {totalStates || 0}
          </span>
          
          <div className="flex-1 relative">
            <input
              type="range"
              min="0"
              max={Math.max(0, totalStates - 1)}
              value={currentStateIndex}
              onChange={handleSliderChange}
              disabled={totalStates === 0}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: totalStates > 0 
                  ? `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${progress}%, #374151 ${progress}%, #374151 100%)`
                  : '#374151'
              }}
            />
          </div>
          
          <span className="text-gray-400 text-sm min-w-[60px] text-right">
            {totalStates > 0 ? `${Math.round(progress)}%` : '0%'}
          </span>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          {/* Playback Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => goToState(0)}
              disabled={totalStates === 0 || currentStateIndex === 0}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Go to start"
            >
              <SkipBack className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={stepBackward}
              disabled={totalStates === 0 || currentStateIndex === 0}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Step backward"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={handlePlayPause}
              disabled={totalStates === 0}
              className="p-3 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white" />
              )}
            </button>

            <button
              onClick={stepForward}
              disabled={totalStates === 0 || currentStateIndex === totalStates - 1}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Step forward"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={() => goToState(totalStates - 1)}
              disabled={totalStates === 0 || currentStateIndex === totalStates - 1}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Go to end"
            >
              <SkipForward className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Speed Control & Reset */}
          <div className="flex items-center gap-4">
            {/* Speed Selector */}
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Speed:</span>
              <select
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                className="px-3 py-1 bg-gray-700 text-white rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm cursor-pointer"
              >
                <option value="0.25">0.25x</option>
                <option value="0.5">0.5x</option>
                <option value="1">1x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </select>
            </div>

            {/* Reset Button */}
            <button
              onClick={reset}
              disabled={totalStates === 0}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-sm font-semibold">Reset</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider:disabled::-webkit-slider-thumb {
          background: #6b7280;
          cursor: not-allowed;
        }

        .slider:disabled::-moz-range-thumb {
          background: #6b7280;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
