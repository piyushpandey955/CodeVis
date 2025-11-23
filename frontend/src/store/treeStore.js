import { create } from 'zustand';

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.id = Math.random().toString(36).substr(2, 9);
  }
}

const useTreeStore = create((set, get) => ({
  root: null,
  highlightedNodes: [],
  traversalPath: [], // Array of node IDs in traversal order
  currentTraversalIndex: -1, // Current position in traversal animation
  isTraversing: false, // Whether traversal animation is active
  history: [],
  maxSize: 15,
  
  // Helper function to count nodes
  countNodes: (node) => {
    if (!node) return 0;
    return 1 + get().countNodes(node.left) + get().countNodes(node.right);
  },

  // Insert a node (BST insertion)
  insert: (value) => {
    const { root, maxSize, countNodes, history } = get();
    
    if (countNodes(root) >= maxSize) {
      set({
        history: [
          ...history,
          {
            id: Date.now(),
            operation: 'Insert',
            value: value,
            success: false,
            message: `Tree is full (max ${maxSize} nodes)`,
            timestamp: new Date().toLocaleTimeString(),
          },
        ],
      });
      return false;
    }

    const newNode = new TreeNode(value);
    
    if (!root) {
      set({
        root: newNode,
        history: [
          ...history,
          {
            id: Date.now(),
            operation: 'Insert',
            value: value,
            success: true,
            message: `Inserted ${value} as root`,
            timestamp: new Date().toLocaleTimeString(),
          },
        ],
      });
      return true;
    }

    const insertNode = (node, newNode) => {
      if (newNode.value < node.value) {
        if (!node.left) {
          node.left = newNode;
          return true;
        }
        return insertNode(node.left, newNode);
      } else {
        if (!node.right) {
          node.right = newNode;
          return true;
        }
        return insertNode(node.right, newNode);
      }
    };

    insertNode(root, newNode);
    
    set({
      root: { ...root },
      history: [
        ...history,
        {
          id: Date.now(),
          operation: 'Insert',
          value: value,
          success: true,
          message: `Inserted ${value}`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ],
    });
    return true;
  },

  // Search for a node
  search: (value) => {
    const { root, history } = get();
    const path = [];

    const searchNode = (node) => {
      if (!node) return false;
      path.push(node.id);
      
      if (node.value === value) return true;
      if (value < node.value) return searchNode(node.left);
      return searchNode(node.right);
    };

    const found = searchNode(root);
    
    set({
      highlightedNodes: path,
      history: [
        ...history,
        {
          id: Date.now(),
          operation: 'Search',
          value: value,
          success: found,
          message: found ? `Found ${value}` : `${value} not found`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ],
    });

    setTimeout(() => {
      set({ highlightedNodes: [] });
    }, 2000);

    return found;
  },

  // Delete a node
  delete: (value) => {
    const { root, history } = get();

    const findMin = (node) => {
      while (node.left) node = node.left;
      return node;
    };

    const deleteNode = (node, value) => {
      if (!node) return null;

      if (value < node.value) {
        node.left = deleteNode(node.left, value);
        return node;
      } else if (value > node.value) {
        node.right = deleteNode(node.right, value);
        return node;
      }

      // Node to delete found
      // Case 1: No children
      if (!node.left && !node.right) return null;

      // Case 2: One child
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      // Case 3: Two children
      const minRight = findMin(node.right);
      node.value = minRight.value;
      node.right = deleteNode(node.right, minRight.value);
      return node;
    };

    const newRoot = deleteNode(root, value);
    
    set({
      root: newRoot,
      history: [
        ...history,
        {
          id: Date.now(),
          operation: 'Delete',
          value: value,
          success: true,
          message: `Deleted ${value}`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ],
    });
  },

  // Find minimum value
  findMin: () => {
    const { root, history } = get();
    if (!root) return null;

    let current = root;
    const path = [];
    
    while (current.left) {
      path.push(current.id);
      current = current.left;
    }
    path.push(current.id);

    set({
      highlightedNodes: path,
      history: [
        ...history,
        {
          id: Date.now(),
          operation: 'Find Min',
          value: current.value,
          success: true,
          message: `Minimum value: ${current.value}`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ],
    });

    setTimeout(() => {
      set({ highlightedNodes: [] });
    }, 2000);

    return current.value;
  },

  // Find maximum value
  findMax: () => {
    const { root, history } = get();
    if (!root) return null;

    let current = root;
    const path = [];
    
    while (current.right) {
      path.push(current.id);
      current = current.right;
    }
    path.push(current.id);

    set({
      highlightedNodes: path,
      history: [
        ...history,
        {
          id: Date.now(),
          operation: 'Find Max',
          value: current.value,
          success: true,
          message: `Maximum value: ${current.value}`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ],
    });

    setTimeout(() => {
      set({ highlightedNodes: [] });
    }, 2000);

    return current.value;
  },

  // Inorder traversal
  inorderTraversal: () => {
    const { root, history } = get();
    const result = [];
    const path = [];

    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      result.push(node.value);
      path.push(node.id);
      traverse(node.right);
    };

    traverse(root);

    set({
      traversalPath: path,
      currentTraversalIndex: 0,
      isTraversing: true,
      highlightedNodes: [],
      history: [
        ...history,
        {
          id: Date.now(),
          operation: 'Inorder',
          value: result.join(', '),
          success: true,
          message: `Inorder: [${result.join(', ')}]`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ],
    });

    // Animate through the path
    get().animateTraversal();

    return result;
  },

  // Preorder traversal
  preorderTraversal: () => {
    const { root, history } = get();
    const result = [];
    const path = [];

    const traverse = (node) => {
      if (!node) return;
      result.push(node.value);
      path.push(node.id);
      traverse(node.left);
      traverse(node.right);
    };

    traverse(root);

    set({
      traversalPath: path,
      currentTraversalIndex: 0,
      isTraversing: true,
      highlightedNodes: [],
      history: [
        ...history,
        {
          id: Date.now(),
          operation: 'Preorder',
          value: result.join(', '),
          success: true,
          message: `Preorder: [${result.join(', ')}]`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ],
    });

    // Animate through the path
    get().animateTraversal();

    return result;
  },

  // Postorder traversal
  postorderTraversal: () => {
    const { root, history } = get();
    const result = [];
    const path = [];

    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      result.push(node.value);
      path.push(node.id);
    };

    traverse(root);

    set({
      traversalPath: path,
      currentTraversalIndex: 0,
      isTraversing: true,
      highlightedNodes: [],
      history: [
        ...history,
        {
          id: Date.now(),
          operation: 'Postorder',
          value: result.join(', '),
          success: true,
          message: `Postorder: [${result.join(', ')}]`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ],
    });

    // Animate through the path
    get().animateTraversal();

    return result;
  },

  // Get tree height
  getHeight: () => {
    const { root, history } = get();

    const calculateHeight = (node) => {
      if (!node) return 0;
      return 1 + Math.max(calculateHeight(node.left), calculateHeight(node.right));
    };

    const height = calculateHeight(root);

    set({
      history: [
        ...history,
        {
          id: Date.now(),
          operation: 'Get Height',
          value: height,
          success: true,
          message: `Tree height: ${height}`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ],
    });

    return height;
  },

  // Animate traversal path node by node
  animateTraversal: () => {
    const { traversalPath, currentTraversalIndex } = get();
    
    if (currentTraversalIndex >= traversalPath.length) {
      // Animation complete
      setTimeout(() => {
        set({
          isTraversing: false,
          highlightedNodes: [],
          traversalPath: [],
          currentTraversalIndex: -1,
        });
      }, 800);
      return;
    }

    // Add current node to highlighted nodes
    const currentNodeId = traversalPath[currentTraversalIndex];
    const { highlightedNodes } = get();
    
    set({
      highlightedNodes: [...highlightedNodes, currentNodeId],
      currentTraversalIndex: currentTraversalIndex + 1,
    });

    // Continue to next node after delay
    setTimeout(() => {
      get().animateTraversal();
    }, 600);
  },

  // Clear the tree
  clear: () => {
    const { history } = get();
    set({
      root: null,
      highlightedNodes: [],
      history: [
        ...history,
        {
          id: Date.now(),
          operation: 'Clear',
          success: true,
          message: 'Tree cleared',
          timestamp: new Date().toLocaleTimeString(),
        },
      ],
    });
  },

  // Clear history
  clearHistory: () => set({ history: [] }),

  // Clear highlights
  clearHighlights: () => set({ highlightedNodes: [] }),
}));

export default useTreeStore;
