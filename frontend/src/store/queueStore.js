import { create } from 'zustand';
import { generateId, formatTimestamp } from '../utils/animations';

const useQueueStore = create((set, get) => ({
  // State
  queue: [],
  maxSize: 10,
  history: [],
  highlightedIndex: -1,
  
  // Actions
  enqueue: (value) => {
    const { queue, maxSize, history } = get();
    if (queue.length >= maxSize) {
      const newHistory = [...history, {
        id: generateId(),
        operation: 'Enqueue (Failed)',
        details: `Queue overflow - cannot enqueue ${value}`,
        timestamp: formatTimestamp(),
      }];
      set({ history: newHistory });
      return false;
    }
    
    const newQueue = [...queue, value];
    const newHistory = [...history, {
      id: generateId(),
      operation: 'Enqueue',
      details: `Enqueued ${value} at rear`,
      timestamp: formatTimestamp(),
    }];
    set({ queue: newQueue, history: newHistory, highlightedIndex: newQueue.length - 1 });
    
    // Clear highlight after animation
    setTimeout(() => set({ highlightedIndex: -1 }), 500);
    return true;
  },
  
  dequeue: () => {
    const { queue, history } = get();
    if (queue.length === 0) {
      const newHistory = [...history, {
        id: generateId(),
        operation: 'Dequeue (Failed)',
        details: 'Queue underflow - queue is empty',
        timestamp: formatTimestamp(),
      }];
      set({ history: newHistory });
      return null;
    }
    
    const value = queue[0];
    const newQueue = queue.slice(1);
    const newHistory = [...history, {
      id: generateId(),
      operation: 'Dequeue',
      details: `Dequeued ${value} from front`,
      timestamp: formatTimestamp(),
    }];
    
    set({ highlightedIndex: 0 });
    setTimeout(() => {
      set({ queue: newQueue, history: newHistory, highlightedIndex: -1 });
    }, 300);
    
    return value;
  },
  
  peek: () => {
    const { queue, history } = get();
    if (queue.length === 0) {
      const newHistory = [...history, {
        id: generateId(),
        operation: 'Peek',
        details: 'Queue is empty',
        timestamp: formatTimestamp(),
      }];
      set({ history: newHistory });
      return null;
    }
    
    const value = queue[0];
    const newHistory = [...history, {
      id: generateId(),
      operation: 'Peek',
      details: `Front element is ${value}`,
      timestamp: formatTimestamp(),
    }];
    
    set({ history: newHistory, highlightedIndex: 0 });
    setTimeout(() => set({ highlightedIndex: -1 }), 1000);
    return value;
  },
  
  clear: () => {
    const { history } = get();
    const newHistory = [...history, {
      id: generateId(),
      operation: 'Clear',
      details: 'Cleared all elements from queue',
      timestamp: formatTimestamp(),
    }];
    set({ queue: [], history: newHistory, highlightedIndex: -1 });
  },
  
  isEmpty: () => {
    return get().queue.length === 0;
  },
  
  isFull: () => {
    const { queue, maxSize } = get();
    return queue.length >= maxSize;
  },
  
  size: () => {
    return get().queue.length;
  },
  
  clearHistory: () => {
    set({ history: [] });
  },
}));

export default useQueueStore;
