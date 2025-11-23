import { AnimatePresence } from 'framer-motion';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import useLinkedListStore from '../../../store/linkedListStore';

const LinkedListVisualization = () => {
  const nodes = useLinkedListStore((state) => state.nodes);
  const highlightedIndex = useLinkedListStore((state) => state.highlightedIndex);
  const maxSize = useLinkedListStore((state) => state.maxSize);

  const NODES_PER_ROW = 5; // Maximum nodes per row before wrapping

  return (
    <div className="h-full flex flex-col">
      {/* List Info - Outside visualization container */}
      {nodes.length > 0 && (
        <div className="mb-4 bg-gray-800 rounded-lg p-4 border border-white/10">
          <div className="flex items-center justify-around text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Size:</span>
              <span className="text-white font-semibold">{nodes.length} / {maxSize}</span>
            </div>
            <div className="w-px h-6 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Head:</span>
              <span className="text-green-400 font-semibold">
                {nodes[0]?.value ?? 'null'}
              </span>
            </div>
            <div className="w-px h-6 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Tail:</span>
              <span className="text-purple-400 font-semibold">
                {nodes[nodes.length - 1]?.value ?? 'null'}
              </span>
            </div>
            <div className="w-px h-6 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Status:</span>
              <span className={`font-semibold ${
                nodes.length === 0 ? 'text-yellow-400' : 
                nodes.length === maxSize ? 'text-red-400' : 
                'text-green-400'
              }`}>
                {nodes.length === 0 ? 'Empty' : 
                 nodes.length === maxSize ? 'Full' : 
                 'Active'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Visualization Container */}
      <div className="flex-1 bg-gray-900 rounded-lg p-6 overflow-auto">
        {/* Empty State */}
        {nodes.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-white/60"
            >
              <div className="text-6xl mb-4">🔗</div>
              <p className="text-xl">Linked List is empty</p>
              <p className="text-sm mt-2">Insert nodes to get started</p>
            </motion.div>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {/* HEAD Marker */}
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-green-400 text-sm font-bold"
              >
                HEAD →
              </motion.div>
            </div>

            {/* Nodes Grid - Wraps to multiple rows */}
            <div className="flex flex-col gap-6">
              <AnimatePresence mode="popLayout">
                {Array.from({ length: Math.ceil(nodes.length / NODES_PER_ROW) }).map((_, rowIndex) => {
                  const rowNodes = nodes.slice(rowIndex * NODES_PER_ROW, (rowIndex + 1) * NODES_PER_ROW);
                  const startIndex = rowIndex * NODES_PER_ROW;
                  
                  return (
                    <div key={`row-${rowIndex}`} className="flex flex-wrap items-center gap-3">
                      {rowNodes.map((node, colIndex) => {
                        const index = startIndex + colIndex;
                        return (
                          <div key={node.id} className="flex items-center gap-3">
                            {/* Node */}
                            <motion.div
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ 
                                opacity: 1, 
                                scale: highlightedIndex === index ? 1.05 : 1,
                                boxShadow: highlightedIndex === index 
                                  ? '0 0 30px rgba(168, 85, 247, 0.8)' 
                                  : '0 4px 6px rgba(0, 0, 0, 0.3)'
                              }}
                              exit={{ opacity: 0, scale: 0.5 }}
                              transition={{ 
                                type: 'spring',
                                stiffness: 300,
                                damping: 25,
                                duration: 0.5
                              }}
                              className="relative"
                            >
                              {/* Position Label */}
                              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-gray-400">
                                [{index}]
                              </div>
                              
                              {/* Node Box */}
                              <div
                                className={`
                                  flex items-center gap-2 border-2 rounded-lg p-3
                                  text-white font-bold
                                  transition-all duration-300
                                  ${highlightedIndex === index 
                                    ? 'bg-purple-500 border-purple-300' 
                                    : 'bg-gradient-to-r from-blue-500 to-purple-600 border-blue-400'
                                  }
                                `}
                              >
                                {/* Data Part */}
                                <div className="flex flex-col items-center">
                                  <div className="text-white/80 text-xs">data</div>
                                  <div className="text-white text-lg font-bold min-w-12 text-center">
                                    {node.value}
                                  </div>
                                </div>
                                
                                {/* Divider */}
                                <div className="w-px h-10 bg-white/30"></div>
                                
                                {/* Next Pointer Part */}
                                <div className="flex flex-col items-center">
                                  <div className="text-white/80 text-xs">next</div>
                                  <div className="text-white text-sm font-mono">
                                    {index < nodes.length - 1 ? '→' : 'null'}
                                  </div>
                                </div>
                              </div>
                            </motion.div>

                            {/* Arrow to Next Node */}
                            {index < nodes.length - 1 && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                {colIndex < NODES_PER_ROW - 1 ? (
                                  // Horizontal arrow for same row
                                  <div className="text-purple-400 text-2xl">→</div>
                                ) : (
                                  // Down arrow for row wrap (last node in row)
                                  <div className="text-purple-400 text-2xl ml-2">↓</div>
                                )}
                              </motion.div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* TAIL Marker */}
            <div className="flex items-center gap-2 ml-auto">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-purple-400 text-sm font-bold"
              >
                ← TAIL
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkedListVisualization;
