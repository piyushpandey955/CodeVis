import React, { useState } from 'react';
import { Plus, Trash2, Search, RefreshCw, ArrowDownUp } from 'lucide-react';
import useArrayStore from '../../../store/arrayStore';

const ArrayControls = () => {
  const { insert, deleteAt, update, search, reverse, bubbleSort, setHighlightedIndices } = useArrayStore();
  
  const [value, setValue] = useState('');
  const [index, setIndex] = useState('');

  const handleInsert = () => {
    if (value === '' || index === '') return;
    insert(parseInt(index), parseInt(value));
    setValue('');
    setIndex('');
    setHighlightedIndices([]);
  };

  const handleDelete = () => {
    if (index === '') return;
    deleteAt(parseInt(index));
    setIndex('');
    setHighlightedIndices([]);
  };

  const handleUpdate = () => {
    if (value === '' || index === '') return;
    update(parseInt(index), parseInt(value));
    setValue('');
    setIndex('');
    setHighlightedIndices([]);
  };

  const handleSearch = () => {
    if (value === '') return;
    search(parseInt(value));
    setValue('');
  };

  const handleReverse = () => {
    reverse();
    setHighlightedIndices([]);
  };

  const handleBubbleSort = () => {
    bubbleSort();
  };

  return (
    <div className="space-y-4">
      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Value</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Index</label>
          <input
            type="number"
            value={index}
            onChange={(e) => setIndex(e.target.value)}
            placeholder="Enter index"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Operation Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <button
          onClick={handleInsert}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 font-semibold cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Insert
        </button>
        
        <button
          onClick={handleDelete}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 font-semibold cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
        
        <button
          onClick={handleUpdate}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-semibold cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Update
        </button>
        
        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-200 font-semibold cursor-pointer"
        >
          <Search className="w-4 h-4" />
          Search
        </button>
        
        <button
          onClick={handleReverse}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors duration-200 font-semibold cursor-pointer"
        >
          <ArrowDownUp className="w-4 h-4" />
          Reverse
        </button>
      </div>

      {/* Sorting Algorithms */}
      <div className="pt-4 border-t border-white/10">
        <h3 className="text-lg font-semibold text-white mb-3">Sorting Algorithms</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <button
            onClick={handleBubbleSort}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors duration-200 font-semibold cursor-pointer"
          >
            Bubble Sort
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArrayControls;
