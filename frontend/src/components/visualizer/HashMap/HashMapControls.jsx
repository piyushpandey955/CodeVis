import { useState } from 'react';
import useHashMapStore from '../../../store/hashMapStore';

export default function HashMapControls() {
  const { put, get, remove, containsKey, clear } = useHashMapStore();
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const handlePut = () => {
    if (key && value) {
      put(key, value);
      setKey('');
      setValue('');
    }
  };

  const handleGet = () => {
    if (key) {
      get(key);
    }
  };

  const handleRemove = () => {
    if (key) {
      remove(key);
      setKey('');
    }
  };

  const handleContainsKey = () => {
    if (key) {
      containsKey(key);
    }
  };

  const quickPut = (k, v) => {
    put(k, v);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">HashMap Controls</h3>
      
      {/* Put Operation */}
      <div className="space-y-3">
        <label className="text-white/80 text-sm">Put Key-Value Pair</label>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="flex-1 px-4 py-3 bg-gray-800 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
            onKeyPress={(e) => e.key === 'Enter' && handlePut()}
          />
          <input
            type="text"
            placeholder="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 px-4 py-3 bg-gray-800 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
            onKeyPress={(e) => e.key === 'Enter' && handlePut()}
          />
          <button
            onClick={handlePut}
            disabled={!key || !value}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors duration-200 cursor-pointer"
          >
            Put
          </button>
        </div>
      </div>

      {/* Quick Insert */}
      <div className="space-y-2">
        <label className="text-white/80 text-sm">Quick Insert</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => quickPut('name', 'Alice')}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors cursor-pointer"
          >
            name: Alice
          </button>
          <button
            onClick={() => quickPut('age', '25')}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors cursor-pointer"
          >
            age: 25
          </button>
          <button
            onClick={() => quickPut('city', 'NYC')}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors cursor-pointer"
          >
            city: NYC
          </button>
          <button
            onClick={() => quickPut('role', 'Developer')}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors cursor-pointer"
          >
            role: Developer
          </button>
          <button
            onClick={() => quickPut('status', 'Active')}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors cursor-pointer"
          >
            status: Active
          </button>
        </div>
      </div>

      {/* Key Operations */}
      <div className="space-y-3">
        <label className="text-white/80 text-sm">Key Operations</label>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="flex-1 px-4 py-3 bg-gray-800 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={handleGet}
            disabled={!key}
            className="px-4 py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors duration-200 cursor-pointer"
          >
            Get
          </button>
          <button
            onClick={handleRemove}
            disabled={!key}
            className="px-4 py-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors duration-200 cursor-pointer"
          >
            Remove
          </button>
          <button
            onClick={handleContainsKey}
            disabled={!key}
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
        Clear HashMap
      </button>

      {/* Info */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
        <div className="text-white/70 text-sm space-y-2">
          <div className="font-semibold text-white mb-2">How HashMap Works:</div>
          <ul className="space-y-1 text-xs list-disc list-inside">
            <li>Uses hash function to map keys to bucket indices</li>
            <li>Handles collisions using chaining (linked list)</li>
            <li>Average O(1) time complexity for get/put operations</li>
            <li>Hash collisions shown with multiple entries per bucket</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
