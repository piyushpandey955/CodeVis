import React from 'react';
import VisualizerLayout from '../../components/visualizer/Shared/VisualizerLayout';
import StackVisualization from '../../components/visualizer/Stack/StackVisualization';
import StackControls from '../../components/visualizer/Stack/StackControls';
import CodePanel from '../../components/visualizer/Shared/CodePanel';
import OperationHistory from '../../components/visualizer/Shared/OperationHistory';
import useStackStore from '../../store/stackStore';

const stackCodeExamples = {
  python: `# Stack Implementation in Python
class Stack:
    def __init__(self, max_size=10):
        """Initialize stack with maximum size"""
        self.items = []
        self.max_size = max_size
    
    def push(self, value):
        """Add element to top of stack"""
        if self.is_full():
            raise Exception("Stack Overflow")
        self.items.append(value)
    
    def pop(self):
        """Remove and return top element"""
        if self.is_empty():
            raise Exception("Stack Underflow")
        return self.items.pop()
    
    def peek(self):
        """Return top element without removing"""
        if self.is_empty():
            return None
        return self.items[-1]
    
    def is_empty(self):
        """Check if stack is empty"""
        return len(self.items) == 0
    
    def is_full(self):
        """Check if stack is full"""
        return len(self.items) >= self.max_size
    
    def size(self):
        """Return number of elements"""
        return len(self.items)
    
    def clear(self):
        """Remove all elements"""
        self.items = []`,

  javascript: `// Stack Implementation in JavaScript
class Stack {
    constructor(maxSize = 10) {
        // Initialize stack with maximum size
        this.items = [];
        this.maxSize = maxSize;
    }
    
    push(value) {
        // Add element to top of stack
        if (this.isFull()) {
            throw new Error("Stack Overflow");
        }
        this.items.push(value);
    }
    
    pop() {
        // Remove and return top element
        if (this.isEmpty()) {
            throw new Error("Stack Underflow");
        }
        return this.items.pop();
    }
    
    peek() {
        // Return top element without removing
        if (this.isEmpty()) {
            return null;
        }
        return this.items[this.items.length - 1];
    }
    
    isEmpty() {
        // Check if stack is empty
        return this.items.length === 0;
    }
    
    isFull() {
        // Check if stack is full
        return this.items.length >= this.maxSize;
    }
    
    size() {
        // Return number of elements
        return this.items.length;
    }
    
    clear() {
        // Remove all elements
        this.items = [];
    }
}`,

  java: `// Stack Implementation in Java
import java.util.ArrayList;
import java.util.List;

public class Stack {
    private List<Integer> items;
    private int maxSize;
    
    public Stack(int maxSize) {
        // Initialize stack with maximum size
        this.items = new ArrayList<>();
        this.maxSize = maxSize;
    }
    
    public void push(int value) {
        // Add element to top of stack
        if (isFull()) {
            throw new RuntimeException("Stack Overflow");
        }
        items.add(value);
    }
    
    public int pop() {
        // Remove and return top element
        if (isEmpty()) {
            throw new RuntimeException("Stack Underflow");
        }
        return items.remove(items.size() - 1);
    }
    
    public int peek() {
        // Return top element without removing
        if (isEmpty()) {
            throw new RuntimeException("Stack is empty");
        }
        return items.get(items.size() - 1);
    }
    
    public boolean isEmpty() {
        // Check if stack is empty
        return items.isEmpty();
    }
    
    public boolean isFull() {
        // Check if stack is full
        return items.size() >= maxSize;
    }
    
    public int size() {
        // Return number of elements
        return items.size();
    }
    
    public void clear() {
        // Remove all elements
        items.clear();
    }
}`,

  cpp: `// Stack Implementation in C++
#include <vector>
#include <stdexcept>
using namespace std;

class Stack {
private:
    vector<int> items;
    int maxSize;
    
public:
    Stack(int maxSize = 10) {
        // Initialize stack with maximum size
        this->maxSize = maxSize;
    }
    
    void push(int value) {
        // Add element to top of stack
        if (isFull()) {
            throw overflow_error("Stack Overflow");
        }
        items.push_back(value);
    }
    
    int pop() {
        // Remove and return top element
        if (isEmpty()) {
            throw underflow_error("Stack Underflow");
        }
        int value = items.back();
        items.pop_back();
        return value;
    }
    
    int peek() {
        // Return top element without removing
        if (isEmpty()) {
            throw runtime_error("Stack is empty");
        }
        return items.back();
    }
    
    bool isEmpty() {
        // Check if stack is empty
        return items.empty();
    }
    
    bool isFull() {
        // Check if stack is full
        return items.size() >= maxSize;
    }
    
    int size() {
        // Return number of elements
        return items.size();
    }
    
    void clear() {
        // Remove all elements
        items.clear();
    }
};`
};

const stackComplexity = {
  time: 'O(1) for push, pop, peek',
  space: 'O(n) where n is number of elements'
};

const StackVisualizer = () => {
  const { history, clearHistory } = useStackStore();

  return (
    <VisualizerLayout
      title="Stack (LIFO)"
      controlPanel={<StackControls />}
      codePanel={
        <CodePanel 
          codeExamples={stackCodeExamples}
          complexity={stackComplexity}
        />
      }
      operationHistory={
        <OperationHistory 
          operations={history}
          onClear={clearHistory}
        />
      }
    >
      <StackVisualization />
    </VisualizerLayout>
  );
};

export default StackVisualizer;
