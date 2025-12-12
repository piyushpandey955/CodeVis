import { useState } from 'react';
import useLRUCacheStore from '../../../store/lruCacheStore';
import { Search, Plus, RotateCcw } from 'lucide-react';

export default function LRUCacheControls() {
  const { get, put, reset } = useLRUCacheStore();
  const [getKey, setGetKey] = useState('');
  const [putKey, setPutKey] = useState('');
  const [putValue, setPutValue] = useState('');

  const handleGet = () => {
    if (getKey.trim()) {
      get(getKey);
      setGetKey('');
    }
  };

  const handlePut = () => {
    if (putKey.trim() && putValue.trim()) {
      put(putKey, putValue);
      setPutKey('');
      setPutValue('');
    }
  };

  const commonPages = [
    { key: 'home', value: 'Home Page' },
    { key: 'about', value: 'About Page' },
    { key: 'products', value: 'Products Page' },
    { key: 'contact', value: 'Contact Page' },
    { key: 'blog', value: 'Blog Page' },
    { key: 'pricing', value: 'Pricing Page' },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">Cache Controls</h3>
      
      {/* Get Operation */}
      <div className="space-y-2">
        <label className="text-white/70 text-sm font-semibold">Get Page (Access):</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={getKey}
            onChange={(e) => setGetKey(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleGet()}
            placeholder="Enter page key (e.g., 'home')"
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button
            onClick={handleGet}
            className="flex items-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Put Operation */}
      <div className="space-y-2">
        <label className="text-white/70 text-sm font-semibold">Put Page (Cache):</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={putKey}
            onChange={(e) => setPutKey(e.target.value)}
            placeholder="Page key"
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-green-500 transition-colors"
          />
          <input
            type="text"
            value={putValue}
            onChange={(e) => setPutValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handlePut()}
            placeholder="Page content"
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-green-500 transition-colors"
          />
          <button
            onClick={handlePut}
            className="flex items-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors cursor-pointer"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <label className="text-white/70 text-sm font-semibold">Quick Page Visits:</label>
        <div className="grid grid-cols-2 gap-2">
          {commonPages.map((page) => (
            <button
              key={page.key}
              onClick={() => put(page.key, page.value)}
              className="px-3 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 rounded-lg text-sm transition-colors cursor-pointer"
            >
              {page.value}
            </button>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={reset}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold transition-colors cursor-pointer"
      >
        <RotateCcw className="w-5 h-5" />
        Clear Cache
      </button>

      {/* Instructions */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-2">How to Use:</h4>
        <div className="text-white/70 text-sm space-y-2">
          <p>• <strong>Get:</strong> Access a cached page (cache hit if found)</p>
          <p>• <strong>Put:</strong> Add a new page to cache</p>
          <p>• When cache is full, oldest page is evicted</p>
          <p>• Watch hit rate improve as you access cached pages</p>
        </div>
      </div>

      {/* Real-World Context */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-lg p-4">
        <h4 className="text-emerald-400 font-semibold mb-2">Real-World Application:</h4>
        <p className="text-white/70 text-sm">
          Web browsers use LRU caching to store recently visited pages, images, and assets. 
          This makes revisiting pages instant instead of downloading everything again. Operating 
          systems also use LRU for memory management!
        </p>
      </div>
    </div>
  );
}
