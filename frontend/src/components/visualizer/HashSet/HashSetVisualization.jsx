import { motion, AnimatePresence } from 'framer-motion';
import useHashSetStore from '../../../store/hashSetStore';

export default function HashSetVisualization() {
  const { buckets, highlightedBuckets } = useHashSetStore();

  return (
    <div className="w-full space-y-4">
      <div className="text-center text-white/70 mb-4">
        Hash Function: <span className="text-purple-400 font-mono">hash(value) = (Σ str(value).charCodeAt(i) * 31^i) % 10</span>
      </div>

      <div className="space-y-3">
        {buckets.map((bucket, index) => {
          const isHighlighted = highlightedBuckets.includes(index);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`
                flex items-center gap-4 p-4 rounded-xl border transition-all duration-300
                ${isHighlighted 
                  ? 'bg-purple-500/20 border-purple-500 shadow-lg shadow-purple-500/30' 
                  : 'bg-white/5 border-white/10'
                }
              `}
            >
              {/* Bucket Index */}
              <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <div className="text-white font-bold text-xl">{index}</div>
              </div>

              {/* Arrow */}
              <div className="text-white/30 text-2xl">→</div>

              {/* Bucket Contents */}
              <div className="flex-1 min-h-[60px] flex items-center gap-2 overflow-x-auto">
                <AnimatePresence>
                  {bucket.length === 0 ? (
                    <div className="text-white/30 italic">empty</div>
                  ) : (
                    bucket.map((item, itemIndex) => (
                      <motion.div
                        key={item.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative flex-shrink-0"
                      >
                        <div className="px-4 py-2 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg border border-white/20 shadow-lg">
                          <div className="text-white font-semibold">
                            {item.value}
                          </div>
                        </div>
                        {itemIndex < bucket.length - 1 && (
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 text-white/30">
                            →
                          </div>
                        )}
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              {/* Collision Count */}
              {bucket.length > 1 && (
                <div className="flex-shrink-0 px-3 py-1 bg-orange-500/20 border border-orange-500/50 rounded-full text-orange-400 text-xs font-semibold">
                  {bucket.length} collisions
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
          <div className="text-white/50 text-sm mb-1">Total Buckets</div>
          <div className="text-white font-bold text-2xl">{buckets.length}</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
          <div className="text-white/50 text-sm mb-1">Used Buckets</div>
          <div className="text-white font-bold text-2xl">
            {buckets.filter(b => b.length > 0).length}
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
          <div className="text-white/50 text-sm mb-1">Unique Values</div>
          <div className="text-white font-bold text-2xl">
            {buckets.reduce((sum, b) => sum + b.length, 0)}
          </div>
        </div>
      </div>
    </div>
  );
}
