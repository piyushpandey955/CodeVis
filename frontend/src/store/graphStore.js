import { create } from 'zustand';

const useGraphStore = create((set, get) => ({
  nodes: [], // Array of {id, label, x, y}
  edges: [], // Array of {from, to, weight}
  highlightedNodes: [],
  highlightedEdges: [],
  traversalPath: [],
  currentTraversalIndex: -1,
  isTraversing: false,
  history: [],
  maxNodes: 15,
  isDirected: false,
  isWeighted: false,

  // Add a node
  addNode: (label) => {
    const { nodes, edges, maxNodes, history, isWeighted } = get();
    
    if (nodes.length >= maxNodes) {
      set({
        history: [
          ...history,
          {
            id: Date.now(),
            operation: 'Add Node',
            value: label,
            success: false,
            message: `Graph is full (max ${maxNodes} nodes)`,
            timestamp: new Date().toLocaleTimeString(),
          },
        ],
      });
      return false;
    }

    // Calculate position in a circular layout for better space usage
    const containerWidth = 800;
    const containerHeight = 600;
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;
    
    let x, y;
    
    if (nodes.length === 0) {
      // First node at center
      x = centerX;
      y = centerY;
    } else if (nodes.length === 1) {
      // Second node positioned to the right
      x = centerX + 180;
      y = centerY;
    } else {
      // Arrange remaining nodes in expanding circles
      const baseRadius = 180;
      const nodeIndex = nodes.length - 1; // Exclude center node
      
      // Determine which ring and position on that ring
      let ring = 0;
      let nodesInRing = 6; // First ring has 6 nodes
      let nodeIndexInRing = nodeIndex - 1; // Adjust for second node
      
      // Find which ring this node belongs to
      while (nodeIndexInRing >= nodesInRing) {
        nodeIndexInRing -= nodesInRing;
        ring++;
        nodesInRing = 6 + (ring * 3); // Increase nodes per ring
      }
      
      const radius = baseRadius + (ring * 100);
      const angle = (2 * Math.PI * nodeIndexInRing) / nodesInRing;
      
      x = centerX + radius * Math.cos(angle - Math.PI / 2);
      y = centerY + radius * Math.sin(angle - Math.PI / 2);
      
      // Keep within bounds
      x = Math.max(60, Math.min(x, containerWidth - 60));
      y = Math.max(60, Math.min(y, containerHeight - 60));
    }

    const newNode = {
      id: Date.now().toString(),
      label: label || `N${nodes.length}`,
      x,
      y,
    };

    // Automatically connect to previous node if it exists
    const newEdges = [...edges];
    if (nodes.length > 0) {
      const previousNode = nodes[nodes.length - 1];
      const newEdge = {
        id: `edge_${Date.now()}`,
        from: previousNode.id,
        to: newNode.id,
        weight: isWeighted ? Math.floor(Math.random() * 9) + 1 : 1,
      };
      newEdges.push(newEdge);
    }

    set({
      nodes: [...nodes, newNode],
      edges: newEdges,
      history: [
        ...history,
        {
          id: Date.now(),
          operation: 'Add Node',
          value: newNode.label,
          success: true,
          message: `Added node ${newNode.label}${nodes.length > 0 ? ` and connected to ${nodes[nodes.length - 1].label}` : ''}`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ],
    });
    return true;
  },

  // Remove a node
  removeNode: (nodeId) => {
    const { nodes, edges, history } = get();
    const node = nodes.find(n => n.id === nodeId);
    
    if (!node) return false;

    // Remove all edges connected to this node
    const newEdges = edges.filter(e => e.from !== nodeId && e.to !== nodeId);

    set({
      nodes: nodes.filter(n => n.id !== nodeId),
      edges: newEdges,
      history: [
        ...history,
        {
          id: Date.now(),
          operation: 'Remove Node',
          value: node.label,
          success: true,
          message: `Removed node ${node.label}`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ],
    });
    return true;
  },

  // Add an edge
  addEdge: (fromId, toId, weight = 1) => {
    const { nodes, edges, isDirected, history } = get();
    
    const fromNode = nodes.find(n => n.id === fromId);
    const toNode = nodes.find(n => n.id === toId);

    if (!fromNode || !toNode) {
      set({
        history: [
          ...history,
          {
            id: Date.now(),
            operation: 'Add Edge',
            success: false,
            message: 'Invalid nodes selected',
            timestamp: new Date().toLocaleTimeString(),
          },
        ],
      });
      return false;
    }

    // Check if edge already exists
    const edgeExists = edges.some(e => 
      (e.from === fromId && e.to === toId) || 
      (!isDirected && e.from === toId && e.to === fromId)
    );

    if (edgeExists) {
      set({
        history: [
          ...history,
          {
            id: Date.now(),
            operation: 'Add Edge',
            success: false,
            message: `Edge already exists`,
            timestamp: new Date().toLocaleTimeString(),
          },
        ],
      });
      return false;
    }

    const newEdge = {
      id: Date.now().toString(),
      from: fromId,
      to: toId,
      weight: weight,
    };

    set({
      edges: [...edges, newEdge],
      history: [
        ...history,
        {
          id: Date.now(),
          operation: 'Add Edge',
          value: `${fromNode.label} → ${toNode.label}`,
          success: true,
          message: `Added edge: ${fromNode.label} → ${toNode.label}`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ],
    });
    return true;
  },

  // Remove an edge
  removeEdge: (edgeId) => {
    const { edges, nodes, history } = get();
    const edge = edges.find(e => e.id === edgeId);
    
    if (!edge) return false;

    const fromNode = nodes.find(n => n.id === edge.from);
    const toNode = nodes.find(n => n.id === edge.to);

    set({
      edges: edges.filter(e => e.id !== edgeId),
      history: [
        ...history,
        {
          id: Date.now(),
          operation: 'Remove Edge',
          value: `${fromNode?.label} → ${toNode?.label}`,
          success: true,
          message: `Removed edge`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ],
    });
    return true;
  },

  // BFS Traversal
  bfs: (startNodeId) => {
    const { nodes, edges, isDirected, history } = get();
    
    const startNode = nodes.find(n => n.id === startNodeId);
    if (!startNode) return;

    const visited = new Set();
    const queue = [startNodeId];
    const path = [];
    const edgePath = [];

    visited.add(startNodeId);

    while (queue.length > 0) {
      const currentId = queue.shift();
      path.push(currentId);

      // Find all neighbors
      const neighbors = edges
        .filter(e => {
          if (isDirected) {
            return e.from === currentId;
          } else {
            return e.from === currentId || e.to === currentId;
          }
        })
        .map(e => {
          const neighborId = e.from === currentId ? e.to : e.from;
          return { neighborId, edgeId: e.id };
        });

      for (const { neighborId, edgeId } of neighbors) {
        if (!visited.has(neighborId)) {
          visited.add(neighborId);
          queue.push(neighborId);
          edgePath.push(edgeId);
        }
      }
    }

    set({
      traversalPath: path,
      highlightedEdges: edgePath,
      currentTraversalIndex: 0,
      isTraversing: true,
      highlightedNodes: [],
      history: [
        ...history,
        {
          id: Date.now(),
          operation: 'BFS',
          value: path.map(id => nodes.find(n => n.id === id)?.label).join(' → '),
          success: true,
          message: `BFS from ${startNode.label}`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ],
    });

    get().animateTraversal();
  },

  // DFS Traversal
  dfs: (startNodeId) => {
    const { nodes, edges, isDirected, history } = get();
    
    const startNode = nodes.find(n => n.id === startNodeId);
    if (!startNode) return;

    const visited = new Set();
    const path = [];
    const edgePath = [];

    const dfsRecursive = (currentId) => {
      visited.add(currentId);
      path.push(currentId);

      const neighbors = edges
        .filter(e => {
          if (isDirected) {
            return e.from === currentId;
          } else {
            return e.from === currentId || e.to === currentId;
          }
        })
        .map(e => {
          const neighborId = e.from === currentId ? e.to : e.from;
          return { neighborId, edgeId: e.id };
        });

      for (const { neighborId, edgeId } of neighbors) {
        if (!visited.has(neighborId)) {
          edgePath.push(edgeId);
          dfsRecursive(neighborId);
        }
      }
    };

    dfsRecursive(startNodeId);

    set({
      traversalPath: path,
      highlightedEdges: edgePath,
      currentTraversalIndex: 0,
      isTraversing: true,
      highlightedNodes: [],
      history: [
        ...history,
        {
          id: Date.now(),
          operation: 'DFS',
          value: path.map(id => nodes.find(n => n.id === id)?.label).join(' → '),
          success: true,
          message: `DFS from ${startNode.label}`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ],
    });

    get().animateTraversal();
  },

  // Animate traversal path node by node
  animateTraversal: () => {
    const { traversalPath, currentTraversalIndex } = get();
    
    if (currentTraversalIndex >= traversalPath.length) {
      setTimeout(() => {
        set({
          isTraversing: false,
          highlightedNodes: [],
          highlightedEdges: [],
          traversalPath: [],
          currentTraversalIndex: -1,
        });
      }, 1000);
      return;
    }

    const currentNodeId = traversalPath[currentTraversalIndex];
    const { highlightedNodes } = get();
    
    set({
      highlightedNodes: [...highlightedNodes, currentNodeId],
      currentTraversalIndex: currentTraversalIndex + 1,
    });

    setTimeout(() => {
      get().animateTraversal();
    }, 700);
  },

  // Toggle directed/undirected
  toggleDirected: () => {
    const { isDirected } = get();
    set({ isDirected: !isDirected });
  },

  // Toggle weighted/unweighted
  toggleWeighted: () => {
    const { isWeighted } = get();
    set({ isWeighted: !isWeighted });
  },

  // Update node position
  updateNodePosition: (nodeId, x, y) => {
    const { nodes } = get();
    set({
      nodes: nodes.map(n => n.id === nodeId ? { ...n, x, y } : n),
    });
  },

  // Clear graph
  clear: () => {
    const { history } = get();
    set({
      nodes: [],
      edges: [],
      highlightedNodes: [],
      highlightedEdges: [],
      traversalPath: [],
      currentTraversalIndex: -1,
      isTraversing: false,
      history: [
        ...history,
        {
          id: Date.now(),
          operation: 'Clear',
          success: true,
          message: 'Graph cleared',
          timestamp: new Date().toLocaleTimeString(),
        },
      ],
    });
  },

  // Clear history
  clearHistory: () => set({ history: [] }),

  // Select node for edge creation
  selectedNode: null,
  selectNode: (nodeId) => set({ selectedNode: nodeId }),
  clearSelection: () => set({ selectedNode: null }),
}));

export default useGraphStore;
