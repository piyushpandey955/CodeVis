import { useState } from 'react';
import useHashSetStore from '../../../store/hashSetStore';

export default function HashSetControls() {
  const { add, remove, contains, clear } = useHashSetStore();
  const [value, setValue] = useState('');

  const handleAdd = () => {
    if (value) {
      add(value);
      setValue('');
    }
  };

  const handleRemove = () => {
    if (value) {
      remove(value);
      setValue('');
    }
  };

  const handleContains = () => {
    if (value) {
      contains(value);
    }
  };

  const quickAdd = (val) => {
    add(val);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">HashSet Controls</h3>
      
      {/* Add Value */}
      <div className="space-y-3">
        <label className="text-white/80 text-sm">Add Value to Set</label>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 px-4 py-3 bg-gray-800 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          />
          <button
            onClick={handleAdd}
            disabled={!value}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors duration-200 cursor-pointer"
          >
            Add
          </button>
        </div>
      </div>

      {/* Quick Add */}
      <div className="space-y-2">
        <label className="text-white/80 text-sm">Quick Add</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => quickAdd('Apple')}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Apple
          </button>
          <button
            onClick={() => quickAdd('Banana')}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Banana
          </button>
          <button
            onClick={() => quickAdd('Cherry')}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Cherry
          </button>
          <button
            onClick={() => quickAdd('Date')}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Date
          </button>
          <button
            onClick={() => quickAdd('Elderberry')}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Elderberry
          </button>
        </div>
      </div>

      {/* Value Operations */}
      <div className="space-y-3">
        <label className="text-white/80 text-sm">Value Operations</label>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 px-4 py-3 bg-gray-800 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleRemove}
            disabled={!value}
            className="px-4 py-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors duration-200 cursor-pointer"
          >
            Remove
          </button>
          <button
            onClick={handleContains}
            disabled={!value}
            className="px-4 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors duration-200 cursor-pointer"
          >
            Contains?
          </button>
        </div>
      </div>

      {/* Clear */}
      <button
        onClick={clear}
        className="w-full px-4 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold transition-colors duration-200 cursor-pointer"
      >
        Clear HashSet
      </button>

      {/* Info */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
        <div className="text-white/70 text-sm space-y-2">
          <div className="font-semibold text-white mb-2">How HashSet Works:</div>
          <ul className="space-y-1 text-xs list-disc list-inside">
            <li>Stores only unique values (no duplicates)</li>
            <li>Uses hash function to distribute values across buckets</li>
            <li>Average O(1) time complexity for add/remove/contains</li>
            <li>Collisions handled using chaining</li>
            <li>No ordering guarantees for elements</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
