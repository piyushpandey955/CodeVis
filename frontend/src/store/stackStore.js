import { create } from 'zustand';
import { generateId, formatTimestamp } from '../utils/animations';

const useStackStore = create((set, get) => ({
  // State
  stack: [],
  maxSize: 10,
  history: [],
  highlightedIndex: -1,
  
  // Actions
  push: (value) => {
    const { stack, maxSize, history } = get();
    if (stack.length >= maxSize) {
      const newHistory = [...history, {
        id: generateId(),
        operation: 'Push (Failed)',
        details: `Stack overflow - cannot push ${value}`,
        timestamp: formatTimestamp(),
      }];
      set({ history: newHistory });
      return false;
    }
    
    const newStack = [...stack, value];
    const newHistory = [...history, {
      id: generateId(),
      operation: 'Push',
      details: `Pushed ${value} onto stack`,
      timestamp: formatTimestamp(),
    }];
    set({ stack: newStack, history: newHistory, highlightedIndex: newStack.length - 1 });
    
    // Clear highlight after animation
    setTimeout(() => set({ highlightedIndex: -1 }), 500);
    return true;
  },
  
  pop: () => {
    const { stack, history } = get();
    if (stack.length === 0) {
      const newHistory = [...history, {
        id: generateId(),
        operation: 'Pop (Failed)',
        details: 'Stack underflow - stack is empty',
        timestamp: formatTimestamp(),
      }];
      set({ history: newHistory });
      return null;
    }
    
    const value = stack[stack.length - 1];
    const newStack = stack.slice(0, -1);
    const newHistory = [...history, {
      id: generateId(),
      operation: 'Pop',
      details: `Popped ${value} from stack`,
      timestamp: formatTimestamp(),
    }];
    
    set({ highlightedIndex: stack.length - 1 });
    setTimeout(() => {
      set({ stack: newStack, history: newHistory, highlightedIndex: -1 });
    }, 300);
    
    return value;
  },
  
  peek: () => {
    const { stack, history } = get();
    if (stack.length === 0) {
      const newHistory = [...history, {
        id: generateId(),
        operation: 'Peek',
        details: 'Stack is empty',
        timestamp: formatTimestamp(),
      }];
      set({ history: newHistory });
      return null;
    }
    
    const value = stack[stack.length - 1];
    const newHistory = [...history, {
      id: generateId(),
      operation: 'Peek',
      details: `Top element is ${value}`,
      timestamp: formatTimestamp(),
    }];
    
    set({ history: newHistory, highlightedIndex: stack.length - 1 });
    setTimeout(() => set({ highlightedIndex: -1 }), 1000);
    return value;
  },
  
  clear: () => {
    const { history } = get();
    const newHistory = [...history, {
      id: generateId(),
      operation: 'Clear',
      details: 'Cleared all elements from stack',
      timestamp: formatTimestamp(),
    }];
    set({ stack: [], history: newHistory, highlightedIndex: -1 });
  },
  
  isEmpty: () => {
    return get().stack.length === 0;
  },
  
  isFull: () => {
    const { stack, maxSize } = get();
    return stack.length >= maxSize;
  },
  
  size: () => {
    return get().stack.length;
  },
  
  clearHistory: () => {
    set({ history: [] });
  },
}));

export default useStackStore;
