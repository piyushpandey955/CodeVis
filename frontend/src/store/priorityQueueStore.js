import { create } from 'zustand';

const usePriorityQueueStore = create((set, get) => ({
  heap: [],
  highlightedIndices: [],
  operations: [],
  maxSize: 15,
  type: 'min', // 'min' or 'max'

  // Insert element into priority queue
  insert: (value, priority) => {
    const { heap, maxSize, operations, type } = get();
    
    if (heap.length >= maxSize) {
      set({
        operations: [...operations, { 
          type: 'insert', 
          value, 
          priority, 
          success: false, 
          message: 'Priority Queue is full',
          timestamp: new Date().toLocaleTimeString()
        }]
      });
      return;
    }

    const newElement = { 
      id: Date.now(), 
      value, 
      priority: parseInt(priority)
    };
    
    const newHeap = [...heap, newElement];
    
    // Heapify up
    let currentIndex = newHeap.length - 1;
    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      const shouldSwap = type === 'min' 
        ? newHeap[currentIndex].priority < newHeap[parentIndex].priority
        : newHeap[currentIndex].priority > newHeap[parentIndex].priority;
      
      if (shouldSwap) {
        [newHeap[currentIndex], newHeap[parentIndex]] = [newHeap[parentIndex], newHeap[currentIndex]];
        currentIndex = parentIndex;
      } else {
        break;
      }
    }

    set({
      heap: newHeap,
      highlightedIndices: [currentIndex],
      operations: [...operations, { 
        type: 'insert', 
        value, 
        priority, 
        success: true,
        message: `Inserted ${value} with priority ${priority}`,
        timestamp: new Date().toLocaleTimeString()
      }]
    });

    setTimeout(() => set({ highlightedIndices: [] }), 1000);
  },

  // Remove and return highest priority element
  extractTop: () => {
    const { heap, operations, type } = get();
    
    if (heap.length === 0) {
      set({
        operations: [...operations, { 
          type: 'extract', 
          success: false, 
          message: 'Priority Queue is empty',
          timestamp: new Date().toLocaleTimeString()
        }]
      });
      return;
    }

    const topElement = heap[0];
    const newHeap = [...heap];
    
    // Move last element to root
    newHeap[0] = newHeap[newHeap.length - 1];
    newHeap.pop();

    // Heapify down
    let currentIndex = 0;
    while (currentIndex < newHeap.length) {
      const leftChild = 2 * currentIndex + 1;
      const rightChild = 2 * currentIndex + 2;
      let targetIndex = currentIndex;

      if (leftChild < newHeap.length) {
        const shouldSwapLeft = type === 'min'
          ? newHeap[leftChild].priority < newHeap[targetIndex].priority
          : newHeap[leftChild].priority > newHeap[targetIndex].priority;
        
        if (shouldSwapLeft) {
          targetIndex = leftChild;
        }
      }

      if (rightChild < newHeap.length) {
        const shouldSwapRight = type === 'min'
          ? newHeap[rightChild].priority < newHeap[targetIndex].priority
          : newHeap[rightChild].priority > newHeap[targetIndex].priority;
        
        if (shouldSwapRight) {
          targetIndex = rightChild;
        }
      }

      if (targetIndex !== currentIndex) {
        [newHeap[currentIndex], newHeap[targetIndex]] = [newHeap[targetIndex], newHeap[currentIndex]];
        currentIndex = targetIndex;
      } else {
        break;
      }
    }

    set({
      heap: newHeap,
      highlightedIndices: [0],
      operations: [...operations, { 
        type: 'extract', 
        value: topElement.value,
        priority: topElement.priority,
        success: true,
        message: `Extracted ${topElement.value} (priority: ${topElement.priority})`,
        timestamp: new Date().toLocaleTimeString()
      }]
    });

    setTimeout(() => set({ highlightedIndices: [] }), 1000);
  },

  // Peek at top element without removing
  peek: () => {
    const { heap, operations } = get();
    
    if (heap.length === 0) {
      set({
        operations: [...operations, { 
          type: 'peek', 
          success: false, 
          message: 'Priority Queue is empty',
          timestamp: new Date().toLocaleTimeString()
        }]
      });
      return;
    }

    const topElement = heap[0];
    
    set({
      highlightedIndices: [0],
      operations: [...operations, { 
        type: 'peek', 
        value: topElement.value,
        priority: topElement.priority,
        success: true,
        message: `Top element: ${topElement.value} (priority: ${topElement.priority})`,
        timestamp: new Date().toLocaleTimeString()
      }]
    });

    setTimeout(() => set({ highlightedIndices: [] }), 1000);
  },

  // Toggle between min and max heap
  toggleType: () => {
    const { type, heap } = get();
    const newType = type === 'min' ? 'max' : 'min';
    
    // Rebuild heap with new type
    const elements = [...heap];
    set({ heap: [], type: newType });
    
    elements.forEach(element => {
      get().insert(element.value, element.priority);
    });
  },

  // Clear the priority queue
  clear: () => {
    set({ 
      heap: [], 
      highlightedIndices: [],
      operations: [...get().operations, {
        type: 'clear',
        success: true,
        message: 'Priority Queue cleared',
        timestamp: new Date().toLocaleTimeString()
      }]
    });
  },

  // Clear operation history
  clearHistory: () => {
    set({ operations: [] });
  },
}));

export default usePriorityQueueStore;
