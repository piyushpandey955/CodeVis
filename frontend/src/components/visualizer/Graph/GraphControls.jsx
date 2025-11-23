import React, { useState } from 'react';
import { Plus, Minus, Link, Unlink, Search, GitBranch, Navigation, ToggleLeft, ToggleRight, Trash2, Weight } from 'lucide-react';
import useGraphStore from '../../../store/graphStore';

const GraphControls = () => {
  const {
    addNode,
    removeNode,
    addEdge,
    removeEdge,
    bfs,
    dfs,
    clear,
    toggleDirected,
    toggleWeighted,
    nodes,
    edges,
    selectedNode,
    clearSelection,
    isDirected,
    isWeighted,
  } = useGraphStore();

  const [nodeLabel, setNodeLabel] = useState('');
  const [edgeWeight, setEdgeWeight] = useState('1');
  const [startNodeId, setStartNodeId] = useState('');

  const handleAddNode = () => {
    if (addNode(nodeLabel)) {
      setNodeLabel('');
    }
  };

  const handleRemoveNode = () => {
    if (startNodeId) {
      removeNode(startNodeId);
      setStartNodeId('');
    }
  };

  const handleAddEdge = () => {
    if (selectedNode && startNodeId && selectedNode !== startNodeId) {
      const weight = isWeighted ? parseInt(edgeWeight) || 1 : 1;
      addEdge(startNodeId, selectedNode, weight);
      clearSelection();
      setStartNodeId('');
    }
  };

  const handleBFS = () => {
    if (startNodeId) {
      bfs(startNodeId);
    }
  };

  const handleDFS = () => {
    if (startNodeId) {
      dfs(startNodeId);
    }
  };

  const isEmpty = () => nodes.length === 0;

  return (
    <div className="space-y-6">
      {/* Graph Type Settings */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Graph Type
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={toggleDirected}
            className={`
              flex items-center justify-center gap-2 px-4 py-3 rounded-lg 
              transition-colors duration-200 font-semibold cursor-pointer
              ${isDirected 
                ? 'bg-purple-500 hover:bg-purple-600 text-white' 
                : 'bg-gray-700 hover:bg-gray-600 text-white'
              }
            `}
          >
            {isDirected ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
            {isDirected ? 'Directed' : 'Undirected'}
          </button>

          <button
            onClick={toggleWeighted}
            className={`
              flex items-center justify-center gap-2 px-4 py-3 rounded-lg 
              transition-colors duration-200 font-semibold cursor-pointer
              ${isWeighted 
                ? 'bg-indigo-500 hover:bg-indigo-600 text-white' 
                : 'bg-gray-700 hover:bg-gray-600 text-white'
              }
            `}
          >
            <Weight className="w-4 h-4" />
            {isWeighted ? 'Weighted' : 'Unweighted'}
          </button>
        </div>
      </div>

      {/* Add Node */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Node Operations
        </h4>
        <input
          type="text"
          value={nodeLabel}
          onChange={(e) => setNodeLabel(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddNode()}
          placeholder="Node label (e.g., A, B, C)..."
          className="w-full px-4 py-3 bg-gray-800 border border-white/20 rounded-lg 
                   text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 
                   transition-colors duration-200"
        />
        <button
          onClick={handleAddNode}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 
                   text-white rounded-lg transition-colors duration-200 font-semibold cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Node
        </button>
      </div>

      {/* Edge Operations */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Edge Operations
        </h4>
        
        <select
          value={startNodeId}
          onChange={(e) => setStartNodeId(e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-white/20 rounded-lg 
                   text-white focus:outline-none focus:border-purple-500 
                   transition-colors duration-200 cursor-pointer"
        >
          <option value="">Select start node...</option>
          {nodes.map(node => (
            <option key={node.id} value={node.id}>{node.label}</option>
          ))}
        </select>

        {isWeighted && (
          <input
            type="number"
            value={edgeWeight}
            onChange={(e) => setEdgeWeight(e.target.value)}
            placeholder="Edge weight"
            className="w-full px-4 py-3 bg-gray-800 border border-white/20 rounded-lg 
                     text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 
                     transition-colors duration-200"
          />
        )}

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleAddEdge}
            disabled={!selectedNode || !startNodeId || selectedNode === startNodeId}
            className={`
              flex items-center justify-center gap-2 px-4 py-3 rounded-lg 
              transition-colors duration-200 font-semibold
              ${!selectedNode || !startNodeId || selectedNode === startNodeId
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'
              }
            `}
          >
            <Link className="w-4 h-4" />
            Add Edge
          </button>

          <button
            onClick={handleRemoveNode}
            disabled={!startNodeId}
            className={`
              flex items-center justify-center gap-2 px-4 py-3 rounded-lg 
              transition-colors duration-200 font-semibold
              ${!startNodeId
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-red-500 hover:bg-red-600 text-white cursor-pointer'
              }
            `}
          >
            <Minus className="w-4 h-4" />
            Remove Node
          </button>
        </div>

        <p className="text-xs text-gray-400 italic">
          💡 Click nodes to select them for adding edges
        </p>
      </div>

      {/* Traversal Operations */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Graph Traversals
        </h4>
        <div className="space-y-2">
          <button
            onClick={handleBFS}
            disabled={isEmpty() || !startNodeId}
            className={`
              w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg 
              transition-colors duration-200 font-semibold
              ${isEmpty() || !startNodeId
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-amber-500 hover:bg-amber-600 text-white cursor-pointer'
              }
            `}
          >
            <GitBranch className="w-4 h-4" />
            BFS (Breadth-First)
          </button>

          <button
            onClick={handleDFS}
            disabled={isEmpty() || !startNodeId}
            className={`
              w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg 
              transition-colors duration-200 font-semibold
              ${isEmpty() || !startNodeId
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-amber-500 hover:bg-amber-600 text-white cursor-pointer'
              }
            `}
          >
            <Navigation className="w-4 h-4" />
            DFS (Depth-First)
          </button>
        </div>
      </div>

      {/* Clear Graph */}
      <div className="pt-4 border-t border-white/10">
        <button
          onClick={clear}
          disabled={isEmpty()}
          className={`
            w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg 
            transition-colors duration-200 font-semibold
            ${isEmpty() 
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
              : 'bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer'
            }
          `}
        >
          <Trash2 className="w-4 h-4" />
          Clear Graph
        </button>
      </div>

      {/* Quick Add Nodes */}
      <div className="space-y-3 pt-4 border-t border-white/10">
        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Quick Add Nodes
        </h4>
        <div className="grid grid-cols-5 gap-2">
          {['A', 'B', 'C', 'D', 'E'].map((label) => (
            <button
              key={label}
              onClick={() => addNode(label)}
              className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg 
                       font-semibold transition-colors duration-200 cursor-pointer"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GraphControls;
