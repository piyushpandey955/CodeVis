import React, { useState } from 'react';
import { Plus, Minus, Eye, Trash2 } from 'lucide-react';
import useQueueStore from '../../../store/queueStore';

const QueueControls = () => {
  const { enqueue, dequeue, peek, clear, isEmpty, isFull } = useQueueStore();
  const [value, setValue] = useState('');

  const handleEnqueue = () => {
    if (value === '') return;
    const success = enqueue(parseInt(value, 10));
    if (success) {
      setValue('');
    } else {
      alert('Queue is full! Cannot enqueue more elements.');
    }
  };

  const handleDequeue = () => {
    const dequeuedValue = dequeue();
    if (dequeuedValue === null) {
      alert('Queue is empty! Cannot dequeue.');
    }
  };

  const handlePeek = () => {
    const frontValue = peek();
    if (frontValue === null) {
      alert('Queue is empty! Nothing to peek.');
    }
  };

  const handleClear = () => {
    if (isEmpty()) {
      alert('Queue is already empty!');
      return;
    }
    if (window.confirm('Are you sure you want to clear the entire queue?')) {
      clear();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEnqueue();
    }
  };

  return (
    <div className="space-y-4">
      {/* Input Field */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">Value to Enqueue</label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a number"
          className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Operation Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleEnqueue}
          disabled={isFull()}
          className={`
            flex items-center justify-center gap-2 px-4 py-3 rounded-lg 
            transition-colors duration-200 font-semibold
            ${isFull() 
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
              : 'bg-green-500 hover:bg-green-600 text-white cursor-pointer'
            }
          `}
        >
          <Plus className="w-5 h-5" />
          Enqueue
        </button>
        
        <button
          onClick={handleDequeue}
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
          <Minus className="w-5 h-5" />
          Dequeue
        </button>
        
        <button
          onClick={handlePeek}
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
          <Eye className="w-5 h-5" />
          Peek Front
        </button>
        
        <button
          onClick={handleClear}
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
          <Trash2 className="w-5 h-5" />
          Clear
        </button>
      </div>

      {/* Quick Enqueue Buttons */}
      <div className="pt-4 border-t border-white/10">
        <h3 className="text-sm text-gray-400 mb-2">Quick Enqueue</h3>
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => enqueue(num)}
              disabled={isFull()}
              className={`
                px-3 py-2 rounded-lg font-semibold transition-colors duration-200
                ${isFull() 
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                  : 'bg-gray-700 hover:bg-gray-600 text-white cursor-pointer'
                }
              `}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="pt-4 border-t border-white/10">
        <div className="bg-gray-800 rounded-lg p-3 text-sm text-gray-400">
          <p><strong className="text-white">Queue Operations:</strong></p>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li><strong>Enqueue:</strong> Add element to rear</li>
            <li><strong>Dequeue:</strong> Remove from front</li>
            <li><strong>Peek:</strong> View front element</li>
            <li><strong>Clear:</strong> Remove all elements</li>
          </ul>
          <p className="mt-2 text-xs text-purple-400">
            ℹ️ Queue follows FIFO principle
          </p>
        </div>
      </div>
    </div>
  );
};

export default QueueControls;
