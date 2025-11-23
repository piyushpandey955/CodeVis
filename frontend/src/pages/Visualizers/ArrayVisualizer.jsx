import React from 'react';
import VisualizerLayout from '../../components/visualizer/Shared/VisualizerLayout';
import ControlPanel from '../../components/visualizer/Shared/ControlPanel';
import CodePanel from '../../components/visualizer/Shared/CodePanel';
import OperationHistory from '../../components/visualizer/Shared/OperationHistory';
import ArrayVisualization from '../../components/visualizer/Array/ArrayVisualization';
import ArrayControls from '../../components/visualizer/Array/ArrayControls';
import useArrayStore from '../../store/arrayStore';

const arrayCodeExamples = {
  python: `# Array Operations in Python
class Array:
    def __init__(self):
        self.arr = []
    
    def insert(self, index, value):
        """Insert element at given index"""
        self.arr.insert(index, value)
        return self.arr
    
    def delete(self, index):
        """Delete element at given index"""
        if 0 <= index < len(self.arr):
            del self.arr[index]
        return self.arr
    
    def search(self, value):
        """Search for a value"""
        try:
            return self.arr.index(value)
        except ValueError:
            return -1
    
    def update(self, index, value):
        """Update element at index"""
        if 0 <= index < len(self.arr):
            self.arr[index] = value
        return self.arr
    
    def reverse(self):
        """Reverse the array"""
        self.arr.reverse()
        return self.arr`,
        
  javascript: `// Array Operations in JavaScript
class Array {
    constructor() {
        this.arr = [];
    }
    
    insert(index, value) {
        // Insert element at given index
        this.arr.splice(index, 0, value);
        return this.arr;
    }
    
    delete(index) {
        // Delete element at given index
        if (index >= 0 && index < this.arr.length) {
            this.arr.splice(index, 1);
        }
        return this.arr;
    }
    
    search(value) {
        // Search for a value
        return this.arr.indexOf(value);
    }
    
    update(index, value) {
        // Update element at index
        if (index >= 0 && index < this.arr.length) {
            this.arr[index] = value;
        }
        return this.arr;
    }
    
    reverse() {
        // Reverse the array
        this.arr.reverse();
        return this.arr;
    }
}`,
    
  java: `// Array Operations in Java
public class Array {
    private List<Integer> arr;
    
    public Array() {
        this.arr = new ArrayList<>();
    }
    
    public void insert(int index, int value) {
        // Insert element at given index
        arr.add(index, value);
    }
    
    public void delete(int index) {
        // Delete element at given index
        if (index >= 0 && index < arr.size()) {
            arr.remove(index);
        }
    }
    
    public int search(int value) {
        // Search for a value
        return arr.indexOf(value);
    }
    
    public void update(int index, int value) {
        // Update element at index
        if (index >= 0 && index < arr.size()) {
            arr.set(index, value);
        }
    }
    
    public void reverse() {
        // Reverse the array
        Collections.reverse(arr);
    }
}`,
    
  cpp: `// Array Operations in C++
class Array {
private:
    vector<int> arr;
    
public:
    Array() {}
    
    void insert(int index, int value) {
        // Insert element at given index
        arr.insert(arr.begin() + index, value);
    }
    
    void deleteAt(int index) {
        // Delete element at given index
        if (index >= 0 && index < arr.size()) {
            arr.erase(arr.begin() + index);
        }
    }
    
    int search(int value) {
        // Search for a value
        auto it = find(arr.begin(), arr.end(), value);
        return (it != arr.end()) ? 
            distance(arr.begin(), it) : -1;
    }
    
    void update(int index, int value) {
        // Update element at index
        if (index >= 0 && index < arr.size()) {
            arr[index] = value;
        }
    }
    
    void reverse() {
        // Reverse the array
        std::reverse(arr.begin(), arr.end());
    }
};`
};

const arrayComplexity = {
  time: 'O(n) for insert/delete, O(n) for search',
  space: 'O(n)',
};

const ArrayVisualizer = () => {
  const { 
    isPlaying, 
    setIsPlaying, 
    speed, 
    setSpeed, 
    reset, 
    operations, 
    clearOperations 
  } = useArrayStore();

  return (
    <VisualizerLayout
      title="Array Visualizer"
      controlPanel={
        <ControlPanel
          isPlaying={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onReset={reset}
          speed={speed}
          onSpeedChange={setSpeed}
        >
          <ArrayControls />
        </ControlPanel>
      }
      codePanel={
        <CodePanel 
          codeExamples={arrayCodeExamples}
          complexity={arrayComplexity}
        />
      }
      operationHistory={
        <OperationHistory 
          operations={operations}
          onClear={clearOperations}
        />
      }
    >
      <ArrayVisualization />
    </VisualizerLayout>
  );
};

export default ArrayVisualizer;
