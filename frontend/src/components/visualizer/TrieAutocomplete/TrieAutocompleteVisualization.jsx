import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useTrieAutocompleteStore from '../../../store/trieAutocompleteStore';
import { Search, CheckCircle } from 'lucide-react';

export default function TrieAutocompleteVisualization() {
  const { currentPath, suggestions, isSearching, searchTerm, reset, root } = useTrieAutocompleteStore();
  const [expandedNodes, setExpandedNodes] = useState(new Set());

  useEffect(() => {
    reset();
  }, []);

  // Auto-expand nodes along the search path
  useEffect(() => {
    if (currentPath) {
      const newExpanded = new Set();
      let path = '';
      for (const char of currentPath) {
        path += char;
        newExpanded.add(path);
      }
      setExpandedNodes(newExpanded);
    }
  }, [currentPath]);

  // Check if a node is on the highlighted path
  const isOnPath = (nodePath) => {
    return currentPath && currentPath.startsWith(nodePath);
  };

  // Render a single Trie node recursively
  const renderTrieNode = (node, char, depth = 0, pathSoFar = '') => {
    const currentNodePath = pathSoFar + char;
    const isHighlighted = isOnPath(currentNodePath);
    const isExpanded = expandedNodes.has(currentNodePath) || depth < 2;
    const hasChildren = Object.keys(node.children).length > 0;
    const childCount = Object.keys(node.children).length;

    return (
      <motion.div
        key={currentNodePath}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col"
        style={{ marginLeft: depth > 0 ? '24px' : '0' }}
      >
        <div className="flex items-center gap-2 mb-2">
          {/* Expand/Collapse button */}
          {hasChildren && (
            <button
              onClick={() => {
                const newExpanded = new Set(expandedNodes);
                if (newExpanded.has(currentNodePath)) {
                  newExpanded.delete(currentNodePath);
                } else {
                  newExpanded.add(currentNodePath);
                }
                setExpandedNodes(newExpanded);
              }}
              className="w-4 h-4 flex items-center justify-center text-white/50 hover:text-white transition-colors"
            >
              {isExpanded ? '▼' : '▶'}
            </button>
          )}
          
          {/* Node character */}
          <motion.div
            animate={{
              scale: isHighlighted ? 1.1 : 1,
            }}
            className={`
              px-3 py-2 rounded-lg border-2 font-mono text-base font-bold flex items-center gap-2
              ${isHighlighted 
                ? 'bg-gradient-to-br from-blue-400 to-purple-500 border-blue-300 text-white shadow-lg shadow-blue-500/50' 
                : 'bg-white/10 border-white/20 text-white/70'
              }
              transition-all duration-300
            `}
          >
            {char === '' ? 'ROOT' : char}
            {node.isEndOfWord && (
              <CheckCircle className="w-4 h-4 text-green-400" />
            )}
          </motion.div>

          {/* Child count badge */}
          {hasChildren && (
            <span className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded">
              {childCount} {childCount === 1 ? 'child' : 'children'}
            </span>
          )}
        </div>

        {/* Children */}
        <AnimatePresence>
          {isExpanded && hasChildren && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col space-y-1 border-l-2 border-white/10 pl-2"
            >
              {Object.entries(node.children)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([childChar, childNode]) =>
                  renderTrieNode(childNode, childChar, depth + 1, currentNodePath)
                )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Info Banner */}
      <div className="w-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4">
        <div className="flex items-center gap-3 text-white">
          <Search className="w-6 h-6 text-purple-400" />
          <div>
            <h3 className="font-bold text-lg">Search Engine Autocomplete Simulation</h3>
            <p className="text-sm text-white/70">
              Watch real-time Trie traversal as you search for words
            </p>
          </div>
        </div>
      </div>

      {/* Search Status */}
      {searchTerm && (
        <div className="w-full bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 text-white">
            <Search className="w-5 h-5 text-blue-400" />
            <span className="font-semibold">Searching: </span>
            <span className="font-mono text-blue-400 text-lg">{searchTerm}</span>
            {isSearching && (
              <span className="ml-2 text-sm text-white/50 animate-pulse">Traversing...</span>
            )}
          </div>
        </div>
      )}

      {/* Trie Tree Visualization */}
      <div className="w-full bg-gray-800/50 rounded-xl p-6 border border-white/10 max-h-[500px] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-white font-semibold">Trie Structure</h4>
          {root && Object.keys(root.children).length > 0 && (
            <button
              onClick={() => setExpandedNodes(new Set())}
              className="text-xs text-white/50 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded transition-colors"
            >
              Collapse All
            </button>
          )}
        </div>
        
        {root && Object.keys(root.children).length > 0 ? (
          <div className="space-y-2">
            {renderTrieNode(root, '', 0, '')}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-white/30 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <p className="text-white/50 text-lg mb-2">Trie is Empty</p>
            <p className="text-white/30 text-sm">
              Start by adding words using the "Add New Word" field on the left
            </p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4">
        <h4 className="text-white font-semibold mb-3">Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded border-2 border-blue-300"></div>
            <span className="text-white/70">Active Path</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 border-2 border-white/20 rounded"></div>
            <span className="text-white/70">Node</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <span className="text-white/70">Word End</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/70">▶/▼ Expand/Collapse</span>
          </div>
        </div>
      </div>

      {/* Suggestions Panel */}
      {suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4"
        >
          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-2 py-1 rounded text-sm">
              {suggestions.length}
            </span>
            Suggestions Found
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {suggestions.map((word, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg px-3 py-2 text-white font-mono text-sm text-center hover:scale-105 transition-transform cursor-default"
              >
                {word}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* How It Works */}
      <div className="w-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
        <h4 className="text-purple-400 font-semibold mb-2">How Trie Autocomplete Works:</h4>
        <div className="text-white/70 text-sm space-y-1">
          <p>• <strong>Root Node:</strong> Starting point of the Trie</p>
          <p>• <strong>Character Nodes:</strong> Each node represents a character in a word</p>
          <p>• <strong>Word Completion:</strong> Nodes marked with ✓ indicate complete words</p>
          <p>• <strong>Path Traversal:</strong> Blue highlighted nodes show the search path</p>
          <p>• <strong>Suggestions:</strong> All words found below the search path node</p>
        </div>
      </div>
    </div>
  );
}
