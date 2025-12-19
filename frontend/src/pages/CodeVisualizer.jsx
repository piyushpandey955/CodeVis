import { useEffect } from 'react';
import CodeEditor from '../components/codeVisualizer/CodeEditor';
import VisualizationPanel from '../components/codeVisualizer/VisualizationPanel';
import ControlPanel from '../components/codeVisualizer/ControlPanel';
import PlaybackControls from '../components/codeVisualizer/PlaybackControls';
import useCodeVisualizerStore from '../store/codeVisualizerStore';
import { Code2 } from 'lucide-react';

export default function CodeVisualizer() {
  const { reset } = useCodeVisualizerStore();

  useEffect(() => {
    // Initialize on mount
    reset();
  }, [reset]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Separate Internal Header */}
      <div className="bg-gray-900/95 backdrop-blur-sm border-b border-white/10 pt-20 pb-4">
        <div className="max-w-[98%] mx-auto px-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">Code Visualizer</h1>
              <p className="text-gray-400 text-sm">Write code, watch data structures come alive in real-time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="h-[calc(100vh-140px)] flex flex-col">
        {/* Horizontal Control Panel */}
        <div className="bg-gray-800/50 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-[98%] mx-auto px-4 py-3">
            <ControlPanel />
          </div>
        </div>

        {/* Editor and Visualization Area - 40/50 split */}
        <div className="flex-1 flex overflow-hidden">
          <div className="max-w-[98%] mx-auto w-full h-full flex gap-4 px-4 py-4">
            {/* Code Editor - 40% */}
            <div className="w-[40%] flex flex-col">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden h-full flex flex-col">
                <CodeEditor />
              </div>
            </div>

            {/* Visualization Panel - 50% */}
            <div className="w-[50%] flex flex-col">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden h-full flex flex-col">
                <VisualizationPanel />
              </div>
            </div>

            {/* Info Sidebar - 10% */}
            <div className="w-[10%] flex flex-col gap-4">
              {/* Quick Info Card */}
              <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-3">
                <h4 className="text-purple-400 font-bold text-xs mb-2">Supported</h4>
                <div className="space-y-2 text-xs text-gray-300">
                  <div>
                    <p className="text-green-400 font-semibold">✓ Stack</p>
                    <p className="text-green-400 font-semibold">✓ Queue</p>
                    <p className="text-green-400 font-semibold">✓ Array</p>
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <p className="text-gray-500 text-[10px]">Java ✅</p>
                    <p className="text-gray-500 text-[10px]">Python soon</p>
                  </div>
                </div>
              </div>

              {/* Tips Card */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 flex-1 overflow-auto">
                <h4 className="text-blue-400 font-bold text-xs mb-2">Tips</h4>
                <ul className="space-y-1 text-[10px] text-gray-300">
                  <li>• Load examples</li>
                  <li>• Click Execute</li>
                  <li>• Use playback</li>
                  <li>• Step through</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Playback Controls - Bottom Bar */}
        <div className="bg-gray-900/95 backdrop-blur-sm border-t border-white/10">
          <PlaybackControls />
        </div>
      </div>
    </div>
  );
}
