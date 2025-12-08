import { motion, AnimatePresence } from 'framer-motion';
import usePriorityQueueStore from '../../../store/priorityQueueStore';

export default function PriorityQueueVisualization() {
  const { heap, highlightedIndices, type } = usePriorityQueueStore();

  const getNodePosition = (index) => {
    const level = Math.floor(Math.log2(index + 1));
    const levelStart = Math.pow(2, level) - 1;
    const positionInLevel = index - levelStart;
    const nodesInLevel = Math.pow(2, level);
    
    const x = (positionInLevel + 0.5) / nodesInLevel;
    const y = level * 120 + 50;
    
    return { x: `${x * 100}%`, y: `${y}px` };
  };

  const getParentIndex = (index) => Math.floor((index - 1) / 2);
  const getLeftChildIndex = (index) => 2 * index + 1;
  const getRightChildIndex = (index) => 2 * index + 2;

  return (
    <div className="relative w-full min-h-[500px] flex flex-col items-center">
      {/* Type Indicator */}
      <div className="mb-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold">
        {type === 'min' ? 'Min Heap' : 'Max Heap'} (Root: {type === 'min' ? 'Lowest' : 'Highest'} Priority)
      </div>

      {heap.length === 0 ? (
        <div className="text-white/50 text-xl mt-20">
          Priority Queue is empty. Insert elements to visualize.
        </div>
      ) : (
        <div className="relative w-full" style={{ height: `${(Math.floor(Math.log2(heap.length)) + 1) * 120 + 100}px` }}>
          {/* Draw edges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            {heap.map((_, index) => {
              const leftChild = getLeftChildIndex(index);
              const rightChild = getRightChildIndex(index);
              
              const parentPos = getNodePosition(index);
              const parentX = parseFloat(parentPos.x);
              const parentY = parseFloat(parentPos.y);

              return (
                <g key={index}>
                  {leftChild < heap.length && (
                    <line
                      x1={`${parentX}%`}
                      y1={parentY + 30}
                      x2={getNodePosition(leftChild).x}
                      y2={parseFloat(getNodePosition(leftChild).y) + 30}
                      stroke="rgba(255, 255, 255, 0.3)"
                      strokeWidth="2"
                    />
                  )}
                  {rightChild < heap.length && (
                    <line
                      x1={`${parentX}%`}
                      y1={parentY + 30}
                      x2={getNodePosition(rightChild).x}
                      y2={parseFloat(getNodePosition(rightChild).y) + 30}
                      stroke="rgba(255, 255, 255, 0.3)"
                      strokeWidth="2"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Draw nodes */}
          <AnimatePresence>
            {heap.map((element, index) => {
              const pos = getNodePosition(index);
              const isHighlighted = highlightedIndices.includes(index);
              const isRoot = index === 0;

              return (
                <motion.div
                  key={element.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    left: pos.x,
                    top: pos.y
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute"
                  style={{ 
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2
                  }}
                >
                  <div 
                    className={`
                      w-20 h-20 rounded-full flex flex-col items-center justify-center
                      font-bold text-white transition-all duration-300 shadow-lg
                      ${isHighlighted 
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500 scale-110 shadow-yellow-500/50' 
                        : isRoot
                        ? 'bg-gradient-to-br from-purple-500 to-pink-600'
                        : 'bg-gradient-to-br from-blue-500 to-purple-600'
                      }
                    `}
                  >
                    <div className="text-lg">{element.value}</div>
                    <div className="text-xs text-white/80">P: {element.priority}</div>
                  </div>
                  {isRoot && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-purple-400">
                      ROOT
                    </div>
                  )}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/50">
                    [{index}]
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
