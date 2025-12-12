import useBFSRoutingStore from '../../../store/bfsRoutingStore';
import { Play, RotateCcw, Trash2 } from 'lucide-react';

export default function BFSRoutingControls() {
  const { findShortestPath, clearPath, reset, isSearching } = useBFSRoutingStore();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">Route Finder Controls</h3>
      
      {/* Main Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={findShortestPath}
          disabled={isSearching}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors duration-200 cursor-pointer"
        >
          <Play className="w-5 h-5" />
          Find Route
        </button>
        <button
          onClick={clearPath}
          disabled={isSearching}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-600 text-white rounded-lg font-semibold transition-colors duration-200 cursor-pointer"
        >
          <Trash2 className="w-5 h-5" />
          Clear Path
        </button>
      </div>

      <button
        onClick={reset}
        disabled={isSearching}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-600 text-white rounded-lg font-semibold transition-colors duration-200 cursor-pointer"
      >
        <RotateCcw className="w-5 h-5" />
        Reset Grid
      </button>

      {/* Instructions */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-2">How It Works:</h4>
        <div className="text-white/70 text-sm space-y-2">
          <p>• BFS explores all possible paths level by level</p>
          <p>• Gray cells represent obstacles (buildings, traffic)</p>
          <p>• Blue cells show explored routes</p>
          <p>• Yellow cells highlight the shortest path found</p>
          <p>• Just like Google Maps navigating around traffic!</p>
        </div>
      </div>

      {/* Real-World Context */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
        <h4 className="text-blue-400 font-semibold mb-2">Real-World Application:</h4>
        <p className="text-white/70 text-sm">
          Navigation apps like Google Maps use BFS-based algorithms to find the shortest route 
          between locations, considering obstacles like closed roads, traffic, and construction zones.
        </p>
      </div>
    </div>
  );
}
