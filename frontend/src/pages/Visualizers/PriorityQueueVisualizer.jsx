import VisualizerLayout from '../../components/visualizer/Shared/VisualizerLayout';
import PriorityQueueVisualization from '../../components/visualizer/PriorityQueue/PriorityQueueVisualization';
import PriorityQueueControls from '../../components/visualizer/PriorityQueue/PriorityQueueControls';
import CodePanel from '../../components/visualizer/Shared/CodePanel';
import OperationHistory from '../../components/visualizer/Shared/OperationHistory';
import usePriorityQueueStore from '../../store/priorityQueueStore';

const codeExamples = {
  python: `# Priority Queue (Min Heap) Implementation
import heapq

class PriorityQueue:
    def __init__(self):
        self.heap = []
    
    def insert(self, value, priority):
        """Insert element with priority"""
        heapq.heappush(self.heap, (priority, value))
    
    def extract_min(self):
        """Remove and return element with min priority"""
        if self.heap:
            return heapq.heappop(self.heap)
        return None
    
    def peek(self):
        """Return min element without removing"""
        return self.heap[0] if self.heap else None
    
    def is_empty(self):
        return len(self.heap) == 0

# Usage
pq = PriorityQueue()
pq.insert("Task A", 3)
pq.insert("Task B", 1)  # Higher priority (lower number)
pq.insert("Task C", 2)

print(pq.extract_min())  # (1, 'Task B')
print(pq.peek())         # (2, 'Task C')`,

  javascript: `// Priority Queue (Min Heap) Implementation
class PriorityQueue {
    constructor() {
        this.heap = [];
    }
    
    insert(value, priority) {
        this.heap.push({ value, priority });
        this.heapifyUp(this.heap.length - 1);
    }
    
    extractMin() {
        if (this.heap.length === 0) return null;
        
        const min = this.heap[0];
        const last = this.heap.pop();
        
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.heapifyDown(0);
        }
        
        return min;
    }
    
    heapifyUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index].priority < this.heap[parentIndex].priority) {
                [this.heap[index], this.heap[parentIndex]] = 
                    [this.heap[parentIndex], this.heap[index]];
                index = parentIndex;
            } else break;
        }
    }
    
    heapifyDown(index) {
        while (true) {
            let minIndex = index;
            const left = 2 * index + 1;
            const right = 2 * index + 2;
            
            if (left < this.heap.length && 
                this.heap[left].priority < this.heap[minIndex].priority) {
                minIndex = left;
            }
            
            if (right < this.heap.length && 
                this.heap[right].priority < this.heap[minIndex].priority) {
                minIndex = right;
            }
            
            if (minIndex !== index) {
                [this.heap[index], this.heap[minIndex]] = 
                    [this.heap[minIndex], this.heap[index]];
                index = minIndex;
            } else break;
        }
    }
}

// Usage
const pq = new PriorityQueue();
pq.insert("Task A", 3);
pq.insert("Task B", 1);
console.log(pq.extractMin()); // { value: 'Task B', priority: 1 }`,

  java: `// Priority Queue (Min Heap) Implementation
import java.util.PriorityQueue;
import java.util.Comparator;

class Task {
    String value;
    int priority;
    
    Task(String value, int priority) {
        this.value = value;
        this.priority = priority;
    }
}

public class PriorityQueueExample {
    public static void main(String[] args) {
        // Min Heap based on priority
        PriorityQueue<Task> pq = new PriorityQueue<>(
            Comparator.comparingInt(t -> t.priority)
        );
        
        pq.offer(new Task("Task A", 3));
        pq.offer(new Task("Task B", 1));
        pq.offer(new Task("Task C", 2));
        
        // Extract tasks in priority order
        while (!pq.isEmpty()) {
            Task task = pq.poll();
            System.out.println(task.value + ": " + task.priority);
        }
    }
}

// Time Complexity:
// Insert: O(log n)
// Extract Min/Max: O(log n)
// Peek: O(1)`,

  cpp: `// Priority Queue (Min Heap) Implementation
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

struct Task {
    string value;
    int priority;
    
    // For min heap (lower priority number = higher priority)
    bool operator>(const Task& other) const {
        return priority > other.priority;
    }
};

int main() {
    // Min Heap
    priority_queue<Task, vector<Task>, greater<Task>> pq;
    
    pq.push({"Task A", 3});
    pq.push({"Task B", 1});
    pq.push({"Task C", 2});
    
    // Extract tasks in priority order
    while (!pq.empty()) {
        Task task = pq.top();
        pq.pop();
        cout << task.value << ": " << task.priority << endl;
    }
    
    return 0;
}

// Time Complexity:
// Insert (push): O(log n)
// Extract (pop): O(log n)
// Peek (top): O(1)
// Space Complexity: O(n)`
};

export default function PriorityQueueVisualizer() {
  const { operations, clearHistory } = usePriorityQueueStore();

  return (
    <VisualizerLayout
      title="Priority Queue Visualizer"
      controlPanel={<PriorityQueueControls />}
      codePanel={<CodePanel examples={codeExamples} />}
      operationHistory={
        <OperationHistory 
          operations={operations} 
          onClear={clearHistory}
        />
      }
    >
      <PriorityQueueVisualization />
    </VisualizerLayout>
  );
}
