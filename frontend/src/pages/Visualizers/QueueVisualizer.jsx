import React from 'react';
import VisualizerLayout from '../../components/visualizer/Shared/VisualizerLayout';
import QueueVisualization from '../../components/visualizer/Queue/QueueVisualization';
import QueueControls from '../../components/visualizer/Queue/QueueControls';
import CodePanel from '../../components/visualizer/Shared/CodePanel';
import OperationHistory from '../../components/visualizer/Shared/OperationHistory';
import useQueueStore from '../../store/queueStore';

const queueCodeExamples = {
  python: `# Queue Implementation in Python
class Queue:
    def __init__(self, max_size=10):
        """Initialize queue with maximum size"""
        self.items = []
        self.max_size = max_size
    
    def enqueue(self, value):
        """Add element to rear of queue"""
        if self.is_full():
            raise Exception("Queue Overflow")
        self.items.append(value)
    
    def dequeue(self):
        """Remove and return front element"""
        if self.is_empty():
            raise Exception("Queue Underflow")
        return self.items.pop(0)
    
    def peek(self):
        """Return front element without removing"""
        if self.is_empty():
            return None
        return self.items[0]
    
    def is_empty(self):
        """Check if queue is empty"""
        return len(self.items) == 0
    
    def is_full(self):
        """Check if queue is full"""
        return len(self.items) >= self.max_size
    
    def size(self):
        """Return number of elements"""
        return len(self.items)
    
    def clear(self):
        """Remove all elements"""
        self.items = []`,

  javascript: `// Queue Implementation in JavaScript
class Queue {
    constructor(maxSize = 10) {
        // Initialize queue with maximum size
        this.items = [];
        this.maxSize = maxSize;
    }
    
    enqueue(value) {
        // Add element to rear of queue
        if (this.isFull()) {
            throw new Error("Queue Overflow");
        }
        this.items.push(value);
    }
    
    dequeue() {
        // Remove and return front element
        if (this.isEmpty()) {
            throw new Error("Queue Underflow");
        }
        return this.items.shift();
    }
    
    peek() {
        // Return front element without removing
        if (this.isEmpty()) {
            return null;
        }
        return this.items[0];
    }
    
    isEmpty() {
        // Check if queue is empty
        return this.items.length === 0;
    }
    
    isFull() {
        // Check if queue is full
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

  java: `// Queue Implementation in Java
import java.util.LinkedList;

public class Queue {
    private LinkedList<Integer> items;
    private int maxSize;
    
    public Queue(int maxSize) {
        // Initialize queue with maximum size
        this.items = new LinkedList<>();
        this.maxSize = maxSize;
    }
    
    public void enqueue(int value) {
        // Add element to rear of queue
        if (isFull()) {
            throw new RuntimeException("Queue Overflow");
        }
        items.addLast(value);
    }
    
    public int dequeue() {
        // Remove and return front element
        if (isEmpty()) {
            throw new RuntimeException("Queue Underflow");
        }
        return items.removeFirst();
    }
    
    public int peek() {
        // Return front element without removing
        if (isEmpty()) {
            throw new RuntimeException("Queue is empty");
        }
        return items.getFirst();
    }
    
    public boolean isEmpty() {
        // Check if queue is empty
        return items.isEmpty();
    }
    
    public boolean isFull() {
        // Check if queue is full
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

  cpp: `// Queue Implementation in C++
#include <deque>
#include <stdexcept>
using namespace std;

class Queue {
private:
    deque<int> items;
    int maxSize;
    
public:
    Queue(int maxSize = 10) {
        // Initialize queue with maximum size
        this->maxSize = maxSize;
    }
    
    void enqueue(int value) {
        // Add element to rear of queue
        if (isFull()) {
            throw overflow_error("Queue Overflow");
        }
        items.push_back(value);
    }
    
    int dequeue() {
        // Remove and return front element
        if (isEmpty()) {
            throw underflow_error("Queue Underflow");
        }
        int value = items.front();
        items.pop_front();
        return value;
    }
    
    int peek() {
        // Return front element without removing
        if (isEmpty()) {
            throw runtime_error("Queue is empty");
        }
        return items.front();
    }
    
    bool isEmpty() {
        // Check if queue is empty
        return items.empty();
    }
    
    bool isFull() {
        // Check if queue is full
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

const queueComplexity = {
  time: 'O(1) for enqueue, dequeue, peek',
  space: 'O(n) where n is number of elements'
};

const QueueVisualizer = () => {
  const { history, clearHistory } = useQueueStore();

  return (
    <VisualizerLayout
      title="Queue (FIFO)"
      controlPanel={<QueueControls />}
      codePanel={
        <CodePanel 
          codeExamples={queueCodeExamples}
          complexity={queueComplexity}
        />
      }
      operationHistory={
        <OperationHistory 
          operations={history}
          onClear={clearHistory}
        />
      }
    >
      <QueueVisualization />
    </VisualizerLayout>
  );
};

export default QueueVisualizer;
