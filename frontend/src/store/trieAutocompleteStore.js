import { create } from 'zustand';

const useTrieAutocompleteStore = create((set, get) => ({
  root: { children: {}, isEndOfWord: false },
  searchTerm: '',
  suggestions: [],
  highlightedPath: [],
  operations: [],
  isSearching: false,
  currentPath: '',
  commonWords: [
    'apple', 'application', 'apply', 'approve',
    'banana', 'band', 'bandana', 'banner',
    'cat', 'car', 'card', 'career', 'careful',
    'dog', 'door', 'dot', 'double',
    'elephant', 'element', 'eleven', 'elevator',
  ],

  // Initialize with common words
  initializeTrie: () => {
    const { commonWords } = get();
    let newRoot = { children: {}, isEndOfWord: false };
    
    commonWords.forEach(word => {
      let node = newRoot;
      for (const char of word) {
        if (!node.children[char]) {
          node.children[char] = { children: {}, isEndOfWord: false };
        }
        node = node.children[char];
      }
      node.isEndOfWord = true;
    });

    set({ 
      root: newRoot,
      operations: [{
        type: 'init',
        message: `Initialized Trie with ${commonWords.length} words`,
        timestamp: new Date().toLocaleTimeString()
      }]
    });
  },

  // Insert word
  insert: (word) => {
    const { root, operations } = get();
    const lowerWord = word.toLowerCase();
    
    // Deep clone the root to ensure React detects the change
    const cloneNode = (node) => {
      return {
        children: Object.entries(node.children).reduce((acc, [key, val]) => {
          acc[key] = cloneNode(val);
          return acc;
        }, {}),
        isEndOfWord: node.isEndOfWord
      };
    };
    
    const newRoot = cloneNode(root);
    let node = newRoot;
    
    for (const char of lowerWord) {
      if (!node.children[char]) {
        node.children[char] = { children: {}, isEndOfWord: false };
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;

    set({ 
      root: newRoot,
      operations: [...operations, {
        type: 'insert',
        word: lowerWord,
        message: `Inserted word: "${lowerWord}"`,
        timestamp: new Date().toLocaleTimeString()
      }]
    });
  },

  // Search and get autocomplete suggestions
  autocomplete: async (prefix) => {
    const { root } = get();
    const lowerPrefix = prefix.toLowerCase();
    
    set({ 
      searchTerm: lowerPrefix,
      highlightedPath: [],
      suggestions: [],
      isSearching: true,
      currentPath: ''
    });

    if (!lowerPrefix) {
      set({ isSearching: false });
      return;
    }

    try {
      // Navigate to prefix node
      let node = root;
      const path = [];
      
      for (const char of lowerPrefix) {
        path.push(char);
        set({ 
          highlightedPath: [...path],
          currentPath: path.join('')
        });
        await new Promise(resolve => setTimeout(resolve, 200));
        
        if (!node.children[char]) {
          const currentOps = get().operations;
          set({ 
            suggestions: [],
            isSearching: false,
            operations: [...currentOps, {
              type: 'search',
              prefix: lowerPrefix,
              message: `No suggestions found for "${lowerPrefix}"`,
              timestamp: new Date().toLocaleTimeString()
            }]
          });
          return;
        }
        node = node.children[char];
      }

      // Find all words with this prefix
      const suggestions = [];
      const findWords = (node, currentWord) => {
        if (node.isEndOfWord) {
          suggestions.push(currentWord);
        }
        
        for (const char in node.children) {
          findWords(node.children[char], currentWord + char);
        }
      };
      
      findWords(node, lowerPrefix);
      
      const currentOps = get().operations;
      set({ 
        suggestions: suggestions.slice(0, 10),
        isSearching: false,
        operations: [...currentOps, {
          type: 'search',
          prefix: lowerPrefix,
          message: `Found ${suggestions.length} suggestions for "${lowerPrefix}"`,
          timestamp: new Date().toLocaleTimeString()
        }]
      });
    } catch (error) {
      console.error('Autocomplete error:', error);
      set({ 
        isSearching: false,
        suggestions: []
      });
    }
  },

  // Alias for insert to match the component usage
  insertWord: (word) => {
    get().insert(word);
  },

  // Clear search
  clearSearch: () => {
    set({ searchTerm: '', suggestions: [], highlightedPath: [] });
  },

  // Reset
  reset: () => {
    set({ 
      root: { children: {}, isEndOfWord: false },
      searchTerm: '', 
      suggestions: [], 
      highlightedPath: [],
      currentPath: '',
      isSearching: false,
      operations: [{
        type: 'init',
        message: 'Trie initialized (empty)',
        timestamp: new Date().toLocaleTimeString()
      }]
    });
  },

  // Clear history
  clearHistory: () => {
    set({ operations: [] });
  },
}));

export default useTrieAutocompleteStore;
