import { create } from 'zustand';

const useHashSetStore = create((set, get) => ({
  buckets: Array(10).fill(null).map(() => []),
  highlightedBuckets: [],
  operations: [],
  size: 0,
  capacity: 10,

  // Hash function
  hash: (value) => {
    let hash = 0;
    const str = String(value);
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) % get().capacity;
    }
    return Math.abs(hash);
  },

  // Add value to set
  add: (value) => {
    const { buckets, operations, hash, size } = get();
    
    if (!value || String(value).trim() === '') {
      set({
        operations: [...operations, {
          type: 'add',
          success: false,
          message: 'Value cannot be empty',
          timestamp: new Date().toLocaleTimeString()
        }]
      });
      return;
    }

    const index = hash(value);
    const newBuckets = buckets.map(bucket => [...bucket]);
    const bucket = newBuckets[index];
    
    // Check if value already exists
    if (bucket.some(item => item.value === value)) {
      set({
        highlightedBuckets: [index],
        operations: [...operations, {
          type: 'add',
          value,
          success: false,
          message: `Value "${value}" already exists in bucket ${index}`,
          timestamp: new Date().toLocaleTimeString()
        }]
      });
    } else {
      bucket.push({ value, id: Date.now() });
      set({
        buckets: newBuckets,
        size: size + 1,
        highlightedBuckets: [index],
        operations: [...operations, {
          type: 'add',
          value,
          success: true,
          message: `Added "${value}" to bucket ${index}`,
          timestamp: new Date().toLocaleTimeString()
        }]
      });
    }

    setTimeout(() => set({ highlightedBuckets: [] }), 1000);
  },

  // Remove value from set
  remove: (value) => {
    const { buckets, operations, hash, size } = get();
    
    if (!value || String(value).trim() === '') {
      set({
        operations: [...operations, {
          type: 'remove',
          success: false,
          message: 'Value cannot be empty',
          timestamp: new Date().toLocaleTimeString()
        }]
      });
      return;
    }

    const index = hash(value);
    const newBuckets = buckets.map(bucket => [...bucket]);
    const bucket = newBuckets[index];
    const itemIndex = bucket.findIndex(item => item.value === value);

    if (itemIndex !== -1) {
      bucket.splice(itemIndex, 1);
      set({
        buckets: newBuckets,
        size: size - 1,
        highlightedBuckets: [index],
        operations: [...operations, {
          type: 'remove',
          value,
          success: true,
          message: `Removed "${value}" from bucket ${index}`,
          timestamp: new Date().toLocaleTimeString()
        }]
      });
    } else {
      set({
        highlightedBuckets: [index],
        operations: [...operations, {
          type: 'remove',
          value,
          success: false,
          message: `Value "${value}" not found in bucket ${index}`,
          timestamp: new Date().toLocaleTimeString()
        }]
      });
    }

    setTimeout(() => set({ highlightedBuckets: [] }), 1000);
  },

  // Check if value exists
  contains: (value) => {
    const { buckets, operations, hash } = get();
    
    if (!value || String(value).trim() === '') {
      set({
        operations: [...operations, {
          type: 'contains',
          success: false,
          message: 'Value cannot be empty',
          timestamp: new Date().toLocaleTimeString()
        }]
      });
      return;
    }

    const index = hash(value);
    const bucket = buckets[index];
    const exists = bucket.some(item => item.value === value);

    set({
      highlightedBuckets: [index],
      operations: [...operations, {
        type: 'contains',
        value,
        success: exists,
        message: exists 
          ? `Value "${value}" exists in bucket ${index}` 
          : `Value "${value}" does not exist (checked bucket ${index})`,
        timestamp: new Date().toLocaleTimeString()
      }]
    });

    setTimeout(() => set({ highlightedBuckets: [] }), 1000);
  },

  // Clear the hash set
  clear: () => {
    set({
      buckets: Array(10).fill(null).map(() => []),
      size: 0,
      highlightedBuckets: [],
      operations: [...get().operations, {
        type: 'clear',
        success: true,
        message: 'HashSet cleared',
        timestamp: new Date().toLocaleTimeString()
      }]
    });
  },

  // Clear operation history
  clearHistory: () => {
    set({ operations: [] });
  },
}));

export default useHashSetStore;
