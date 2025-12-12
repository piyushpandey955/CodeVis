import useDijkstraStore from '../../../store/dijkstraStore';
import { Play, RotateCcw } from 'lucide-react';

export default function DijkstraControls() {
  const { nodes, runDijkstra, reset, isRunning, startNode, endNode, setStartNode, setEndNode } = useDijkstraStore();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">Pathfinding Controls</h3>
      
      {/* Node Selection */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-white/70 text-sm font-semibold">Start Node:</label>
          <select
            value={startNode}
            onChange={(e) => setStartNode(e.target.value)}
            disabled={isRunning}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors cursor-pointer disabled:opacity-50"
          >
            {nodes.map((node) => (
              <option key={node.id} value={node.id} className="bg-gray-800">
                Node {node.id}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-white/70 text-sm font-semibold">End Node:</label>
          <select
            value={endNode}
            onChange={(e) => setEndNode(e.target.value)}
            disabled={isRunning}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors cursor-pointer disabled:opacity-50"
          >
            {nodes.map((node) => (
              <option key={node.id} value={node.id} className="bg-gray-800">
                Node {node.id}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={runDijkstra}
          disabled={isRunning || startNode === endNode}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors cursor-pointer"
        >
          <Play className="w-5 h-5" />
          {isRunning ? 'Running...' : 'Find Path'}
        </button>
        <button
          onClick={reset}
          disabled={isRunning}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-600 text-white rounded-lg font-semibold transition-colors cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" />
          Reset
        </button>
      </div>

      {/* Quick Scenarios */}
      <div className="space-y-2">
        <label className="text-white/70 text-sm font-semibold">Quick Scenarios:</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              setStartNode('A');
              setEndNode('F');
            }}
            disabled={isRunning}
            className="px-3 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 rounded-lg text-sm transition-colors cursor-pointer disabled:opacity-50"
          >
            A → F
          </button>
          <button
            onClick={() => {
              setStartNode('A');
              setEndNode('E');
            }}
            disabled={isRunning}
            className="px-3 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 rounded-lg text-sm transition-colors cursor-pointer disabled:opacity-50"
          >
            A → E
          </button>
          <button
            onClick={() => {
              setStartNode('B');
              setEndNode('F');
            }}
            disabled={isRunning}
            className="px-3 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 rounded-lg text-sm transition-colors cursor-pointer disabled:opacity-50"
          >
            B → F
          </button>
          <button
            onClick={() => {
              setStartNode('C');
              setEndNode('D');
            }}
            disabled={isRunning}
            className="px-3 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 rounded-lg text-sm transition-colors cursor-pointer disabled:opacity-50"
          >
            C → D
          </button>
        </div>
      </div>

      {/* Graph Info */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-2">Graph Structure:</h4>
        <div className="text-white/70 text-sm space-y-1">
          <p>• 6 nodes (A through F)</p>
          <p>• 8 weighted edges representing roads</p>
          <p>• Edge weights = distance/time/cost</p>
          <p>• Priority queue ensures optimal path</p>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-2">How to Use:</h4>
        <div className="text-white/70 text-sm space-y-2">
          <p>1. Select start and end nodes</p>
          <p>2. Click "Find Path" to run the algorithm</p>
          <p>3. Watch the priority queue process nodes</p>
          <p>4. Green = current, Blue = visited, Yellow = path</p>
        </div>
      </div>

      {/* Real-World Context */}
      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-4">
        <h4 className="text-orange-400 font-semibold mb-2">Real-World Application:</h4>
        <p className="text-white/70 text-sm">
          Dijkstra's algorithm powers GPS navigation, network routing protocols (OSPF), 
          and game AI pathfinding. The priority queue (min-heap) makes it efficient for 
          large networks by always processing the closest unexplored node first!
        </p>
      </div>
    </div>
  );
}
