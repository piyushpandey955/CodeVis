import React from 'react';
import { History, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const OperationHistory = ({ operations = [], onClear }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-indigo-400" />
          <h3 className="text-xl font-bold text-white">Operation History</h3>
          <span className="text-sm text-gray-400">({operations.length})</span>
        </div>
        
        {operations.length > 0 && (
          <button
            onClick={onClear}
            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
            title="Clear History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Operations List */}
      <div className="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar">
        <AnimatePresence>
          {operations.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-gray-500 text-sm text-center py-4"
            >
              No operations yet. Start interacting with the visualizer!
            </motion.p>
          ) : (
            operations.map((op, index) => (
              <motion.div
                key={op.id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 border border-white/10 rounded-lg p-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 font-mono">
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm text-white">{op.operation}</span>
                  </div>
                  <span className="text-xs text-gray-400">{op.timestamp}</span>
                </div>
                {op.details && (
                  <p className="text-xs text-gray-400 mt-1 ml-10">{op.details}</p>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OperationHistory;
