import { create } from 'zustand';

const useHashMapStore = create((set, get) => ({
  buckets: Array(10).fill(null).map(() => []),
  highlightedBuckets: [],
  operations: [],
  size: 0,
  capacity: 10,

  // Hash function
  hash: (key) => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) % get().capacity;
    }
    return Math.abs(hash);
  },

  // Put key-value pair
  put: (key, value) => {
    const { buckets, operations, hash, size, capacity } = get();
    
    if (!key || key.trim() === '') {
      set({
        operations: [...operations, {
          type: 'put',
          success: false,
          message: 'Key cannot be empty',
          timestamp: new Date().toLocaleTimeString()
        }]
      });
      return;
    }

    const index = hash(key);
    const newBuckets = buckets.map(bucket => [...bucket]);
    
    // Check if key already exists (update)
    const existingIndex = newBuckets[index].findIndex(entry => entry.key === key);
    
    if (existingIndex !== -1) {
      newBuckets[index][existingIndex].value = value;
      set({
        buckets: newBuckets,
        highlightedBuckets: [index],
        operations: [...operations, {
          type: 'put',
          key,
          value,
          success: true,
          message: `Updated key "${key}" with value "${value}" at bucket ${index}`,
          timestamp: new Date().toLocaleTimeString()
        }]
      });
    } else {
      newBuckets[index].push({ key, value, id: Date.now() });
      set({
        buckets: newBuckets,
        size: size + 1,
        highlightedBuckets: [index],
        operations: [...operations, {
          type: 'put',
          key,
          value,
          success: true,
          message: `Inserted key "${key}" with value "${value}" at bucket ${index}`,
          timestamp: new Date().toLocaleTimeString()
        }]
      });
    }

    setTimeout(() => set({ highlightedBuckets: [] }), 1000);
  },

  // Get value by key
  get: (key) => {
    const { buckets, operations, hash } = get();
    
    if (!key || key.trim() === '') {
      set({
        operations: [...operations, {
          type: 'get',
          success: false,
          message: 'Key cannot be empty',
          timestamp: new Date().toLocaleTimeString()
        }]
      });
      return;
    }

    const index = hash(key);
    const bucket = buckets[index];
    const entry = bucket.find(e => e.key === key);

    if (entry) {
      set({
        highlightedBuckets: [index],
        operations: [...operations, {
          type: 'get',
          key,
          value: entry.value,
          success: true,
          message: `Found key "${key}" with value "${entry.value}" at bucket ${index}`,
          timestamp: new Date().toLocaleTimeString()
        }]
      });
    } else {
      set({
        highlightedBuckets: [index],
        operations: [...operations, {
          type: 'get',
          key,
          success: false,
          message: `Key "${key}" not found (checked bucket ${index})`,
          timestamp: new Date().toLocaleTimeString()
        }]
      });
    }

    setTimeout(() => set({ highlightedBuckets: [] }), 1000);
  },

  // Remove key-value pair
  remove: (key) => {
    const { buckets, operations, hash, size } = get();
    
    if (!key || key.trim() === '') {
      set({
        operations: [...operations, {
          type: 'remove',
          success: false,
          message: 'Key cannot be empty',
          timestamp: new Date().toLocaleTimeString()
        }]
      });
      return;
    }

    const index = hash(key);
    const newBuckets = buckets.map(bucket => [...bucket]);
    const bucket = newBuckets[index];
    const entryIndex = bucket.findIndex(e => e.key === key);

    if (entryIndex !== -1) {
      bucket.splice(entryIndex, 1);
      set({
        buckets: newBuckets,
        size: size - 1,
        highlightedBuckets: [index],
        operations: [...operations, {
          type: 'remove',
          key,
          success: true,
          message: `Removed key "${key}" from bucket ${index}`,
          timestamp: new Date().toLocaleTimeString()
        }]
      });
    } else {
      set({
        highlightedBuckets: [index],
        operations: [...operations, {
          type: 'remove',
          key,
          success: false,
          message: `Key "${key}" not found in bucket ${index}`,
          timestamp: new Date().toLocaleTimeString()
        }]
      });
    }

    setTimeout(() => set({ highlightedBuckets: [] }), 1000);
  },

  // Check if key exists
  containsKey: (key) => {
    const { buckets, operations, hash } = get();
    
    if (!key || key.trim() === '') {
      set({
        operations: [...operations, {
          type: 'containsKey',
          success: false,
          message: 'Key cannot be empty',
          timestamp: new Date().toLocaleTimeString()
        }]
      });
      return;
    }

    const index = hash(key);
    const bucket = buckets[index];
    const exists = bucket.some(e => e.key === key);

    set({
      highlightedBuckets: [index],
      operations: [...operations, {
        type: 'containsKey',
        key,
        success: exists,
        message: exists 
          ? `Key "${key}" exists in bucket ${index}` 
          : `Key "${key}" does not exist (checked bucket ${index})`,
        timestamp: new Date().toLocaleTimeString()
      }]
    });

    setTimeout(() => set({ highlightedBuckets: [] }), 1000);
  },

  // Clear the hash map
  clear: () => {
    set({
      buckets: Array(10).fill(null).map(() => []),
      size: 0,
      highlightedBuckets: [],
      operations: [...get().operations, {
        type: 'clear',
        success: true,
        message: 'HashMap cleared',
        timestamp: new Date().toLocaleTimeString()
      }]
    });
  },

  // Clear operation history
  clearHistory: () => {
    set({ operations: [] });
  },
}));

export default useHashMapStore;
