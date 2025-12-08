import VisualizerLayout from '../../components/visualizer/Shared/VisualizerLayout';
import HashMapVisualization from '../../components/visualizer/HashMap/HashMapVisualization';
import HashMapControls from '../../components/visualizer/HashMap/HashMapControls';
import CodePanel from '../../components/visualizer/Shared/CodePanel';
import OperationHistory from '../../components/visualizer/Shared/OperationHistory';
import useHashMapStore from '../../store/hashMapStore';

const codeExamples = {
  python: `# HashMap Implementation
class HashMap:
    def __init__(self, capacity=10):
        self.capacity = capacity
        self.buckets = [[] for _ in range(capacity)]
        self.size = 0
    
    def _hash(self, key):
        """Hash function to get bucket index"""
        hash_value = 0
        for char in str(key):
            hash_value = (hash_value * 31 + ord(char)) % self.capacity
        return hash_value
    
    def put(self, key, value):
        """Insert or update key-value pair"""
        index = self._hash(key)
        bucket = self.buckets[index]
        
        # Update if key exists
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        
        # Insert new key-value pair
        bucket.append((key, value))
        self.size += 1
    
    def get(self, key):
        """Get value by key"""
        index = self._hash(key)
        bucket = self.buckets[index]
        
        for k, v in bucket:
            if k == key:
                return v
        return None
    
    def remove(self, key):
        """Remove key-value pair"""
        index = self._hash(key)
        bucket = self.buckets[index]
        
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket.pop(i)
                self.size -= 1
                return True
        return False

# Usage
hash_map = HashMap()
hash_map.put("name", "Alice")
hash_map.put("age", 25)
print(hash_map.get("name"))  # Alice
hash_map.remove("age")`,

  javascript: `// HashMap Implementation
class HashMap {
    constructor(capacity = 10) {
        this.capacity = capacity;
        this.buckets = Array(capacity).fill(null).map(() => []);
        this.size = 0;
    }
    
    hash(key) {
        let hash = 0;
        const str = String(key);
        for (let i = 0; i < str.length; i++) {
            hash = (hash * 31 + str.charCodeAt(i)) % this.capacity;
        }
        return Math.abs(hash);
    }
    
    put(key, value) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        
        // Update if exists
        const existing = bucket.find(entry => entry.key === key);
        if (existing) {
            existing.value = value;
            return;
        }
        
        // Insert new
        bucket.push({ key, value });
        this.size++;
    }
    
    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        const entry = bucket.find(e => e.key === key);
        return entry ? entry.value : null;
    }
    
    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        const entryIndex = bucket.findIndex(e => e.key === key);
        
        if (entryIndex !== -1) {
            bucket.splice(entryIndex, 1);
            this.size--;
            return true;
        }
        return false;
    }
    
    containsKey(key) {
        const index = this.hash(key);
        return this.buckets[index].some(e => e.key === key);
    }
}

// Usage
const map = new HashMap();
map.put("name", "Alice");
map.put("age", "25");
console.log(map.get("name")); // Alice`,

  java: `// HashMap Implementation
import java.util.LinkedList;

class HashMap<K, V> {
    private static class Entry<K, V> {
        K key;
        V value;
        
        Entry(K key, V value) {
            this.key = key;
            this.value = value;
        }
    }
    
    private LinkedList<Entry<K, V>>[] buckets;
    private int capacity;
    private int size;
    
    @SuppressWarnings("unchecked")
    public HashMap(int capacity) {
        this.capacity = capacity;
        this.buckets = new LinkedList[capacity];
        for (int i = 0; i < capacity; i++) {
            buckets[i] = new LinkedList<>();
        }
        this.size = 0;
    }
    
    private int hash(K key) {
        return Math.abs(key.hashCode() % capacity);
    }
    
    public void put(K key, V value) {
        int index = hash(key);
        LinkedList<Entry<K, V>> bucket = buckets[index];
        
        // Update if exists
        for (Entry<K, V> entry : bucket) {
            if (entry.key.equals(key)) {
                entry.value = value;
                return;
            }
        }
        
        // Insert new
        bucket.add(new Entry<>(key, value));
        size++;
    }
    
    public V get(K key) {
        int index = hash(key);
        for (Entry<K, V> entry : buckets[index]) {
            if (entry.key.equals(key)) {
                return entry.value;
            }
        }
        return null;
    }
    
    public boolean remove(K key) {
        int index = hash(key);
        LinkedList<Entry<K, V>> bucket = buckets[index];
        
        for (Entry<K, V> entry : bucket) {
            if (entry.key.equals(key)) {
                bucket.remove(entry);
                size--;
                return true;
            }
        }
        return false;
    }
}

// Time Complexity:
// Average: O(1) for put, get, remove
// Worst: O(n) with many collisions`,

  cpp: `// HashMap Implementation
#include <iostream>
#include <vector>
#include <list>
#include <string>
using namespace std;

template<typename K, typename V>
class HashMap {
private:
    struct Entry {
        K key;
        V value;
        Entry(K k, V v) : key(k), value(v) {}
    };
    
    vector<list<Entry>> buckets;
    int capacity;
    int size;
    
    int hash(const K& key) {
        return abs(static_cast<int>(
            std::hash<K>{}(key)
        )) % capacity;
    }
    
public:
    HashMap(int cap = 10) : capacity(cap), size(0) {
        buckets.resize(capacity);
    }
    
    void put(const K& key, const V& value) {
        int index = hash(key);
        auto& bucket = buckets[index];
        
        // Update if exists
        for (auto& entry : bucket) {
            if (entry.key == key) {
                entry.value = value;
                return;
            }
        }
        
        // Insert new
        bucket.emplace_back(key, value);
        size++;
    }
    
    V* get(const K& key) {
        int index = hash(key);
        for (auto& entry : buckets[index]) {
            if (entry.key == key) {
                return &entry.value;
            }
        }
        return nullptr;
    }
    
    bool remove(const K& key) {
        int index = hash(key);
        auto& bucket = buckets[index];
        
        for (auto it = bucket.begin(); it != bucket.end(); ++it) {
            if (it->key == key) {
                bucket.erase(it);
                size--;
                return true;
            }
        }
        return false;
    }
};`
};

export default function HashMapVisualizer() {
  const { operations, clearHistory } = useHashMapStore();

  return (
    <VisualizerLayout
      title="HashMap Visualizer"
      controlPanel={<HashMapControls />}
      codePanel={<CodePanel examples={codeExamples} />}
      operationHistory={
        <OperationHistory 
          operations={operations} 
          onClear={clearHistory}
        />
      }
    >
      <HashMapVisualization />
    </VisualizerLayout>
  );
}
