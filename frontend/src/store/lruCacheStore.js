import { create } from 'zustand';

const useLRUCacheStore = create((set, get) => ({
  capacity: 4,
  cache: [],
  operations: [],
  accessCount: 0,
  hitRate: 0,
  hits: 0,
  misses: 0,

  // Get value from cache
  get: (key) => {
    const { cache, operations, accessCount, hits, misses } = get();
    const index = cache.findIndex(item => item.key === key);
    
    set({ accessCount: accessCount + 1 });

    if (index !== -1) {
      // Cache hit - move to front (most recently used)
      const item = cache[index];
      const newCache = [
        item,
        ...cache.slice(0, index),
        ...cache.slice(index + 1)
      ];
      
      const newHits = hits + 1;
      const newAccessCount = accessCount + 1;
      
      set({ 
        cache: newCache,
        hits: newHits,
        hitRate: (newHits / newAccessCount) * 100,
        operations: [...operations, {
          type: 'hit',
          key,
          value: item.value,
          message: `Cache HIT: "${key}" = ${item.value}`,
          timestamp: new Date().toLocaleTimeString()
        }]
      });
      
      return item.value;
    } else {
      // Cache miss
      const newMisses = misses + 1;
      const newAccessCount = accessCount + 1;
      
      set({ 
        misses: newMisses,
        hitRate: (hits / newAccessCount) * 100,
        operations: [...operations, {
          type: 'miss',
          key,
          message: `Cache MISS: "${key}" not found`,
          timestamp: new Date().toLocaleTimeString()
        }]
      });
      
      return null;
    }
  },

  // Put key-value in cache
  put: (key, value) => {
    const { cache, capacity, operations } = get();
    const index = cache.findIndex(item => item.key === key);
    let newCache;
    let message;

    if (index !== -1) {
      // Key exists - update and move to front
      const item = { key, value };
      newCache = [
        item,
        ...cache.slice(0, index),
        ...cache.slice(index + 1)
      ];
      message = `Updated "${key}" = ${value}`;
    } else {
      // New key
      if (cache.length >= capacity) {
        // Evict least recently used (last item)
        const evicted = cache[cache.length - 1];
        newCache = [{ key, value }, ...cache.slice(0, capacity - 1)];
        message = `Added "${key}" = ${value}, Evicted "${evicted.key}"`;
      } else {
        newCache = [{ key, value }, ...cache];
        message = `Added "${key}" = ${value}`;
      }
    }

    set({ 
      cache: newCache,
      operations: [...operations, {
        type: 'put',
        key,
        value,
        message,
        timestamp: new Date().toLocaleTimeString()
      }]
    });
  },

  // Simulate website navigation
  visitPage: (pageName, pageData) => {
    get().put(pageName, pageData);
  },

  // Clear cache
  clear: () => {
    set({ 
      cache: [],
      accessCount: 0,
      hits: 0,
      misses: 0,
      hitRate: 0,
      operations: [...get().operations, {
        type: 'clear',
        message: 'Cache cleared',
        timestamp: new Date().toLocaleTimeString()
      }]
    });
  },

  // Reset
  reset: () => {
    set({ 
      cache: [],
      operations: [],
      accessCount: 0,
      hits: 0,
      misses: 0,
      hitRate: 0
    });
  },

  // Clear history
  clearHistory: () => {
    set({ operations: [] });
  },
}));

export default useLRUCacheStore;
