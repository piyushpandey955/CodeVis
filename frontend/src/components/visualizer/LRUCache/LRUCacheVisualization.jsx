import { useEffect } from 'react';
import { motion } from 'framer-motion';
import useLRUCacheStore from '../../../store/lruCacheStore';
import { HardDrive, TrendingUp } from 'lucide-react';

export default function LRUCacheVisualization() {
  const { cache, capacity, hitRate, hits, misses, reset } = useLRUCacheStore();

  useEffect(() => {
    reset();
  }, []);

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Info Banner */}
      <div className="w-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-xl p-4">
        <div className="flex items-center gap-3 text-white">
          <HardDrive className="w-6 h-6 text-emerald-400" />
          <div>
            <h3 className="font-bold text-lg">Browser Cache Simulation</h3>
            <p className="text-sm text-white/70">
              LRU Cache keeps most recently used pages, evicting the oldest when full
            </p>
          </div>
        </div>
      </div>

      {/* Cache Stats */}
      <div className="w-full grid grid-cols-4 gap-4">
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 text-center">
          <div className="text-blue-400 text-2xl font-bold">{cache.length}</div>
          <div className="text-white/70 text-sm">Cached Pages</div>
        </div>
        <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4 text-center">
          <div className="text-purple-400 text-2xl font-bold">{capacity}</div>
          <div className="text-white/70 text-sm">Capacity</div>
        </div>
        <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center">
          <div className="text-green-400 text-2xl font-bold">{hits}</div>
          <div className="text-white/70 text-sm">Cache Hits</div>
        </div>
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-center">
          <div className="text-red-400 text-2xl font-bold">{misses}</div>
          <div className="text-white/70 text-sm">Cache Misses</div>
        </div>
      </div>

      {/* Hit Rate */}
      <div className="w-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-white font-semibold">Cache Hit Rate</span>
          </div>
          <span className="text-green-400 text-2xl font-bold">{hitRate.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${hitRate}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
          />
        </div>
      </div>

      {/* Cache Visualization */}
      <div className="w-full">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-white font-semibold">Cache Contents (Most Recent → Oldest)</h4>
          <span className="text-white/50 text-sm">Left = Most Recent</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {cache.length === 0 ? (
            <div className="w-full text-center py-12 bg-white/5 border border-white/10 rounded-lg">
              <HardDrive className="w-12 h-12 mx-auto mb-2 text-white/30" />
              <p className="text-white/50">Cache is empty. Visit some pages!</p>
            </div>
          ) : (
            cache.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`
                  flex-shrink-0 w-48 p-4 rounded-lg border-2 transition-all
                  ${index === 0 
                    ? 'bg-gradient-to-br from-green-500/30 to-emerald-500/30 border-green-500 scale-105' 
                    : index === cache.length - 1 && cache.length === capacity
                    ? 'bg-gradient-to-br from-red-500/20 to-rose-500/20 border-red-500/50 opacity-70'
                    : 'bg-white/10 border-white/20'
                  }
                `}
              >
                <div className="text-white/50 text-xs mb-1">
                  {index === 0 ? '🔥 Most Recent' : index === cache.length - 1 && cache.length === capacity ? '⚠️ Next to Evict' : `Position ${index + 1}`}
                </div>
                <div className="text-white font-mono font-bold text-lg mb-1">{item.key}</div>
                <div className="text-white/70 text-sm">{item.value}</div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-green-500/30 to-emerald-500/30 border-2 border-green-500 rounded"></div>
          <span className="text-white/70">Most Recently Used</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white/10 border-2 border-white/20 rounded"></div>
          <span className="text-white/70">Cached Page</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-red-500/20 to-rose-500/20 border-2 border-red-500/50 rounded"></div>
          <span className="text-white/70">Will Be Evicted Next</span>
        </div>
      </div>

      {/* How It Works */}
      <div className="w-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-lg p-4">
        <h4 className="text-emerald-400 font-semibold mb-2">How LRU Cache Works:</h4>
        <div className="text-white/70 text-sm space-y-1">
          <p>• When you access a page, it moves to the front (most recent)</p>
          <p>• When cache is full, the oldest page (rightmost) is evicted</p>
          <p>• Cache hits are fast (page already in cache)</p>
          <p>• Cache misses require fetching from slower storage</p>
        </div>
      </div>
    </div>
  );
}
