import { create } from 'zustand';
import { generateId, formatTimestamp } from '../utils/animations';

const useArrayStore = create((set, get) => ({
  // State
  array: [5, 2, 8, 1, 9],
  isPlaying: false,
  speed: 1,
  operations: [],
  highlightedIndices: [],
  
  // Actions
  setArray: (newArray) => set({ array: newArray }),
  
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  
  setSpeed: (speed) => set({ speed }),
  
  addOperation: (operation, details) => {
    const newOp = {
      id: generateId(),
      operation,
      details,
      timestamp: formatTimestamp(),
    };
    set((state) => ({ operations: [...state.operations, newOp] }));
  },
  
  clearOperations: () => set({ operations: [] }),
  
  setHighlightedIndices: (indices) => set({ highlightedIndices: indices }),
  
  // Array Operations
  insert: (index, value) => {
    const { array, addOperation } = get();
    const newArray = [...array];
    newArray.splice(index, 0, value);
    set({ array: newArray });
    addOperation('Insert', `Inserted ${value} at index ${index}`);
  },
  
  deleteAt: (index) => {
    const { array, addOperation } = get();
    if (index < 0 || index >= array.length) return;
    const deletedValue = array[index];
    const newArray = array.filter((_, i) => i !== index);
    set({ array: newArray });
    addOperation('Delete', `Deleted ${deletedValue} from index ${index}`);
  },
  
  update: (index, value) => {
    const { array, addOperation } = get();
    if (index < 0 || index >= array.length) return;
    const newArray = [...array];
    const oldValue = newArray[index];
    newArray[index] = value;
    set({ array: newArray });
    addOperation('Update', `Updated index ${index} from ${oldValue} to ${value}`);
  },
  
  search: (value) => {
    const { array, addOperation } = get();
    const index = array.indexOf(value);
    if (index !== -1) {
      set({ highlightedIndices: [index] });
      addOperation('Search', `Found ${value} at index ${index}`);
    } else {
      addOperation('Search', `Value ${value} not found`);
    }
    return index;
  },
  
  reverse: () => {
    const { array, addOperation } = get();
    const newArray = [...array].reverse();
    set({ array: newArray });
    addOperation('Reverse', 'Reversed the array');
  },

  bubbleSort: async () => {
    const { array, speed, addOperation, setHighlightedIndices } = get();
    let arr = [...array];
    let n = arr.length;
    set({ isPlaying: true });

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (!get().isPlaying) return;
        setHighlightedIndices([j, j + 1]);
        await new Promise(resolve => setTimeout(resolve, 300 / speed));

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          set({ array: [...arr] });
          addOperation('Sort (Bubble)', `Swapped ${arr[j+1]} and ${arr[j]}`);
          await new Promise(resolve => setTimeout(resolve, 300 / speed));
        }
      }
    }
    set({ highlightedIndices: [], isPlaying: false });
    addOperation('Sort (Bubble)', 'Bubble sort complete');
  },
  
  reset: () => {
    set({ 
      array: [5, 2, 8, 1, 9],
      highlightedIndices: [],
      operations: [],
      isPlaying: false,
    });
  },
}));

export default useArrayStore;
