import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useTreeStore from '../../../store/treeStore';

const TreeVisualization = () => {
  const { root, highlightedNodes, traversalPath, currentTraversalIndex, isTraversing, countNodes } = useTreeStore();
  const canvasRef = useRef(null);

  // Calculate node positions using level-order traversal
  const calculatePositions = (root) => {
    if (!root) return [];

    const positions = [];
    const levelWidth = 800; // Canvas width
    const levelHeight = 80; // Vertical spacing between levels

    const calculateNodePositions = (node, level, left, right) => {
      if (!node) return;

      const x = (left + right) / 2;
      const y = level * levelHeight + 40;

      positions.push({
        node,
        x,
        y,
        level,
      });

      const mid = (left + right) / 2;
      calculateNodePositions(node.left, level + 1, left, mid);
      calculateNodePositions(node.right, level + 1, mid, right);
    };

    calculateNodePositions(root, 0, 0, levelWidth);
    return positions;
  };

  const positions = calculatePositions(root);

  // Draw connections between nodes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !root) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    positions.forEach(({ node, x, y }) => {
      if (node.left) {
        const leftPos = positions.find((p) => p.node.id === node.left.id);
        if (leftPos) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(leftPos.x, leftPos.y);
          ctx.strokeStyle = 'rgba(139, 92, 246, 0.5)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      if (node.right) {
        const rightPos = positions.find((p) => p.node.id === node.right.id);
        if (rightPos) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(rightPos.x, rightPos.y);
          ctx.strokeStyle = 'rgba(139, 92, 246, 0.5)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
    });
  }, [root, positions]);

  const nodeCount = countNodes(root);

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Info Panel */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-white/10">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-gray-400">Nodes: </span>
              <span className="text-white font-bold">{nodeCount}</span>
            </div>
            <div>
              <span className="text-gray-400">Type: </span>
              <span className="text-white font-bold">Binary Search Tree</span>
            </div>
          </div>
          {root && (
            <div className="text-gray-400">
              Root: <span className="text-purple-400 font-bold">{root.value}</span>
            </div>
          )}
        </div>
      </div>

      {/* Tree Visualization */}
      <div className="flex-1 bg-gray-900 rounded-lg p-6 border border-white/10 relative overflow-auto">
        {!root ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🌳</div>
              <p className="text-gray-400 text-lg">Tree is empty</p>
              <p className="text-gray-500 text-sm mt-2">Insert nodes to build your tree</p>
            </div>
          </div>
        ) : (
          <div className="relative min-h-[400px]" style={{ minWidth: '800px' }}>
            {/* Canvas for edges */}
            <canvas
              ref={canvasRef}
              width={800}
              height={Math.max(400, positions.length > 0 ? Math.max(...positions.map(p => p.y)) + 60 : 400)}
              className="absolute top-0 left-0"
            />

            {/* Nodes */}
            <AnimatePresence>
              {positions.map(({ node, x, y }) => {
                const isHighlighted = highlightedNodes.includes(node.id);
                const isRoot = node.id === root.id;
                
                // Get traversal order position for gradient coloring
                const traversalIndex = highlightedNodes.indexOf(node.id);
                const hasTraversalOrder = traversalIndex !== -1 && isTraversing;
                
                // Calculate color based on position in traversal
                let nodeColor = 'bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-blue-400';
                
                if (hasTraversalOrder) {
                  const totalNodes = highlightedNodes.length;
                  const progress = traversalIndex / Math.max(totalNodes - 1, 1);
                  
                  // Color progression from green -> yellow -> orange -> red
                  if (progress < 0.33) {
                    nodeColor = 'bg-gradient-to-br from-green-400 to-emerald-500 border-2 border-green-300 shadow-lg shadow-green-500/50';
                  } else if (progress < 0.66) {
                    nodeColor = 'bg-gradient-to-br from-yellow-400 to-amber-500 border-2 border-yellow-300 shadow-lg shadow-yellow-500/50';
                  } else {
                    nodeColor = 'bg-gradient-to-br from-orange-400 to-red-500 border-2 border-orange-300 shadow-lg shadow-orange-500/50';
                  }
                } else if (isHighlighted && !isTraversing) {
                  nodeColor = 'bg-purple-500 border-2 border-purple-300 shadow-lg shadow-purple-500/50';
                }

                return (
                  <motion.div
                    key={node.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute"
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {/* Node Circle */}
                    <motion.div
                      animate={{
                        scale: hasTraversalOrder || isHighlighted ? 1.1 : 1,
                      }}
                      className={`
                        w-12 h-12 rounded-full flex items-center justify-center
                        font-bold text-white text-lg relative transition-all duration-300
                        ${nodeColor}
                      `}
                    >
                      {node.value}
                      
                      {/* Traversal order number */}
                      {hasTraversalOrder && (
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900/90 px-2 py-0.5 rounded-full text-[10px] text-white font-bold border border-white/30">
                          #{traversalIndex + 1}
                        </div>
                      )}
                      
                      {/* Root label */}
                      {isRoot && !hasTraversalOrder && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-purple-400 font-semibold whitespace-nowrap">
                          ROOT
                        </div>
                      )}

                      {/* Left/Right labels */}
                      {!isRoot && (
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 font-medium">
                          {/* Label will be determined by parent relationship */}
                        </div>
                      )}
                    </motion.div>

                    {/* Leaf indicator */}
                    {!node.left && !node.right && (
                      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-green-400 font-medium">
                        LEAF
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeVisualization;
