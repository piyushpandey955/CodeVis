import { create } from 'zustand';
import { generateId, formatTimestamp } from '../utils/animations';

const useLinkedListStore = create((set, get) => ({
  // State
  nodes: [],
  history: [],
  highlightedIndex: -1,
  maxSize: 15,
  
  // Actions
  insertAtHead: (value) => {
    const { nodes, history, maxSize } = get();
    if (nodes.length >= maxSize) {
      const newHistory = [...history, {
        id: generateId(),
        operation: 'Insert (Failed)',
        details: `List is full (max ${maxSize} nodes)`,
        timestamp: formatTimestamp(),
      }];
      set({ history: newHistory });
      return false;
    }
    const newNodes = [{ value, id: generateId() }, ...nodes];
    const newHistory = [...history, {
      id: generateId(),
      operation: 'Insert at Head',
      details: `Inserted ${value} at the head`,
      timestamp: formatTimestamp(),
    }];
    set({ nodes: newNodes, history: newHistory, highlightedIndex: 0 });
    setTimeout(() => set({ highlightedIndex: -1 }), 500);
    return true;
  },
  
  insertAtTail: (value) => {
    const { nodes, history, maxSize } = get();
    if (nodes.length >= maxSize) {
      const newHistory = [...history, {
        id: generateId(),
        operation: 'Insert (Failed)',
        details: `List is full (max ${maxSize} nodes)`,
        timestamp: formatTimestamp(),
      }];
      set({ history: newHistory });
      return false;
    }
    const newNodes = [...nodes, { value, id: generateId() }];
    const newHistory = [...history, {
      id: generateId(),
      operation: 'Insert at Tail',
      details: `Inserted ${value} at the tail`,
      timestamp: formatTimestamp(),
    }];
    set({ nodes: newNodes, history: newHistory, highlightedIndex: newNodes.length - 1 });
    setTimeout(() => set({ highlightedIndex: -1 }), 500);
    return true;
  },
  
  insertAtPosition: (value, position) => {
    const { nodes, history, maxSize } = get();
    if (nodes.length >= maxSize) {
      const newHistory = [...history, {
        id: generateId(),
        operation: 'Insert (Failed)',
        details: `List is full (max ${maxSize} nodes)`,
        timestamp: formatTimestamp(),
      }];
      set({ history: newHistory });
      return false;
    }
    if (position < 0 || position > nodes.length) {
      const newHistory = [...history, {
        id: generateId(),
        operation: 'Insert (Failed)',
        details: `Invalid position ${position}`,
        timestamp: formatTimestamp(),
      }];
      set({ history: newHistory });
      return false;
    }
    
    const newNodes = [...nodes];
    newNodes.splice(position, 0, { value, id: generateId() });
    const newHistory = [...history, {
      id: generateId(),
      operation: 'Insert at Position',
      details: `Inserted ${value} at position ${position}`,
      timestamp: formatTimestamp(),
    }];
    set({ nodes: newNodes, history: newHistory, highlightedIndex: position });
    setTimeout(() => set({ highlightedIndex: -1 }), 500);
    return true;
  },
  
  deleteAtHead: () => {
    const { nodes, history } = get();
    if (nodes.length === 0) {
      const newHistory = [...history, {
        id: generateId(),
        operation: 'Delete (Failed)',
        details: 'List is empty',
        timestamp: formatTimestamp(),
      }];
      set({ history: newHistory });
      return null;
    }
    
    const deletedValue = nodes[0].value;
    const newNodes = nodes.slice(1);
    const newHistory = [...history, {
      id: generateId(),
      operation: 'Delete from Head',
      details: `Deleted ${deletedValue} from head`,
      timestamp: formatTimestamp(),
    }];
    
    set({ highlightedIndex: 0 });
    setTimeout(() => {
      set({ nodes: newNodes, history: newHistory, highlightedIndex: -1 });
    }, 300);
    return deletedValue;
  },
  
  deleteAtTail: () => {
    const { nodes, history } = get();
    if (nodes.length === 0) {
      const newHistory = [...history, {
        id: generateId(),
        operation: 'Delete (Failed)',
        details: 'List is empty',
        timestamp: formatTimestamp(),
      }];
      set({ history: newHistory });
      return null;
    }
    
    const deletedValue = nodes[nodes.length - 1].value;
    const newNodes = nodes.slice(0, -1);
    const newHistory = [...history, {
      id: generateId(),
      operation: 'Delete from Tail',
      details: `Deleted ${deletedValue} from tail`,
      timestamp: formatTimestamp(),
    }];
    
    set({ highlightedIndex: nodes.length - 1 });
    setTimeout(() => {
      set({ nodes: newNodes, history: newHistory, highlightedIndex: -1 });
    }, 300);
    return deletedValue;
  },
  
  deleteByValue: (value) => {
    const { nodes, history } = get();
    const index = nodes.findIndex(node => node.value === value);
    
    if (index === -1) {
      const newHistory = [...history, {
        id: generateId(),
        operation: 'Delete (Failed)',
        details: `Value ${value} not found`,
        timestamp: formatTimestamp(),
      }];
      set({ history: newHistory });
      return false;
    }
    
    const newNodes = nodes.filter((_, i) => i !== index);
    const newHistory = [...history, {
      id: generateId(),
      operation: 'Delete by Value',
      details: `Deleted node with value ${value} at position ${index}`,
      timestamp: formatTimestamp(),
    }];
    
    set({ highlightedIndex: index });
    setTimeout(() => {
      set({ nodes: newNodes, history: newHistory, highlightedIndex: -1 });
    }, 300);
    return true;
  },
  
  search: (value) => {
    const { nodes, history } = get();
    const index = nodes.findIndex(node => node.value === value);
    
    if (index !== -1) {
      const newHistory = [...history, {
        id: generateId(),
        operation: 'Search',
        details: `Found ${value} at position ${index}`,
        timestamp: formatTimestamp(),
      }];
      set({ history: newHistory, highlightedIndex: index });
      setTimeout(() => set({ highlightedIndex: -1 }), 1500);
      return index;
    } else {
      const newHistory = [...history, {
        id: generateId(),
        operation: 'Search',
        details: `Value ${value} not found`,
        timestamp: formatTimestamp(),
      }];
      set({ history: newHistory });
      return -1;
    }
  },
  
  clear: () => {
    const { history } = get();
    const newHistory = [...history, {
      id: generateId(),
      operation: 'Clear',
      details: 'Cleared all nodes from list',
      timestamp: formatTimestamp(),
    }];
    set({ nodes: [], history: newHistory, highlightedIndex: -1 });
  },
  
  isEmpty: () => {
    return get().nodes.length === 0;
  },
  
  size: () => {
    return get().nodes.length;
  },
  
  clearHistory: () => {
    set({ history: [] });
  },
}));

export default useLinkedListStore;
