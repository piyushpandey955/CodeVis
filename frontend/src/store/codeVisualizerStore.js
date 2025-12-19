import { create } from 'zustand';
import { generateId, formatTimestamp } from '../utils/animations';

const useCodeVisualizerStore = create((set, get) => ({
  // Editor State
  code: '',
  language: 'java',
  
  // Execution State
  isExecuting: false,
  executionStates: [],      // Array of captured states
  currentStateIndex: 0,
  isPlaying: false,
  playbackSpeed: 1,         // 1x, 2x, 0.5x
  
  // Detected Data Structure
  detectedDSA: null,        // 'stack', 'queue', 'array', 'linkedlist', etc.
  
  // Execution Log
  executionLog: [],
  errors: [],
  
  // Editor Actions
  setCode: (code) => set({ code }),
  
  setLanguage: (language) => set({ 
    language,
    code: '',
    executionStates: [],
    currentStateIndex: 0,
    detectedDSA: null,
    errors: []
  }),
  
  // Execution Actions
  executeCode: async () => {
    const { code, language } = get();
    set({ 
      isExecuting: true, 
      errors: [],
      executionLog: [],
      executionStates: [],
      currentStateIndex: 0
    });
    
    try {
      // Parse and execute code based on language
      let states;
      if (language === 'java') {
        states = await get().executeJavaCode(code);
      } else if (language === 'python') {
        states = await get().executePythonCode(code);
      } else {
        throw new Error(`Language ${language} not supported yet`);
      }
      
      set({ 
        executionStates: states,
        isExecuting: false,
        currentStateIndex: 0
      });
      
      get().addLog('success', 'Code executed successfully');
    } catch (error) {
      set({ 
        isExecuting: false,
        errors: [{ message: error.message, line: error.line }]
      });
      get().addLog('error', error.message);
    }
  },
  
  // Java Code Execution (Client-side parsing)
  executeJavaCode: async (code) => {
    const states = [];
    
    // Detect DSA type from code
    const dsaType = get().detectDSAType(code);
    set({ detectedDSA: dsaType });
    
    // Parse Java code and extract operations
    const operations = get().parseJavaOperations(code);
    
    // Simulate execution and capture states
    let dataStructure = get().initializeDS(dsaType);
    
    for (let op of operations) {
      dataStructure = get().applyOperation(dataStructure, op, dsaType);
      states.push({
        id: generateId(),
        operation: op.name,
        line: op.line,
        data: JSON.parse(JSON.stringify(dataStructure)),
        timestamp: formatTimestamp()
      });
      
      // Small delay to simulate execution
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    return states;
  },
  
  // Detect DSA type from code patterns
  detectDSAType: (code) => {
    if (code.includes('Stack')) return 'stack';
    if (code.includes('Queue')) return 'queue';
    if (code.includes('LinkedList')) return 'linkedlist';
    if (code.includes('ArrayList') || code.includes('int[]')) return 'array';
    if (code.includes('TreeNode') || code.includes('BinaryTree')) return 'tree';
    if (code.includes('HashMap') || code.includes('HashSet')) return 'hashmap';
    return 'array'; // Default
  },
  
  // Parse Java operations from code
  parseJavaOperations: (code) => {
    const operations = [];
    const lines = code.split('\n');
    
    // Detect the DSA type first to determine which operations to parse
    const dsaType = get().detectDSAType(code);
    
    lines.forEach((line, index) => {
      const trimmed = line.trim();
      
      // Skip comments and empty lines
      if (trimmed.startsWith('//') || trimmed === '') return;
      
      // Stack operations
      if (dsaType === 'stack') {
        if (trimmed.includes('.push(')) {
          const match = trimmed.match(/\.push\(([^)]+)\)/);
          if (match) {
            operations.push({
              name: 'push',
              value: match[1].trim(),
              line: index + 1
            });
          }
        }
        
        if (trimmed.includes('.pop()')) {
          operations.push({
            name: 'pop',
            line: index + 1
          });
        }
      }
      
      // Queue operations
      if (dsaType === 'queue') {
        if (trimmed.includes('.add(') || trimmed.includes('.offer(')) {
          const match = trimmed.match(/\.(add|offer)\(([^)]+)\)/);
          if (match) {
            operations.push({
              name: 'enqueue',
              value: match[2].trim(),
              line: index + 1
            });
          }
        }
        
        if (trimmed.includes('.poll()') || trimmed.includes('.remove()')) {
          operations.push({
            name: 'dequeue',
            line: index + 1
          });
        }
      }
      
      // ArrayList operations
      if (dsaType === 'array') {
        if (trimmed.includes('.add(')) {
          const match = trimmed.match(/\.add\(([^)]+)\)/);
          if (match) {
            const args = match[1].split(',').map(a => a.trim());
            if (args.length === 2) {
              operations.push({
                name: 'insert',
                index: args[0],
                value: args[1],
                line: index + 1
              });
            } else {
              operations.push({
                name: 'append',
                value: args[0],
                line: index + 1
              });
            }
          }
        }
      }
    });
    
    return operations;
  },
  
  // Initialize data structure
  initializeDS: (dsaType) => {
    switch (dsaType) {
      case 'stack':
      case 'queue':
      case 'array':
        return [];
      case 'linkedlist':
        return { head: null };
      case 'tree':
        return { root: null };
      case 'hashmap':
        return {};
      default:
        return [];
    }
  },
  
  // Apply operation to data structure
  applyOperation: (ds, operation) => {
    const newDS = JSON.parse(JSON.stringify(ds)); // Deep clone
    
    switch (operation.name) {
      case 'push':
        newDS.push(parseInt(operation.value) || operation.value);
        break;
        
      case 'pop':
        newDS.pop();
        break;
        
      case 'enqueue':
        newDS.push(parseInt(operation.value) || operation.value);
        break;
        
      case 'dequeue':
        newDS.shift();
        break;
        
      case 'append':
        newDS.push(parseInt(operation.value) || operation.value);
        break;
        
      case 'insert': {
        const idx = parseInt(operation.index);
        const val = parseInt(operation.value) || operation.value;
        newDS.splice(idx, 0, val);
        break;
      }
    }
    
    return newDS;
  },
  
  // Python code execution (placeholder for future)
  executePythonCode: async (_code) => {
    throw new Error('Python support coming soon');
  },
  
  // Playback Controls
  play: () => {
    set({ isPlaying: true });
    get().playbackLoop();
  },
  
  pause: () => {
    set({ isPlaying: false });
  },
  
  playbackLoop: async () => {
    const { isPlaying, currentStateIndex, executionStates, playbackSpeed } = get();
    
    if (!isPlaying || currentStateIndex >= executionStates.length - 1) {
      set({ isPlaying: false });
      return;
    }
    
    set({ currentStateIndex: currentStateIndex + 1 });
    await new Promise(resolve => setTimeout(resolve, 1000 / playbackSpeed));
    
    if (get().isPlaying) {
      get().playbackLoop();
    }
  },
  
  stepForward: () => {
    const { currentStateIndex, executionStates } = get();
    if (currentStateIndex < executionStates.length - 1) {
      set({ currentStateIndex: currentStateIndex + 1 });
    }
  },
  
  stepBackward: () => {
    const { currentStateIndex } = get();
    if (currentStateIndex > 0) {
      set({ currentStateIndex: currentStateIndex - 1 });
    }
  },
  
  goToState: (index) => {
    const { executionStates } = get();
    if (index >= 0 && index < executionStates.length) {
      set({ currentStateIndex: index, isPlaying: false });
    }
  },
  
  setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),
  
  // Logging
  addLog: (type, message) => {
    const log = {
      id: generateId(),
      type,
      message,
      timestamp: formatTimestamp()
    };
    set(state => ({ executionLog: [...state.executionLog, log] }));
  },
  
  clearLog: () => set({ executionLog: [] }),
  
  // Reset
  reset: () => {
    set({
      executionStates: [],
      currentStateIndex: 0,
      isPlaying: false,
      executionLog: [],
      errors: [],
      detectedDSA: null
    });
  }
}));

export default useCodeVisualizerStore;
