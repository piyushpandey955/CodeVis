import { useState } from 'react';
import useTrieAutocompleteStore from '../../../store/trieAutocompleteStore';
import { Search, Plus, RotateCcw } from 'lucide-react';

export default function TrieAutocompleteControls() {
  const { autocomplete, insertWord, reset, isSearching } = useTrieAutocompleteStore();
  const [searchInput, setSearchInput] = useState('');
  const [newWord, setNewWord] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchInput(value);
    if (value) {
      autocomplete(value);
    }
  };

  const handleInsert = () => {
    if (newWord.trim()) {
      insertWord(newWord.toLowerCase());
      setNewWord('');
    }
  };

  const quickSearches = ['app', 'car', 'com', 'pro', 'ban'];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">Autocomplete Controls</h3>
      
      {/* Search Input */}
      <div className="space-y-2">
        <label className="text-white/70 text-sm font-semibold">Search Term:</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            value={searchInput}
            onChange={handleSearch}
            disabled={isSearching}
            placeholder="Start typing... (e.g., 'app')"
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Quick Add Words */}
      <div className="space-y-2">
        <label className="text-white/70 text-sm font-semibold">Quick Add Sample Words:</label>
        <div className="grid grid-cols-2 gap-2">
          {['apple', 'app', 'application', 'banana', 'band', 'car', 'card', 'cat'].map((word) => (
            <button
              key={word}
              onClick={() => {
                insertWord(word);
              }}
              className="px-3 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 rounded-lg font-mono text-sm transition-colors cursor-pointer"
            >
              + {word}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Search Buttons */}
      <div className="space-y-2">
        <label className="text-white/70 text-sm font-semibold">Quick Searches:</label>
        <div className="grid grid-cols-3 gap-2">
          {quickSearches.map((term) => (
            <button
              key={term}
              onClick={() => {
                setSearchInput(term);
                autocomplete(term);
              }}
              disabled={isSearching}
              className="px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg font-mono text-sm transition-colors cursor-pointer disabled:opacity-50"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Add New Word */}
      <div className="space-y-2">
        <label className="text-white/70 text-sm font-semibold">Add New Word:</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleInsert()}
            placeholder="Enter a word"
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-green-500 transition-colors"
          />
          <button
            onClick={handleInsert}
            className="flex items-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors cursor-pointer"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={reset}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold transition-colors cursor-pointer"
      >
        <RotateCcw className="w-5 h-5" />
        Reset Trie
      </button>

      {/* Instructions */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-2">How to Use:</h4>
        <div className="text-white/70 text-sm space-y-2">
          <p>• Type in the search box to see suggestions</p>
          <p>• Watch the highlighted path through the Trie</p>
          <p>• Add custom words to expand the dictionary</p>
          <p>• Try quick searches for instant demos</p>
        </div>
      </div>

      {/* Real-World Context */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
        <h4 className="text-purple-400 font-semibold mb-2">Real-World Application:</h4>
        <p className="text-white/70 text-sm">
          Search engines like Google, autocomplete in IDEs, and search bars in apps use Tries 
          to provide instant suggestions. The Trie structure makes prefix matching incredibly fast!
        </p>
      </div>
    </div>
  );
}
