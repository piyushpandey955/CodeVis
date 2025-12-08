import VisualizerLayout from '../../components/visualizer/Shared/VisualizerLayout';
import HashSetVisualization from '../../components/visualizer/HashSet/HashSetVisualization';
import HashSetControls from '../../components/visualizer/HashSet/HashSetControls';
import CodePanel from '../../components/visualizer/Shared/CodePanel';
import OperationHistory from '../../components/visualizer/Shared/OperationHistory';
import useHashSetStore from '../../store/hashSetStore';

const codeExamples = {
  python: `# HashSet Implementation
class HashSet:
    def __init__(self, capacity=10):
        self.capacity = capacity
        self.buckets = [[] for _ in range(capacity)]
        self.size = 0
    
    def _hash(self, value):
        """Hash function to get bucket index"""
        hash_value = 0
        for char in str(value):
            hash_value = (hash_value * 31 + ord(char)) % self.capacity
        return hash_value
    
    def add(self, value):
        """Add value to set (no duplicates)"""
        index = self._hash(value)
        bucket = self.buckets[index]
        
        # Check if value already exists
        if value in bucket:
            return False
        
        bucket.append(value)
        self.size += 1
        return True
    
    def remove(self, value):
        """Remove value from set"""
        index = self._hash(value)
        bucket = self.buckets[index]
        
        if value in bucket:
            bucket.remove(value)
            self.size -= 1
            return True
        return False
    
    def contains(self, value):
        """Check if value exists"""
        index = self._hash(value)
        return value in self.buckets[index]
    
    def __len__(self):
        return self.size

# Usage
hash_set = HashSet()
hash_set.add("apple")
hash_set.add("banana")
hash_set.add("apple")  # Won't be added (duplicate)
print(hash_set.contains("apple"))  # True
print(len(hash_set))  # 2
hash_set.remove("apple")`,

  javascript: `// HashSet Implementation
class HashSet {
    constructor(capacity = 10) {
        this.capacity = capacity;
        this.buckets = Array(capacity).fill(null).map(() => []);
        this.size = 0;
    }
    
    hash(value) {
        let hash = 0;
        const str = String(value);
        for (let i = 0; i < str.length; i++) {
            hash = (hash * 31 + str.charCodeAt(i)) % this.capacity;
        }
        return Math.abs(hash);
    }
    
    add(value) {
        const index = this.hash(value);
        const bucket = this.buckets[index];
        
        // Check for duplicate
        if (bucket.includes(value)) {
            return false;
        }
        
        bucket.push(value);
        this.size++;
        return true;
    }
    
    remove(value) {
        const index = this.hash(value);
        const bucket = this.buckets[index];
        const valueIndex = bucket.indexOf(value);
        
        if (valueIndex !== -1) {
            bucket.splice(valueIndex, 1);
            this.size--;
            return true;
        }
        return false;
    }
    
    contains(value) {
        const index = this.hash(value);
        return this.buckets[index].includes(value);
    }
    
    clear() {
        this.buckets = Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    }
}

// Usage
const set = new HashSet();
set.add("apple");
set.add("banana");
set.add("apple"); // Returns false (duplicate)
console.log(set.contains("apple")); // true
console.log(set.size); // 2`,

  java: `// HashSet Implementation
import java.util.LinkedList;

class HashSet<T> {
    private LinkedList<T>[] buckets;
    private int capacity;
    private int size;
    
    @SuppressWarnings("unchecked")
    public HashSet(int capacity) {
        this.capacity = capacity;
        this.buckets = new LinkedList[capacity];
        for (int i = 0; i < capacity; i++) {
            buckets[i] = new LinkedList<>();
        }
        this.size = 0;
    }
    
    private int hash(T value) {
        return Math.abs(value.hashCode() % capacity);
    }
    
    public boolean add(T value) {
        int index = hash(value);
        LinkedList<T> bucket = buckets[index];
        
        // Check for duplicate
        if (bucket.contains(value)) {
            return false;
        }
        
        bucket.add(value);
        size++;
        return true;
    }
    
    public boolean remove(T value) {
        int index = hash(value);
        LinkedList<T> bucket = buckets[index];
        
        if (bucket.remove(value)) {
            size--;
            return true;
        }
        return false;
    }
    
    public boolean contains(T value) {
        int index = hash(value);
        return buckets[index].contains(value);
    }
    
    public int size() {
        return size;
    }
    
    public void clear() {
        for (LinkedList<T> bucket : buckets) {
            bucket.clear();
        }
        size = 0;
    }
}

// Time Complexity:
// Average: O(1) for add, remove, contains
// Worst: O(n) with many collisions
// Space: O(n + m) where m is capacity`,

  cpp: `// HashSet Implementation
#include <iostream>
#include <vector>
#include <list>
#include <algorithm>
using namespace std;

template<typename T>
class HashSet {
private:
    vector<list<T>> buckets;
    int capacity;
    int size;
    
    int hash(const T& value) {
        return abs(static_cast<int>(
            std::hash<T>{}(value)
        )) % capacity;
    }
    
public:
    HashSet(int cap = 10) : capacity(cap), size(0) {
        buckets.resize(capacity);
    }
    
    bool add(const T& value) {
        int index = hash(value);
        auto& bucket = buckets[index];
        
        // Check for duplicate
        if (find(bucket.begin(), bucket.end(), value) 
            != bucket.end()) {
            return false;
        }
        
        bucket.push_back(value);
        size++;
        return true;
    }
    
    bool remove(const T& value) {
        int index = hash(value);
        auto& bucket = buckets[index];
        
        auto it = find(bucket.begin(), bucket.end(), value);
        if (it != bucket.end()) {
            bucket.erase(it);
            size--;
            return true;
        }
        return false;
    }
    
    bool contains(const T& value) {
        int index = hash(value);
        auto& bucket = buckets[index];
        return find(bucket.begin(), bucket.end(), value) 
            != bucket.end();
    }
    
    int getSize() const { return size; }
    
    void clear() {
        for (auto& bucket : buckets) {
            bucket.clear();
        }
        size = 0;
    }
};

// Usage
int main() {
    HashSet<string> set;
    set.add("apple");
    set.add("banana");
    cout << set.contains("apple"); // true
    return 0;
}`
};

export default function HashSetVisualizer() {
  const { operations, clearHistory } = useHashSetStore();

  return (
    <VisualizerLayout
      title="HashSet Visualizer"
      controlPanel={<HashSetControls />}
      codePanel={<CodePanel examples={codeExamples} />}
      operationHistory={
        <OperationHistory 
          operations={operations} 
          onClear={clearHistory}
        />
      }
    >
      <HashSetVisualization />
    </VisualizerLayout>
  );
}
