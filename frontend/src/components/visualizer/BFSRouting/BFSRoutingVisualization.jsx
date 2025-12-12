import { useEffect } from 'react';
import { motion } from 'framer-motion';
import useBFSRoutingStore from '../../../store/bfsRoutingStore';
import { Navigation, MapPin, Flag } from 'lucide-react';

export default function BFSRoutingVisualization() {
  const { grid, visitedCells, shortestPath, isSearching, searchComplete, initializeGrid } = useBFSRoutingStore();

  useEffect(() => {
    initializeGrid();
  }, []);

  const getCellStyle = (row, col, cellType) => {
    const isVisited = visitedCells.some(v => v.row === row && v.col === col);
    const isInPath = shortestPath.some(p => p.row === row && p.col === col);
    
    if (cellType === 'start') return 'bg-gradient-to-br from-green-400 to-emerald-500';
    if (cellType === 'end') return 'bg-gradient-to-br from-red-400 to-rose-500';
    if (cellType === 'obstacle') return 'bg-gray-700';
    if (isInPath) return 'bg-gradient-to-br from-yellow-400 to-orange-500';
    if (isVisited) return 'bg-blue-400/50';
    return 'bg-white/10';
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Info Banner */}
      <div className="w-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl p-4">
        <div className="flex items-center gap-3 text-white">
          <Navigation className="w-6 h-6 text-blue-400" />
          <div>
            <h3 className="font-bold text-lg">Google Maps Route Finding Simulation</h3>
            <p className="text-sm text-white/70">
              BFS finds the shortest path by exploring all neighbors level by level
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="inline-block bg-gray-800/50 p-4 rounded-xl border border-white/10">
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(12, 1fr)` }}>
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <motion.div
                key={`${rowIndex}-${colIndex}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, delay: (rowIndex + colIndex) * 0.01 }}
                className={`
                  w-12 h-12 rounded-md border border-white/20 transition-all duration-300 flex items-center justify-center
                  ${getCellStyle(rowIndex, colIndex, cell)}
                  ${!isSearching && cell === 'empty' ? 'cursor-pointer hover:bg-white/20' : ''}
                `}
              >
                {cell === 'start' && <MapPin className="w-6 h-6 text-white" />}
                {cell === 'end' && <Flag className="w-6 h-6 text-white" />}
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded"></div>
          <span className="text-white/70">Start</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-red-400 to-rose-500 rounded"></div>
          <span className="text-white/70">Destination</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-700 rounded"></div>
          <span className="text-white/70">Obstacle (Building/Traffic)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-400/50 rounded"></div>
          <span className="text-white/70">Explored Route</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded"></div>
          <span className="text-white/70">Shortest Path</span>
        </div>
      </div>

      {/* Results */}
      {searchComplete && shortestPath.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-center"
        >
          <p className="text-green-400 font-semibold">
            ✓ Route Found! Distance: {shortestPath.length} cells
          </p>
          <p className="text-white/70 text-sm">
            Explored {visitedCells.length} possible routes
          </p>
        </motion.div>
      )}
    </div>
  );
}
