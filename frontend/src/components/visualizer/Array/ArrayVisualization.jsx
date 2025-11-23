import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useArrayStore from '../../../store/arrayStore';
import { colors } from '../../../utils/animations';

const ArrayVisualization = () => {
  const { array, highlightedIndices } = useArrayStore();

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-8">
      {/* Index Labels */}
      <div className="flex gap-4">
        {array.map((_, index) => (
          <div key={`index-${index}`} className="w-20 text-center">
            <span className="text-sm text-gray-400 font-mono">{index}</span>
          </div>
        ))}
      </div>

      {/* Array Elements */}
      <div className="flex gap-4">
        {array.map((value, index) => (
          <motion.div
            key={`${index}-${value}`}
            initial={{ opacity: 0, scale: 0, y: -50 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              backgroundColor: highlightedIndices.includes(index) 
                ? colors.active 
                : colors.info,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 flex items-center justify-center rounded-xl shadow-lg border-2 border-white/20"
          >
            <span className="text-2xl font-bold text-white">{value}</span>
          </motion.div>
        ))}
      </div>

      {/* Array Length Info */}
      <div className="text-center">
        <p className="text-sm text-gray-400">
          Length: <span className="text-white font-mono">{array.length}</span>
        </p>
      </div>
    </div>
  );
};

export default ArrayVisualization;
