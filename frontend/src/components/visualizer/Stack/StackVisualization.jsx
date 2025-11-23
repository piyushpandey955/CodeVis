import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStackStore from '../../../store/stackStore';

const StackVisualization = () => {
  const { stack, maxSize, highlightedIndex } = useStackStore();

  return (
    <div className="flex flex-col items-center justify-end h-full bg-gray-900 rounded-lg p-8 relative">
      {/* Stack Container */}
      <div className="relative flex flex-col-reverse items-center gap-2 min-h-[500px] justify-start">
        {/* Base Platform */}
        <div className="w-48 h-4 bg-gray-700 rounded-lg shadow-lg border-2 border-gray-600"></div>
        
        {/* Stack Elements */}
        <AnimatePresence>
          {stack.map((value, index) => (
            <motion.div
              key={`${value}-${index}`}
              initial={{ opacity: 0, y: -50, scale: 0.5 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                boxShadow: highlightedIndex === index 
                  ? '0 0 30px rgba(168, 85, 247, 0.8)' 
                  : '0 4px 6px rgba(0, 0, 0, 0.3)'
              }}
              exit={{ 
                opacity: 0, 
                y: -50, 
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
                w-48 h-16 rounded-lg flex items-center justify-center
                text-white text-2xl font-bold relative
                border-2 transition-all duration-300
                ${highlightedIndex === index 
                  ? 'bg-purple-500 border-purple-300 scale-105' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 border-blue-400'
                }
              `}
              style={{
                transform: highlightedIndex === index ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              {value}
              {index === stack.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute -right-20 text-sm text-purple-400 font-semibold whitespace-nowrap"
                >
                  ← TOP
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Stack Info */}
      <div className="absolute top-4 right-4 bg-gray-800 rounded-lg p-4 border border-white/10">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-gray-400">Size:</span>
            <span className="text-white font-semibold">{stack.length} / {maxSize}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-400">Status:</span>
            <span className={`font-semibold ${
              stack.length === 0 ? 'text-yellow-400' : 
              stack.length === maxSize ? 'text-red-400' : 
              'text-green-400'
            }`}>
              {stack.length === 0 ? 'Empty' : 
               stack.length === maxSize ? 'Full' : 
               'Active'}
            </span>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {stack.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500 text-lg"
        >
          Stack is empty - Push elements to begin
        </motion.div>
      )}
    </div>
  );
};

export default StackVisualization;
