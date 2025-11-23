import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useQueueStore from '../../../store/queueStore';

const QueueVisualization = () => {
  const { queue, maxSize, highlightedIndex } = useQueueStore();

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-900 rounded-lg p-8 relative">
      {/* Queue Container */}
      <div className="relative flex items-center gap-2 min-w-full overflow-x-auto pb-8">
        {/* Front Marker */}
        {queue.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-8 left-0 text-sm text-green-400 font-semibold whitespace-nowrap flex items-center gap-1"
          >
            <span>↓</span>
            <span>FRONT</span>
          </motion.div>
        )}

        {/* Rear Marker */}
        {queue.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-8 text-sm text-purple-400 font-semibold whitespace-nowrap flex items-center gap-1"
            style={{ left: `${(queue.length - 1) * 140}px` }}
          >
            <span>↓</span>
            <span>REAR</span>
          </motion.div>
        )}
        
        {/* Queue Elements */}
        <div className="flex items-center gap-4">
          <AnimatePresence mode="popLayout">
            {queue.map((value, index) => (
              <motion.div
                key={`${value}-${index}`}
                initial={{ opacity: 0, x: 100, scale: 0.5 }}
                animate={{ 
                  opacity: 1, 
                  x: 0, 
                  scale: 1,
                  boxShadow: highlightedIndex === index 
                    ? '0 0 30px rgba(168, 85, 247, 0.8)' 
                    : '0 4px 6px rgba(0, 0, 0, 0.3)'
                }}
                exit={{ 
                  opacity: 0, 
                  x: -100, 
                  scale: 0.5,
                  transition: { duration: 0.3 }
                }}
                transition={{ 
                  type: 'spring',
                  stiffness: 300,
                  damping: 25,
                  duration: 0.5 
                }}
                className={`
                  w-32 h-32 rounded-lg flex items-center justify-center
                  text-white text-2xl font-bold relative
                  border-2 transition-all duration-300
                  ${highlightedIndex === index 
                    ? 'bg-purple-500 border-purple-300 scale-110' 
                    : 'bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-400'
                  }
                `}
              >
                {value}
                
                {/* Index Label */}
                <div className="absolute -bottom-6 text-xs text-gray-400">
                  [{index}]
                </div>

                {/* Arrow to next element */}
                {index < queue.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute -right-6 text-2xl text-white"
                  >
                    →
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Queue Info */}
      <div className="absolute top-4 right-4 bg-gray-800 rounded-lg p-4 border border-white/10">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-gray-400">Size:</span>
            <span className="text-white font-semibold">{queue.length} / {maxSize}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-400">Status:</span>
            <span className={`font-semibold ${
              queue.length === 0 ? 'text-yellow-400' : 
              queue.length === maxSize ? 'text-red-400' : 
              'text-green-400'
            }`}>
              {queue.length === 0 ? 'Empty' : 
               queue.length === maxSize ? 'Full' : 
               'Active'}
            </span>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {queue.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500 text-lg text-center"
        >
          <p>Queue is empty</p>
          <p className="text-sm mt-2">Enqueue elements to begin</p>
        </motion.div>
      )}

      {/* FIFO Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 rounded-lg px-4 py-2 border border-white/10">
        <span className="text-gray-400 text-sm">FIFO: </span>
        <span className="text-purple-400 font-semibold text-sm">First In, First Out</span>
      </div>
    </div>
  );
};

export default QueueVisualization;
