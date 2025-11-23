import React, { useState } from 'react';
import { Plus, Minus, Search, Eye, TrendingDown, TrendingUp, GitBranch, Trash2, BarChart3 } from 'lucide-react';
import useTreeStore from '../../../store/treeStore';

const TreeControls = () => {
  const {
    insert,
    delete: deleteNode,
    search,
    findMin,
    findMax,
    inorderTraversal,
    preorderTraversal,
    postorderTraversal,
    getHeight,
    clear,
    root,
  } = useTreeStore();

  const [inputValue, setInputValue] = useState('');

  const handleInsert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      alert('Please enter a valid number');
      return;
    }
    insert(value);
    setInputValue('');
  };

  const handleDelete = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      alert('Please enter a valid number');
      return;
    }
    deleteNode(value);
    setInputValue('');
  };

  const handleSearch = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      alert('Please enter a valid number');
      return;
    }
    search(value);
    setInputValue('');
  };

  const isEmpty = () => root === null;

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-300">
          Enter Value
        </label>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleInsert()}
          placeholder="Enter a number..."
          className="w-full px-4 py-3 bg-gray-800 border border-white/20 rounded-lg 
                   text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 
                   transition-colors duration-200"
        />
      </div>

      {/* Basic Operations */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Basic Operations
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleInsert}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 
                     text-white rounded-lg transition-colors duration-200 font-semibold cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Insert
          </button>

          <button
            onClick={handleDelete}
            disabled={isEmpty()}
            className={`
              flex items-center justify-center gap-2 px-4 py-3 rounded-lg 
              transition-colors duration-200 font-semibold
              ${isEmpty() 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-red-500 hover:bg-red-600 text-white cursor-pointer'
              }
            `}
          >
            <Minus className="w-4 h-4" />
            Delete
          </button>

          <button
            onClick={handleSearch}
            disabled={isEmpty()}
            className={`
              flex items-center justify-center gap-2 px-4 py-3 rounded-lg 
              transition-colors duration-200 font-semibold
              ${isEmpty() 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-purple-500 hover:bg-purple-600 text-white cursor-pointer'
              }
            `}
          >
            <Search className="w-4 h-4" />
            Search
          </button>

          <button
            onClick={clear}
            disabled={isEmpty()}
            className={`
              flex items-center justify-center gap-2 px-4 py-3 rounded-lg 
              transition-colors duration-200 font-semibold
              ${isEmpty() 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer'
              }
            `}
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        </div>
      </div>

      {/* Find Operations */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Find Operations
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={findMin}
            disabled={isEmpty()}
            className={`
              flex items-center justify-center gap-2 px-4 py-3 rounded-lg 
              transition-colors duration-200 font-semibold
              ${isEmpty() 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'
              }
            `}
          >
            <TrendingDown className="w-4 h-4" />
            Find Min
          </button>

          <button
            onClick={findMax}
            disabled={isEmpty()}
            className={`
              flex items-center justify-center gap-2 px-4 py-3 rounded-lg 
              transition-colors duration-200 font-semibold
              ${isEmpty() 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'
              }
            `}
          >
            <TrendingUp className="w-4 h-4" />
            Find Max
          </button>

          <button
            onClick={getHeight}
            disabled={isEmpty()}
            className={`
              flex items-center justify-center gap-2 px-4 py-3 rounded-lg 
              transition-colors duration-200 font-semibold col-span-2
              ${isEmpty() 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-cyan-500 hover:bg-cyan-600 text-white cursor-pointer'
              }
            `}
          >
            <BarChart3 className="w-4 h-4" />
            Get Height
          </button>
        </div>
      </div>

      {/* Traversal Operations */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Tree Traversals
        </h4>
        <div className="space-y-2">
          <button
            onClick={inorderTraversal}
            disabled={isEmpty()}
            className={`
              w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg 
              transition-colors duration-200 font-semibold
              ${isEmpty() 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-amber-500 hover:bg-amber-600 text-white cursor-pointer'
              }
            `}
          >
            <GitBranch className="w-4 h-4" />
            Inorder (L-Root-R)
          </button>

          <button
            onClick={preorderTraversal}
            disabled={isEmpty()}
            className={`
              w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg 
              transition-colors duration-200 font-semibold
              ${isEmpty() 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-amber-500 hover:bg-amber-600 text-white cursor-pointer'
              }
            `}
          >
            <Eye className="w-4 h-4" />
            Preorder (Root-L-R)
          </button>

          <button
            onClick={postorderTraversal}
            disabled={isEmpty()}
            className={`
              w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg 
              transition-colors duration-200 font-semibold
              ${isEmpty() 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-amber-500 hover:bg-amber-600 text-white cursor-pointer'
              }
            `}
          >
            <GitBranch className="w-4 h-4" />
            Postorder (L-R-Root)
          </button>
        </div>
      </div>

      {/* Quick Insert */}
      <div className="space-y-3 pt-4 border-t border-white/10">
        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Quick Insert
        </h4>
        <div className="grid grid-cols-5 gap-2">
          {[10, 20, 30, 40, 50].map((num) => (
            <button
              key={num}
              onClick={() => insert(num)}
              className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg 
                       font-semibold transition-colors duration-200 cursor-pointer"
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TreeControls;
