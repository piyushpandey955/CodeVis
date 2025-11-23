import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import useLinkedListStore from '../../../store/linkedListStore';

const LinkedListControls = () => {
  const [insertValue, setInsertValue] = useState('');
  const [insertPosition, setInsertPosition] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [deleteValue, setDeleteValue] = useState('');
  
  const insertAtHead = useLinkedListStore((state) => state.insertAtHead);
  const insertAtTail = useLinkedListStore((state) => state.insertAtTail);
  const insertAtPosition = useLinkedListStore((state) => state.insertAtPosition);
  const deleteAtHead = useLinkedListStore((state) => state.deleteAtHead);
  const deleteAtTail = useLinkedListStore((state) => state.deleteAtTail);
  const deleteByValue = useLinkedListStore((state) => state.deleteByValue);
  const search = useLinkedListStore((state) => state.search);
  const clear = useLinkedListStore((state) => state.clear);
  const size = useLinkedListStore((state) => state.size);

  const handleInsertAtHead = () => {
    if (insertValue.trim()) {
      insertAtHead(insertValue.trim());
      setInsertValue('');
    }
  };

  const handleInsertAtTail = () => {
    if (insertValue.trim()) {
      insertAtTail(insertValue.trim());
      setInsertValue('');
    }
  };

  const handleInsertAtPosition = () => {
    if (insertValue.trim() && insertPosition !== '') {
      const pos = parseInt(insertPosition);
      if (!isNaN(pos)) {
        insertAtPosition(insertValue.trim(), pos);
        setInsertValue('');
        setInsertPosition('');
      }
    }
  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      search(searchValue.trim());
    }
  };

  const handleDeleteByValue = () => {
    if (deleteValue.trim()) {
      deleteByValue(deleteValue.trim());
      setDeleteValue('');
    }
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  const inputClass = "px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors";

  return (
    <div className="space-y-6">
      {/* Insert Operations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 rounded-xl p-6 border border-white/10"
      >
        <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="text-2xl">➕</span>
          Insert Operations
        </h3>
        
        <div className="space-y-4">
          {/* Value Input */}
          <div>
            <label className="block text-white/60 text-sm mb-2">Value</label>
            <input
              type="text"
              value={insertValue}
              onChange={(e) => setInsertValue(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, handleInsertAtHead)}
              placeholder="Enter value"
              className={inputClass}
            />
          </div>

          {/* Insert Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleInsertAtHead}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 font-semibold cursor-pointer"
            >
              Insert at Head
            </button>
            <button
              onClick={handleInsertAtTail}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-semibold cursor-pointer"
            >
              Insert at Tail
            </button>
          </div>

          {/* Insert at Position */}
          <div className="flex gap-2">
            <input
              type="number"
              value={insertPosition}
              onChange={(e) => setInsertPosition(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, handleInsertAtPosition)}
              placeholder="Position"
              className={`${inputClass} w-24`}
              min="0"
            />
            <button
              onClick={handleInsertAtPosition}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-200 font-semibold flex-1 cursor-pointer"
            >
              Insert at Position
            </button>
          </div>

          {/* Quick Insert */}
          <div>
            <label className="block text-white/60 text-sm mb-2">Quick Insert</label>
            <div className="flex gap-2 flex-wrap">
              {[1, 5, 10, 20].map((val) => (
                <button
                  key={val}
                  onClick={() => {
                    insertAtTail(val.toString());
                  }}
                  className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-white text-sm transition-all cursor-pointer"
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Delete Operations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/5 rounded-xl p-6 border border-white/10"
      >
        <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="text-2xl">🗑️</span>
          Delete Operations
        </h3>
        
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={deleteAtHead}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 font-semibold cursor-pointer"
            >
              Delete Head
            </button>
            <button
              onClick={deleteAtTail}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 font-semibold cursor-pointer"
            >
              Delete Tail
            </button>
          </div>

          {/* Delete by Value */}
          <div className="flex gap-2">
            <input
              type="text"
              value={deleteValue}
              onChange={(e) => setDeleteValue(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, handleDeleteByValue)}
              placeholder="Value to delete"
              className={`${inputClass} flex-1`}
            />
            <button
              onClick={handleDeleteByValue}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 font-semibold cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </motion.div>

      {/* Search & Utility */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 rounded-xl p-6 border border-white/10"
      >
        <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="text-2xl">🔍</span>
          Search & Utility
        </h3>
        
        <div className="space-y-3">
          {/* Search */}
          <div className="flex gap-2">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, handleSearch)}
              placeholder="Search value"
              className={`${inputClass} flex-1`}
            />
            <button
              onClick={handleSearch}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-200 font-semibold cursor-pointer"
            >
              Search
            </button>
          </div>

          {/* Clear All */}
          <button
            onClick={clear}
            disabled={size() === 0}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors duration-200 font-semibold w-full disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Clear All ({size()} nodes)
          </button>
        </div>
      </motion.div>

      {/* Keyboard Shortcuts Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-white/40 text-xs text-center"
      >
        💡 Press Enter to execute operations
      </motion.div>
    </div>
  );
};

export default LinkedListControls;
