import VisualizerLayout from '../../components/visualizer/Shared/VisualizerLayout';
import LRUCacheVisualization from '../../components/visualizer/LRUCache/LRUCacheVisualization';
import LRUCacheControls from '../../components/visualizer/LRUCache/LRUCacheControls';

export default function LRUCacheVisualizer() {
  const codeExamples = {
    Python: `# LRU Cache (Browser Caching Simulation)

class Node:
    def __init__(self, key, value):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None

class LRUCache:
    """
    LRU (Least Recently Used) Cache
    Used in browsers, OS memory management
    
    Get: O(1)
    Put: O(1)
    """
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {}  # key -> Node
        
        # Dummy head and tail for easy insertion/deletion
        self.head = Node(0, 0)
        self.tail = Node(0, 0)
        self.head.next = self.tail
        self.tail.prev = self.head
    
    def _remove(self, node):
        """Remove node from linked list"""
        prev_node = node.prev
        next_node = node.next
        prev_node.next = next_node
        next_node.prev = prev_node
    
    def _add_to_front(self, node):
        """Add node right after head (most recent)"""
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node
    
    def get(self, key):
        """Get value and mark as recently used"""
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            self._add_to_front(node)
            return node.value
        return -1  # Cache miss
    
    def put(self, key, value):
        """Add/update value in cache"""
        if key in self.cache:
            # Update existing
            self._remove(self.cache[key])
        
        node = Node(key, value)
        self._add_to_front(node)
        self.cache[key] = node
        
        # Evict LRU if over capacity
        if len(self.cache) > self.capacity:
            lru = self.tail.prev
            self._remove(lru)
            del self.cache[lru.key]

# Example: Browser page cache
page_cache = LRUCache(capacity=3)

# Visit pages
page_cache.put('home', 'Home Page HTML')
page_cache.put('about', 'About Page HTML')
page_cache.put('products', 'Products Page HTML')

# Access home (cache hit - instant load!)
print(page_cache.get('home'))  # Output: Home Page HTML

# Visit new page (evicts 'about' - least recently used)
page_cache.put('contact', 'Contact Page HTML')

# Try to access 'about' (cache miss - must reload)
print(page_cache.get('about'))  # Output: -1`,

    JavaScript: `// LRU Cache (Browser Caching Simulation)

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  /**
   * LRU (Least Recently Used) Cache
   * Used in browsers, OS memory management
   * 
   * Get: O(1)
   * Put: O(1)
   */
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // key -> Node
    
    // Dummy head and tail for easy insertion/deletion
    this.head = new Node(0, 0);
    this.tail = new Node(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  
  _remove(node) {
    /** Remove node from linked list */
    const prevNode = node.prev;
    const nextNode = node.next;
    prevNode.next = nextNode;
    nextNode.prev = prevNode;
  }
  
  _addToFront(node) {
    /** Add node right after head (most recent) */
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }
  
  get(key) {
    /** Get value and mark as recently used */
    if (this.cache.has(key)) {
      const node = this.cache.get(key);
      this._remove(node);
      this._addToFront(node);
      return node.value;
    }
    return -1; // Cache miss
  }
  
  put(key, value) {
    /** Add/update value in cache */
    if (this.cache.has(key)) {
      // Update existing
      this._remove(this.cache.get(key));
    }
    
    const node = new Node(key, value);
    this._addToFront(node);
    this.cache.set(key, node);
    
    // Evict LRU if over capacity
    if (this.cache.size > this.capacity) {
      const lru = this.tail.prev;
      this._remove(lru);
      this.cache.delete(lru.key);
    }
  }
}

// Example: Browser page cache
const pageCache = new LRUCache(3);

// Visit pages
pageCache.put('home', 'Home Page HTML');
pageCache.put('about', 'About Page HTML');
pageCache.put('products', 'Products Page HTML');

// Access home (cache hit - instant load!)
console.log(pageCache.get('home')); // Output: Home Page HTML

// Visit new page (evicts 'about' - least recently used)
pageCache.put('contact', 'Contact Page HTML');

// Try to access 'about' (cache miss - must reload)
console.log(pageCache.get('about')); // Output: -1`,

    Java: `// LRU Cache (Browser Caching Simulation)
import java.util.*;

class Node {
    int key;
    String value;
    Node prev, next;
    
    Node(int key, String value) {
        this.key = key;
        this.value = value;
    }
}

class LRUCache {
    private int capacity;
    private Map<Integer, Node> cache;
    private Node head, tail;
    
    /**
     * LRU (Least Recently Used) Cache
     * Used in browsers, OS memory management
     * 
     * Get: O(1)
     * Put: O(1)
     */
    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.cache = new HashMap<>();
        
        // Dummy head and tail for easy insertion/deletion
        head = new Node(0, "");
        tail = new Node(0, "");
        head.next = tail;
        tail.prev = head;
    }
    
    /** Remove node from linked list */
    private void remove(Node node) {
        Node prevNode = node.prev;
        Node nextNode = node.next;
        prevNode.next = nextNode;
        nextNode.prev = prevNode;
    }
    
    /** Add node right after head (most recent) */
    private void addToFront(Node node) {
        node.prev = head;
        node.next = head.next;
        head.next.prev = node;
        head.next = node;
    }
    
    /** Get value and mark as recently used */
    public String get(int key) {
        if (cache.containsKey(key)) {
            Node node = cache.get(key);
            remove(node);
            addToFront(node);
            return node.value;
        }
        return null; // Cache miss
    }
    
    /** Add/update value in cache */
    public void put(int key, String value) {
        if (cache.containsKey(key)) {
            // Update existing
            remove(cache.get(key));
        }
        
        Node node = new Node(key, value);
        addToFront(node);
        cache.put(key, node);
        
        // Evict LRU if over capacity
        if (cache.size() > capacity) {
            Node lru = tail.prev;
            remove(lru);
            cache.remove(lru.key);
        }
    }
    
    public static void main(String[] args) {
        // Example: Browser page cache
        LRUCache pageCache = new LRUCache(3);
        
        // Visit pages
        pageCache.put(1, "Home Page HTML");
        pageCache.put(2, "About Page HTML");
        pageCache.put(3, "Products Page HTML");
        
        // Access home (cache hit - instant load!)
        System.out.println(pageCache.get(1)); // Output: Home Page HTML
        
        // Visit new page (evicts 'about' - least recently used)
        pageCache.put(4, "Contact Page HTML");
        
        // Try to access 'about' (cache miss - must reload)
        System.out.println(pageCache.get(2)); // Output: null
    }
}`,

    'C++': `// LRU Cache (Browser Caching Simulation)
#include <iostream>
#include <unordered_map>
#include <string>

using namespace std;

class Node {
public:
    int key;
    string value;
    Node* prev;
    Node* next;
    
    Node(int k, string v) : key(k), value(v), prev(nullptr), next(nullptr) {}
};

class LRUCache {
private:
    int capacity;
    unordered_map<int, Node*> cache;
    Node* head;
    Node* tail;
    
    /** Remove node from linked list */
    void remove(Node* node) {
        Node* prevNode = node->prev;
        Node* nextNode = node->next;
        prevNode->next = nextNode;
        nextNode->prev = prevNode;
    }
    
    /** Add node right after head (most recent) */
    void addToFront(Node* node) {
        node->prev = head;
        node->next = head->next;
        head->next->prev = node;
        head->next = node;
    }
    
public:
    /**
     * LRU (Least Recently Used) Cache
     * Used in browsers, OS memory management
     * 
     * Get: O(1)
     * Put: O(1)
     */
    LRUCache(int cap) : capacity(cap) {
        // Dummy head and tail for easy insertion/deletion
        head = new Node(0, "");
        tail = new Node(0, "");
        head->next = tail;
        tail->prev = head;
    }
    
    /** Get value and mark as recently used */
    string get(int key) {
        if (cache.find(key) != cache.end()) {
            Node* node = cache[key];
            remove(node);
            addToFront(node);
            return node->value;
        }
        return ""; // Cache miss
    }
    
    /** Add/update value in cache */
    void put(int key, string value) {
        if (cache.find(key) != cache.end()) {
            // Update existing
            remove(cache[key]);
        }
        
        Node* node = new Node(key, value);
        addToFront(node);
        cache[key] = node;
        
        // Evict LRU if over capacity
        if (cache.size() > capacity) {
            Node* lru = tail->prev;
            remove(lru);
            cache.erase(lru->key);
            delete lru;
        }
    }
};

int main() {
    // Example: Browser page cache
    LRUCache pageCache(3);
    
    // Visit pages
    pageCache.put(1, "Home Page HTML");
    pageCache.put(2, "About Page HTML");
    pageCache.put(3, "Products Page HTML");
    
    // Access home (cache hit - instant load!)
    cout << pageCache.get(1) << endl; // Output: Home Page HTML
    
    // Visit new page (evicts 'about' - least recently used)
    pageCache.put(4, "Contact Page HTML");
    
    // Try to access 'about' (cache miss - must reload)
    string result = pageCache.get(2);
    cout << (result.empty() ? "Cache Miss" : result) << endl;
    
    return 0;
}`
  };

  return (
    <VisualizerLayout
      title="LRU Cache (Browser Caching)"
      controlPanel={<LRUCacheControls />}
      codePanel={
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Code Examples</h3>
          <p className="text-white/70 mb-4 text-sm">
            Visualize how browsers use LRU (Least Recently Used) caching to store recently visited pages for instant retrieval.
          </p>
          <div className="space-y-4">
            {Object.entries(codeExamples).map(([language, code]) => (
              <details key={language} className="group">
                <summary className="cursor-pointer text-white font-semibold py-2 px-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  {language}
                </summary>
                <pre className="mt-2 p-4 bg-black/50 rounded-lg overflow-x-auto text-sm">
                  <code className="text-green-400">{code}</code>
                </pre>
              </details>
            ))}
          </div>
        </div>
      }
    >
      <LRUCacheVisualization />
    </VisualizerLayout>
  );
}
