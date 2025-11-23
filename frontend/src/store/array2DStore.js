import { create } from 'zustand';
import { generateId, formatTimestamp } from '../utils/animations';

const use2DArrayStore = create((set, get) => ({
  // State - Initialize with a 3x4 matrix
  matrix: [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
  ],
  isPlaying: false,
  speed: 1,
  operations: [],
  highlightedCells: [],
  
  // Actions
  setMatrix: (newMatrix) => set({ matrix: newMatrix }),
  
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
  
  setHighlightedCells: (cells) => set({ highlightedCells: cells }),
  
  // 2D Array Operations
  insertRow: (rowIndex, rowData) => {
    const { matrix, addOperation } = get();
    const newMatrix = [...matrix];
    newMatrix.splice(rowIndex, 0, rowData);
    set({ matrix: newMatrix });
    addOperation('Insert Row', `Inserted row at index ${rowIndex}`);
  },
  
  insertColumn: (colIndex, value = 0) => {
    const { matrix, addOperation } = get();
    const newMatrix = matrix.map(row => {
      const newRow = [...row];
      newRow.splice(colIndex, 0, value);
      return newRow;
    });
    set({ matrix: newMatrix });
    addOperation('Insert Column', `Inserted column at index ${colIndex}`);
  },
  
  deleteRow: (rowIndex) => {
    const { matrix, addOperation } = get();
    if (rowIndex < 0 || rowIndex >= matrix.length) return;
    const newMatrix = matrix.filter((_, i) => i !== rowIndex);
    set({ matrix: newMatrix });
    addOperation('Delete Row', `Deleted row at index ${rowIndex}`);
  },
  
  deleteColumn: (colIndex) => {
    const { matrix, addOperation } = get();
    if (matrix.length === 0 || colIndex < 0 || colIndex >= matrix[0].length) return;
    const newMatrix = matrix.map(row => row.filter((_, i) => i !== colIndex));
    set({ matrix: newMatrix });
    addOperation('Delete Column', `Deleted column at index ${colIndex}`);
  },
  
  updateCell: (row, col, value) => {
    const { matrix, addOperation } = get();
    if (row < 0 || row >= matrix.length || col < 0 || col >= matrix[0].length) return;
    const newMatrix = matrix.map((r, i) => 
      i === row ? r.map((c, j) => j === col ? value : c) : r
    );
    const oldValue = matrix[row][col];
    set({ matrix: newMatrix });
    addOperation('Update Cell', `Updated [${row}][${col}] from ${oldValue} to ${value}`);
  },
  
  searchValue: (value) => {
    const { matrix, addOperation } = get();
    const cells = [];
    matrix.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === value) {
          cells.push({ row: i, col: j });
        }
      });
    });
    
    if (cells.length > 0) {
      set({ highlightedCells: cells });
      addOperation('Search', `Found ${value} at ${cells.length} location(s)`);
    } else {
      set({ highlightedCells: [] });
      addOperation('Search', `Value ${value} not found`);
    }
    return cells;
  },
  
  transpose: () => {
    const { matrix, addOperation } = get();
    if (matrix.length === 0) return;
    const rows = matrix.length;
    const cols = matrix[0].length;
    const transposed = Array.from({ length: cols }, (_, i) =>
      Array.from({ length: rows }, (_, j) => matrix[j][i])
    );
    set({ matrix: transposed });
    addOperation('Transpose', 'Transposed the matrix');
  },
  
  reset: () => {
    set({ 
      matrix: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
      ],
      highlightedCells: [],
      operations: [],
      isPlaying: false,
    });
  },
}));

export default use2DArrayStore;
