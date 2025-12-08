import { useState } from 'react';
import usePriorityQueueStore from '../../../store/priorityQueueStore';

export default function PriorityQueueControls() {
  const { insert, extractTop, peek, toggleType, clear, heap, type } = usePriorityQueueStore();
  const [value, setValue] = useState('');
  const [priority, setPriority] = useState('');

  const handleInsert = () => {
    if (value && priority) {
      insert(value, priority);
      setValue('');
      setPriority('');
    }
  };

  const quickInsert = (val, pri) => {
    insert(val, pri);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">Priority Queue Controls</h3>
      
      {/* Insert Controls */}
      <div className="space-y-3">
        <label className="text-white/80 text-sm">Insert Element</label>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 px-4 py-3 bg-gray-800 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
            onKeyPress={(e) => e.key === 'Enter' && handleInsert()}
          />
          <input
            type="number"
            placeholder="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-32 px-4 py-3 bg-gray-800 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
            onKeyPress={(e) => e.key === 'Enter' && handleInsert()}
          />
          <button
            onClick={handleInsert}
            disabled={!value || !priority}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors duration-200 cursor-pointer"
          >
            Insert
          </button>
        </div>
      </div>

      {/* Quick Insert */}
      <div className="space-y-2">
        <label className="text-white/80 text-sm">Quick Insert</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => quickInsert('A', 1)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors cursor-pointer"
          >
            A (P:1)
          </button>
          <button
            onClick={() => quickInsert('B', 3)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors cursor-pointer"
          >
            B (P:3)
          </button>
          <button
            onClick={() => quickInsert('C', 2)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors cursor-pointer"
          >
            C (P:2)
          </button>
          <button
            onClick={() => quickInsert('D', 5)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors cursor-pointer"
          >
            D (P:5)
          </button>
          <button
            onClick={() => quickInsert('E', 4)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors cursor-pointer"
          >
            E (P:4)
          </button>
        </div>
      </div>

      {/* Operations */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={extractTop}
          disabled={heap.length === 0}
          className="px-4 py-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors duration-200 cursor-pointer"
        >
          Extract {type === 'min' ? 'Min' : 'Max'}
        </button>
        <button
          onClick={peek}
          disabled={heap.length === 0}
          className="px-4 py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors duration-200 cursor-pointer"
        >
          Peek Top
        </button>
        <button
          onClick={toggleType}
          className="px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold transition-colors duration-200 cursor-pointer"
        >
          Toggle to {type === 'min' ? 'Max' : 'Min'} Heap
        </button>
        <button
          onClick={clear}
          className="px-4 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold transition-colors duration-200 cursor-pointer"
        >
          Clear All
        </button>
      </div>

      {/* Info */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
        <div className="text-white/70 text-sm space-y-1">
          <div className="flex justify-between">
            <span>Elements:</span>
            <span className="text-white font-semibold">{heap.length} / 15</span>
          </div>
          <div className="flex justify-between">
            <span>Type:</span>
            <span className="text-white font-semibold">{type === 'min' ? 'Min Heap' : 'Max Heap'}</span>
          </div>
          <div className="flex justify-between">
            <span>Top Priority:</span>
            <span className="text-white font-semibold">
              {heap.length > 0 ? `${heap[0].priority} (${heap[0].value})` : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
