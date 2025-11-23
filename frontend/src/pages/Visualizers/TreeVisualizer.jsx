import React from 'react';
import VisualizerLayout from '../../components/visualizer/Shared/VisualizerLayout';
import ControlPanel from '../../components/visualizer/Shared/ControlPanel';
import CodePanel from '../../components/visualizer/Shared/CodePanel';
import OperationHistory from '../../components/visualizer/Shared/OperationHistory';
import TreeVisualization from '../../components/visualizer/Tree/TreeVisualization';
import TreeControls from '../../components/visualizer/Tree/TreeControls';
import useTreeStore from '../../store/treeStore';

const TreeVisualizer = () => {
  const { history, clearHistory } = useTreeStore();

  const codeExamples = {
    python: `# Binary Search Tree Implementation
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BinarySearchTree:
    def __init__(self):
        self.root = None
    
    def insert(self, value):
        """Insert a value into BST"""
        if not self.root:
            self.root = TreeNode(value)
        else:
            self._insert_recursive(self.root, value)
    
    def _insert_recursive(self, node, value):
        if value < node.value:
            if node.left is None:
                node.left = TreeNode(value)
            else:
                self._insert_recursive(node.left, value)
        else:
            if node.right is None:
                node.right = TreeNode(value)
            else:
                self._insert_recursive(node.right, value)
    
    def search(self, value):
        """Search for a value in BST"""
        return self._search_recursive(self.root, value)
    
    def _search_recursive(self, node, value):
        if node is None:
            return False
        if node.value == value:
            return True
        elif value < node.value:
            return self._search_recursive(node.left, value)
        else:
            return self._search_recursive(node.right, value)
    
    def inorder_traversal(self):
        """Inorder: Left -> Root -> Right"""
        result = []
        self._inorder_recursive(self.root, result)
        return result
    
    def _inorder_recursive(self, node, result):
        if node:
            self._inorder_recursive(node.left, result)
            result.append(node.value)
            self._inorder_recursive(node.right, result)

# Time Complexities:
# Insert: O(log n) average, O(n) worst
# Search: O(log n) average, O(n) worst
# Delete: O(log n) average, O(n) worst`,

    javascript: `// Binary Search Tree Implementation
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    
    // Insert a value into BST
    insert(value) {
        const newNode = new TreeNode(value);
        
        if (!this.root) {
            this.root = newNode;
            return;
        }
        
        this._insertRecursive(this.root, newNode);
    }
    
    _insertRecursive(node, newNode) {
        if (newNode.value < node.value) {
            if (!node.left) {
                node.left = newNode;
            } else {
                this._insertRecursive(node.left, newNode);
            }
        } else {
            if (!node.right) {
                node.right = newNode;
            } else {
                this._insertRecursive(node.right, newNode);
            }
        }
    }
    
    // Search for a value in BST
    search(value) {
        return this._searchRecursive(this.root, value);
    }
    
    _searchRecursive(node, value) {
        if (!node) return false;
        if (node.value === value) return true;
        
        if (value < node.value) {
            return this._searchRecursive(node.left, value);
        }
        return this._searchRecursive(node.right, value);
    }
    
    // Inorder Traversal: Left -> Root -> Right
    inorderTraversal() {
        const result = [];
        this._inorderRecursive(this.root, result);
        return result;
    }
    
    _inorderRecursive(node, result) {
        if (node) {
            this._inorderRecursive(node.left, result);
            result.push(node.value);
            this._inorderRecursive(node.right, result);
        }
    }
}

// Time Complexities:
// Insert: O(log n) average, O(n) worst
// Search: O(log n) average, O(n) worst
// Delete: O(log n) average, O(n) worst`,

    java: `// Binary Search Tree Implementation
class TreeNode {
    int value;
    TreeNode left;
    TreeNode right;
    
    TreeNode(int value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    private TreeNode root;
    
    public BinarySearchTree() {
        this.root = null;
    }
    
    // Insert a value into BST
    public void insert(int value) {
        root = insertRecursive(root, value);
    }
    
    private TreeNode insertRecursive(TreeNode node, int value) {
        if (node == null) {
            return new TreeNode(value);
        }
        
        if (value < node.value) {
            node.left = insertRecursive(node.left, value);
        } else {
            node.right = insertRecursive(node.right, value);
        }
        
        return node;
    }
    
    // Search for a value in BST
    public boolean search(int value) {
        return searchRecursive(root, value);
    }
    
    private boolean searchRecursive(TreeNode node, int value) {
        if (node == null) {
            return false;
        }
        
        if (node.value == value) {
            return true;
        }
        
        if (value < node.value) {
            return searchRecursive(node.left, value);
        }
        return searchRecursive(node.right, value);
    }
    
    // Inorder Traversal: Left -> Root -> Right
    public void inorderTraversal() {
        inorderRecursive(root);
    }
    
    private void inorderRecursive(TreeNode node) {
        if (node != null) {
            inorderRecursive(node.left);
            System.out.print(node.value + " ");
            inorderRecursive(node.right);
        }
    }
}

// Time Complexities:
// Insert: O(log n) average, O(n) worst
// Search: O(log n) average, O(n) worst
// Delete: O(log n) average, O(n) worst`,

    cpp: `// Binary Search Tree Implementation
#include <iostream>
using namespace std;

class TreeNode {
public:
    int value;
    TreeNode* left;
    TreeNode* right;
    
    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

class BinarySearchTree {
private:
    TreeNode* root;
    
    TreeNode* insertRecursive(TreeNode* node, int value) {
        if (node == nullptr) {
            return new TreeNode(value);
        }
        
        if (value < node->value) {
            node->left = insertRecursive(node->left, value);
        } else {
            node->right = insertRecursive(node->right, value);
        }
        
        return node;
    }
    
    bool searchRecursive(TreeNode* node, int value) {
        if (node == nullptr) {
            return false;
        }
        
        if (node->value == value) {
            return true;
        }
        
        if (value < node->value) {
            return searchRecursive(node->left, value);
        }
        return searchRecursive(node->right, value);
    }
    
    void inorderRecursive(TreeNode* node) {
        if (node != nullptr) {
            inorderRecursive(node->left);
            cout << node->value << " ";
            inorderRecursive(node->right);
        }
    }
    
public:
    BinarySearchTree() : root(nullptr) {}
    
    // Insert a value into BST
    void insert(int value) {
        root = insertRecursive(root, value);
    }
    
    // Search for a value in BST
    bool search(int value) {
        return searchRecursive(root, value);
    }
    
    // Inorder Traversal: Left -> Root -> Right
    void inorderTraversal() {
        inorderRecursive(root);
        cout << endl;
    }
};

// Time Complexities:
// Insert: O(log n) average, O(n) worst
// Search: O(log n) average, O(n) worst
// Delete: O(log n) average, O(n) worst`,
  };

  return (
    <VisualizerLayout
      title="Binary Search Tree Visualizer"
      controlPanel={<TreeControls />}
      codePanel={
        <CodePanel
          title="BST Implementation"
          codeExamples={codeExamples}
        />
      }
      operationHistory={
        <OperationHistory 
          operations={history}
          onClear={clearHistory}
        />
      }
    >
      <TreeVisualization />
    </VisualizerLayout>
  );
};

export default TreeVisualizer;
