import { create } from 'zustand';

const useBFSRoutingStore = create((set, get) => ({
  grid: Array(12).fill(null).map(() => Array(12).fill('empty')),
  start: { row: 2, col: 2 },
  end: { row: 9, col: 9 },
  obstacles: [],
  visitedCells: [],
  shortestPath: [],
  isSearching: false,
  searchComplete: false,
  operations: [],

  // Initialize grid with some obstacles
  initializeGrid: () => {
    const newGrid = Array(12).fill(null).map(() => Array(12).fill('empty'));
    const obstacles = [
      { row: 3, col: 5 }, { row: 4, col: 5 }, { row: 5, col: 5 },
      { row: 6, col: 5 }, { row: 7, col: 5 },
      { row: 5, col: 2 }, { row: 5, col: 3 }, { row: 5, col: 4 },
      { row: 8, col: 7 }, { row: 8, col: 8 }, { row: 9, col: 7 },
    ];

    obstacles.forEach(({ row, col }) => {
      newGrid[row][col] = 'obstacle';
    });

    newGrid[2][2] = 'start';
    newGrid[9][9] = 'end';

    set({ 
      grid: newGrid, 
      obstacles,
      visitedCells: [],
      shortestPath: [],
      searchComplete: false
    });
  },

  // Set start position
  setStart: (row, col) => {
    const { grid } = get();
    const newGrid = grid.map(r => [...r]);
    
    // Clear old start
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[i].length; j++) {
        if (newGrid[i][j] === 'start') newGrid[i][j] = 'empty';
      }
    }
    
    newGrid[row][col] = 'start';
    set({ grid: newGrid, start: { row, col }, visitedCells: [], shortestPath: [] });
  },

  // Set end position
  setEnd: (row, col) => {
    const { grid } = get();
    const newGrid = grid.map(r => [...r]);
    
    // Clear old end
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[i].length; j++) {
        if (newGrid[i][j] === 'end') newGrid[i][j] = 'empty';
      }
    }
    
    newGrid[row][col] = 'end';
    set({ grid: newGrid, end: { row, col }, visitedCells: [], shortestPath: [] });
  },

  // Toggle obstacle
  toggleObstacle: (row, col) => {
    const { grid } = get();
    const newGrid = grid.map(r => [...r]);
    
    if (newGrid[row][col] === 'obstacle') {
      newGrid[row][col] = 'empty';
    } else if (newGrid[row][col] === 'empty') {
      newGrid[row][col] = 'obstacle';
    }
    
    set({ grid: newGrid, visitedCells: [], shortestPath: [] });
  },

  // BFS Algorithm
  findShortestPath: async () => {
    const { grid, start, end, operations } = get();
    
    set({ 
      isSearching: true, 
      visitedCells: [], 
      shortestPath: [],
      searchComplete: false,
      operations: [...operations, {
        type: 'search',
        message: 'Starting BFS search for shortest path',
        timestamp: new Date().toLocaleTimeString()
      }]
    });

    const queue = [[start.row, start.col, []]];
    const visited = new Set();
    visited.add(`${start.row},${start.col}`);
    
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const visitedOrder = [];

    while (queue.length > 0) {
      const [row, col, path] = queue.shift();
      const currentPath = [...path, { row, col }];
      
      visitedOrder.push({ row, col });
      set({ visitedCells: [...visitedOrder] });
      await new Promise(resolve => setTimeout(resolve, 50));

      if (row === end.row && col === end.col) {
        set({ 
          shortestPath: currentPath,
          isSearching: false,
          searchComplete: true,
          operations: [...get().operations, {
            type: 'success',
            message: `Path found! Length: ${currentPath.length} cells`,
            timestamp: new Date().toLocaleTimeString()
          }]
        });
        return;
      }

      for (const [dx, dy] of directions) {
        const newRow = row + dx;
        const newCol = col + dy;
        const key = `${newRow},${newCol}`;

        if (
          newRow >= 0 && newRow < grid.length &&
          newCol >= 0 && newCol < grid[0].length &&
          grid[newRow][newCol] !== 'obstacle' &&
          !visited.has(key)
        ) {
          visited.add(key);
          queue.push([newRow, newCol, currentPath]);
        }
      }
    }

    set({ 
      isSearching: false,
      searchComplete: true,
      operations: [...get().operations, {
        type: 'error',
        message: 'No path found to destination',
        timestamp: new Date().toLocaleTimeString()
      }]
    });
  },

  // Clear path
  clearPath: () => {
    set({ visitedCells: [], shortestPath: [], searchComplete: false });
  },

  // Reset grid
  reset: () => {
    get().initializeGrid();
    set({ 
      visitedCells: [], 
      shortestPath: [],
      searchComplete: false,
      operations: []
    });
  },

  // Clear history
  clearHistory: () => {
    set({ operations: [] });
  },
}));

export default useBFSRoutingStore;
