import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import useGraphStore from '../../../store/graphStore';

const GraphVisualization = () => {
  const {
    nodes,
    edges,
    highlightedNodes,
    highlightedEdges,
    isTraversing,
    isDirected,
    isWeighted,
    selectedNode,
    selectNode,
    updateNodePosition,
  } = useGraphStore();

  const [draggedNode, setDraggedNode] = useState(null);
  const containerRef = useRef(null);

  // Handle node drag
  const handleNodeDragStart = (nodeId) => {
    if (!isTraversing) {
      setDraggedNode(nodeId);
    }
  };

  const handleNodeDrag = (e, nodeId) => {
    if (draggedNode === nodeId && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 800;
      const y = ((e.clientY - rect.top) / rect.height) * 600;
      
      // Keep nodes within viewBox bounds
      const boundedX = Math.max(40, Math.min(x, 760));
      const boundedY = Math.max(40, Math.min(y, 560));
      
      updateNodePosition(nodeId, boundedX, boundedY);
    }
  };

  const handleNodeDragEnd = () => {
    setDraggedNode(null);
  };

  // Calculate edge path
  const getEdgePath = (fromNode, toNode) => {
    const dx = toNode.x - fromNode.x;
    const dy = toNode.y - fromNode.y;
    const angle = Math.atan2(dy, dx);
    
    const nodeRadius = 22; // Match the node size (w-11 h-11 = 44px / 2)
    const startX = fromNode.x + nodeRadius * Math.cos(angle);
    const startY = fromNode.y + nodeRadius * Math.sin(angle);
    const endX = toNode.x - nodeRadius * Math.cos(angle);
    const endY = toNode.y - nodeRadius * Math.sin(angle);

    return { startX, startY, endX, endY, angle };
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Info Panel */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-white/10">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-gray-400">Nodes: </span>
              <span className="text-white font-bold">{nodes.length}</span>
            </div>
            <div>
              <span className="text-gray-400">Edges: </span>
              <span className="text-white font-bold">{edges.length}</span>
            </div>
            <div>
              <span className="text-gray-400">Type: </span>
              <span className="text-purple-400 font-bold">
                {isDirected ? 'Directed' : 'Undirected'} {isWeighted ? '& Weighted' : ''}
              </span>
            </div>
          </div>
          {selectedNode && (
            <div className="text-gray-400">
              Selected: <span className="text-green-400 font-bold">
                {nodes.find(n => n.id === selectedNode)?.label}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Graph Visualization */}
      <div
        ref={containerRef}
        className="flex-1 bg-gray-900 rounded-lg p-6 border border-white/10 relative overflow-hidden min-h-[600px]"
        onMouseMove={(e) => draggedNode && handleNodeDrag(e, draggedNode)}
        onMouseUp={handleNodeDragEnd}
        onMouseLeave={handleNodeDragEnd}
      >
        {nodes.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🕸️</div>
              <p className="text-gray-400 text-lg">Graph is empty</p>
              <p className="text-gray-500 text-sm mt-2">Add nodes to build your graph</p>
            </div>
          </div>
        ) : (
          <>
            {/* SVG Layer for edges */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
              <defs>
                {/* Arrow marker for directed graphs */}
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3, 0 6" fill="#6366f1" />
                </marker>
                <marker
                  id="arrowhead-highlighted"
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3, 0 6" fill="#a78bfa" />
                </marker>
              </defs>
              
              {/* Render edges */}
              {edges.map((edge) => {
                const fromNode = nodes.find(n => n.id === edge.from);
                const toNode = nodes.find(n => n.id === edge.to);
                
                if (!fromNode || !toNode) return null;

                const { startX, startY, endX, endY } = getEdgePath(fromNode, toNode);
                const isHighlighted = highlightedEdges.includes(edge.id);
                
                return (
                  <g key={edge.id}>
                    {/* Edge line */}
                    <line
                      x1={startX}
                      y1={startY}
                      x2={endX}
                      y2={endY}
                      stroke={isHighlighted ? '#a78bfa' : '#6366f1'}
                      strokeWidth={isHighlighted ? 3 : 2}
                      markerEnd={isDirected ? (isHighlighted ? 'url(#arrowhead-highlighted)' : 'url(#arrowhead)') : ''}
                      className="transition-all duration-300"
                    />
                    
                    {/* Weight label */}
                    {isWeighted && (
                      <g>
                        <rect
                          x={(startX + endX) / 2 - 12}
                          y={(startY + endY) / 2 - 10}
                          width="24"
                          height="20"
                          fill="#1f2937"
                          rx="4"
                        />
                        <text
                          x={(startX + endX) / 2}
                          y={(startY + endY) / 2 + 4}
                          fill="white"
                          fontSize="12"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          {edge.weight}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Nodes layer on top */}
            <div className="absolute inset-0" style={{ zIndex: 2 }}>
              {/* Render nodes */}
              {nodes.map((node) => {
          const isHighlighted = highlightedNodes.includes(node.id);
          const isSelected = selectedNode === node.id;
          const traversalIndex = highlightedNodes.indexOf(node.id);
          const hasTraversalOrder = traversalIndex !== -1 && isTraversing;

          let nodeColor = 'bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-blue-400';
          
          if (isSelected) {
            nodeColor = 'bg-gradient-to-br from-green-400 to-emerald-500 border-2 border-green-300 shadow-lg shadow-green-500/50';
          } else if (hasTraversalOrder) {
            const totalNodes = highlightedNodes.length;
            const progress = traversalIndex / Math.max(totalNodes - 1, 1);
            
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

          // Convert coordinates from viewBox to percentage
          const leftPercent = (node.x / 800) * 100;
          const topPercent = (node.y / 600) * 100;

          return (
            <motion.div
              key={node.id}
              className="absolute cursor-move"
              style={{
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                scale: hasTraversalOrder || isSelected ? 1.1 : 1,
              }}
              onMouseDown={() => handleNodeDragStart(node.id)}
              onClick={(e) => {
                e.stopPropagation();
                if (!isTraversing) {
                  selectNode(isSelected ? null : node.id);
                }
              }}
            >
              <div
                className={`
                  w-11 h-11 rounded-full flex items-center justify-center
                  font-bold text-white text-xs relative transition-all duration-300
                  ${nodeColor}
                `}
              >
                {node.label}
                
                {/* Traversal order number */}
                {hasTraversalOrder && (
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900/90 px-2 py-0.5 rounded-full text-[10px] text-white font-bold border border-white/30">
                    #{traversalIndex + 1}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GraphVisualization;
