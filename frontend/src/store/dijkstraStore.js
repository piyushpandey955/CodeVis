import { create } from 'zustand';

const useDijkstraStore = create((set, get) => ({
  nodes: [
    { id: 'A', x: 200, y: 150, distance: Infinity, visited: false },
    { id: 'B', x: 400, y: 100, distance: Infinity, visited: false },
    { id: 'C', x: 600, y: 150, distance: Infinity, visited: false },
    { id: 'D', x: 300, y: 300, distance: Infinity, visited: false },
    { id: 'E', x: 500, y: 300, distance: Infinity, visited: false },
    { id: 'F', x: 700, y: 300, distance: Infinity, visited: false },
  ],
  edges: [
    { from: 'A', to: 'B', weight: 4 },
    { from: 'A', to: 'D', weight: 2 },
    { from: 'B', to: 'C', weight: 3 },
    { from: 'B', to: 'E', weight: 1 },
    { from: 'D', to: 'E', weight: 5 },
    { from: 'E', to: 'C', weight: 2 },
    { from: 'E', to: 'F', weight: 3 },
    { from: 'C', to: 'F', weight: 1 },
  ],
  startNode: 'A',
  endNode: 'F',
  currentNode: null,
  priorityQueue: [],
  shortestPath: [],
  isRunning: false,
  operations: [],

  // Reset distances
  resetDistances: () => {
    const { nodes } = get();
    const newNodes = nodes.map(node => ({
      ...node,
      distance: node.id === get().startNode ? 0 : Infinity,
      visited: false
    }));
    
    set({ 
      nodes: newNodes,
      currentNode: null,
      priorityQueue: [],
      shortestPath: []
    });
  },

  // Set start node
  setStart: (nodeId) => {
    set({ startNode: nodeId });
    get().resetDistances();
  },

  // Set end node
  setEnd: (nodeId) => {
    set({ endNode: nodeId, shortestPath: [] });
  },

  // Aliases for component usage
  setStartNode: (nodeId) => {
    get().setStart(nodeId);
  },

  setEndNode: (nodeId) => {
    get().setEnd(nodeId);
  },

  // Run Dijkstra's Algorithm
  runDijkstra: async () => {
    const { nodes, edges, startNode, endNode, operations } = get();
    
    set({ 
      isRunning: true,
      operations: [...operations, {
        type: 'start',
        message: `Finding shortest path from ${startNode} to ${endNode}`,
        timestamp: new Date().toLocaleTimeString()
      }]
    });

    get().resetDistances();
    
    // Initialize priority queue with start node
    const pq = [{ id: startNode, distance: 0 }];
    const distances = {};
    const previous = {};
    
    nodes.forEach(node => {
      distances[node.id] = node.id === startNode ? 0 : Infinity;
      previous[node.id] = null;
    });

    while (pq.length > 0) {
      // Sort priority queue by distance (min heap behavior)
      pq.sort((a, b) => a.distance - b.distance);
      const current = pq.shift();
      
      set({ 
        currentNode: current.id,
        priorityQueue: [...pq]
      });
      
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mark as visited
      const updatedNodes = get().nodes.map(node =>
        node.id === current.id ? { ...node, visited: true } : node
      );
      set({ nodes: updatedNodes });

      if (current.id === endNode) {
        // Reconstruct path
        const path = [];
        let curr = endNode;
        while (curr !== null) {
          path.unshift(curr);
          curr = previous[curr];
        }
        
        set({ 
          shortestPath: path,
          isRunning: false,
          currentNode: null,
          operations: [...get().operations, {
            type: 'success',
            message: `Shortest path: ${path.join(' → ')} (Distance: ${distances[endNode]})`,
            timestamp: new Date().toLocaleTimeString()
          }]
        });
        return;
      }

      // Check neighbors
      const neighbors = edges.filter(e => e.from === current.id);
      
      for (const edge of neighbors) {
        const neighbor = edge.to;
        const newDist = distances[current.id] + edge.weight;
        
        if (newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
          previous[neighbor] = current.id;
          
          // Update node distance
          const updatedNodes = get().nodes.map(node =>
            node.id === neighbor ? { ...node, distance: newDist } : node
          );
          set({ nodes: updatedNodes });
          
          // Add/update in priority queue
          const existingIndex = pq.findIndex(n => n.id === neighbor);
          if (existingIndex !== -1) {
            pq[existingIndex].distance = newDist;
          } else {
            pq.push({ id: neighbor, distance: newDist });
          }
          
          set({ priorityQueue: [...pq] });
        }
      }
    }

    set({ 
      isRunning: false,
      currentNode: null,
      operations: [...get().operations, {
        type: 'error',
        message: `No path found from ${startNode} to ${endNode}`,
        timestamp: new Date().toLocaleTimeString()
      }]
    });
  },

  // Reset
  reset: () => {
    get().resetDistances();
    set({ 
      shortestPath: [],
      currentNode: null,
      priorityQueue: [],
      operations: []
    });
  },

  // Clear history
  clearHistory: () => {
    set({ operations: [] });
  },
}));

export default useDijkstraStore;
