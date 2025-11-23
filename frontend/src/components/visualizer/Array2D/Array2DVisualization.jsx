import React from 'react';
import { motion } from 'framer-motion';
import use2DArrayStore from '../../../store/array2DStore';
import { colors } from '../../../utils/animations';

const Array2DVisualization = () => {
  const { matrix, highlightedCells } = use2DArrayStore();

  const isCellHighlighted = (row, col) => {
    return highlightedCells.some(cell => cell.row === row && cell.col === col);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-8">
      {/* Matrix Dimensions Info */}
      <div className="text-center">
        <p className="text-sm text-gray-400">
          Dimensions: <span className="text-white font-mono">{matrix.length} × {matrix[0]?.length || 0}</span>
        </p>
      </div>

      {/* Column Headers */}
      <div className="flex items-center gap-2">
        <div className="w-12"></div>
        {matrix[0]?.map((_, colIndex) => (
          <div key={`col-header-${colIndex}`} className="w-16 text-center">
            <span className="text-xs text-gray-400 font-mono">[{colIndex}]</span>
          </div>
        ))}
      </div>

      {/* 2D Matrix */}
      <div className="space-y-2">
        {matrix.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex items-center gap-2">
            {/* Row Header */}
            <div className="w-12 text-center">
              <span className="text-xs text-gray-400 font-mono">[{rowIndex}]</span>
            </div>
            
            {/* Row Cells */}
            <div className="flex gap-2">
              {row.map((value, colIndex) => (
                <motion.div
                  key={`${rowIndex}-${colIndex}-${value}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    backgroundColor: isCellHighlighted(rowIndex, colIndex) 
                      ? colors.active 
                      : colors.info,
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3, delay: (rowIndex * row.length + colIndex) * 0.02 }}
                  className="w-16 h-16 flex items-center justify-center rounded-lg shadow-md border border-white/20"
                >
                  <span className="text-lg font-bold text-white">{value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Array2DVisualization;
