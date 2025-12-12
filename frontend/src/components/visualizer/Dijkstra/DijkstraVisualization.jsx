import { useEffect } from 'react';
import { motion } from 'framer-motion';
import useDijkstraStore from '../../../store/dijkstraStore';
import { MapPin, Zap } from 'lucide-react';

export default function DijkstraVisualization() {
  const { 
    nodes, 
    edges, 
    currentNode, 
    priorityQueue,
    shortestPath,
    isRunning,
    reset
  } = useDijkstraStore();

  useEffect(() => {
    reset();
  }, []);

  // Compute distances from nodes
  const distances = nodes.reduce((acc, node) => {
    acc[node.id] = node.distance;
    return acc;
  }, {});

  // Compute visited nodes
  const visited = nodes.filter(node => node.visited).map(node => node.id);

  // Check if algorithm is complete
  const algorithmComplete = !isRunning && shortestPath.length > 0;

  const getNodePosition = (nodeId) => {
    const positions = {
      'A': { x: 100, y: 150 },
      'B': { x: 250, y: 50 },
      'C': { x: 250, y: 250 },
      'D': { x: 400, y: 50 },
      'E': { x: 400, y: 250 },
      'F': { x: 550, y: 150 },
    };
    return positions[nodeId];
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Info Banner */}
      <div className="w-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-4">
        <div className="flex items-center gap-3 text-white">
          <Zap className="w-6 h-6 text-orange-400" />
          <div>
            <h3 className="font-bold text-lg">Dijkstra's Shortest Path Algorithm</h3>
            <p className="text-sm text-white/70">
              Uses priority queue (min-heap) to efficiently find shortest routes in weighted graphs
            </p>
          </div>
        </div>
      </div>

      {/* Main Visualization Area */}
      <div className="w-full grid grid-cols-3 gap-6">
        {/* Graph Visualization */}
        <div className="col-span-2 bg-gray-800/50 rounded-xl p-6 border border-white/10" style={{ minHeight: '400px' }}>
          <h4 className="text-white font-semibold mb-4">Weighted Graph</h4>
          <svg width="100%" height="350" className="overflow-visible">
            {/* Draw edges first */}
            {edges.map((edge, index) => {
              const start = getNodePosition(edge.from);
              const end = getNodePosition(edge.to);
              const isInPath = shortestPath.includes(edge.from) && shortestPath.includes(edge.to) &&
                Math.abs(shortestPath.indexOf(edge.from) - shortestPath.indexOf(edge.to)) === 1;
              
              return (
                <g key={index}>
                  <line
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke={isInPath ? '#f59e0b' : '#ffffff40'}
                    strokeWidth={isInPath ? 4 : 2}
                    className="transition-all duration-300"
                  />
                  {/* Edge weight label */}
                  <text
                    x={(start.x + end.x) / 2}
                    y={(start.y + end.y) / 2 - 10}
                    fill="#60a5fa"
                    fontSize="16"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {edge.weight}
                  </text>
                </g>
              );
            })}
            
            {/* Draw nodes */}
            <defs>
              <linearGradient id="currentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
            </defs>
            {nodes.map((node) => {
              const pos = getNodePosition(node.id);
              const isCurrent = currentNode === node.id;
              const isVisited = visited.includes(node.id);
              const isInPath = shortestPath.includes(node.id);
              
              let fillColor = '#ffffff20';
              if (isInPath) fillColor = 'url(#pathGradient)';
              else if (isCurrent) fillColor = 'url(#currentGradient)';
              else if (isVisited) fillColor = '#3b82f680';
              
              return (
                <g key={node.id}>
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="30"
                    fill={fillColor}
                    stroke={isCurrent ? '#10b981' : isInPath ? '#f59e0b' : '#ffffff60'}
                    strokeWidth="3"
                    style={{
                      transform: isCurrent ? 'scale(1.2)' : 'scale(1)',
                      transformOrigin: `${pos.x}px ${pos.y}px`,
                      transition: 'all 0.3s'
                    }}
                  />
                  <text
                    x={pos.x}
                    y={pos.y}
                    fill="white"
                    fontSize="24"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    {node.id}
                  </text>
                  {/* Distance label */}
                  <text
                    x={pos.x}
                    y={pos.y + 50}
                    fill={node.distance === Infinity ? '#ef4444' : '#22c55e'}
                    fontSize="14"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {node.distance === Infinity ? '∞' : node.distance}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Priority Queue */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-white/10">
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-purple-400" />
            Priority Queue
          </h4>
          <div className="space-y-2">
            {priorityQueue.length === 0 ? (
              <div className="text-white/50 text-sm text-center py-8">
                Queue is empty
              </div>
            ) : (
              priorityQueue.map((item, index) => (
                <motion.div
                  key={`${item.id}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`
                    p-3 rounded-lg border-2 flex justify-between items-center
                    ${index === 0 
                      ? 'bg-green-500/20 border-green-500' 
                      : 'bg-white/10 border-white/20'
                    }
                  `}
                >
                  <span className="text-white font-mono font-bold text-lg">{item.id}</span>
                  <span className="text-blue-400 font-bold">{item.distance}</span>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center text-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 border-2 border-green-500"></div>
          <span className="text-white/70">Current Node</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-500/50 border-2 border-white/60"></div>
          <span className="text-white/70">Visited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 border-2 border-amber-500"></div>
          <span className="text-white/70">Shortest Path</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/60"></div>
          <span className="text-white/70">Unvisited</span>
        </div>
      </div>

      {/* Result */}
      {algorithmComplete && shortestPath.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/50 rounded-xl p-4"
        >
          <h4 className="text-amber-400 font-semibold mb-2">Shortest Path Found!</h4>
          <div className="flex items-center gap-2 text-white text-lg font-mono">
            {shortestPath.map((node, index) => (
              <span key={node}>
                {node}
                {index < shortestPath.length - 1 && <span className="text-amber-400 mx-2">→</span>}
              </span>
            ))}
          </div>
          <p className="text-white/70 text-sm mt-2">
            Total Distance: <span className="text-green-400 font-bold">{distances[shortestPath[shortestPath.length - 1]]}</span>
          </p>
        </motion.div>
      )}

      {/* How It Works */}
      <div className="w-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-4">
        <h4 className="text-orange-400 font-semibold mb-2">How Dijkstra Works:</h4>
        <div className="text-white/70 text-sm space-y-1">
          <p>1. Start with source node at distance 0, all others at ∞</p>
          <p>2. Use min-heap priority queue to always process closest unvisited node</p>
          <p>3. Update distances to neighbors if shorter path found</p>
          <p>4. Mark node as visited and repeat until destination reached</p>
        </div>
      </div>
    </div>
  );
}
