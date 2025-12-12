import VisualizerLayout from '../../components/visualizer/Shared/VisualizerLayout';
import TrieAutocompleteVisualization from '../../components/visualizer/TrieAutocomplete/TrieAutocompleteVisualization';
import TrieAutocompleteControls from '../../components/visualizer/TrieAutocomplete/TrieAutocompleteControls';

export default function TrieAutocompleteVisualizer() {
  const codeExamples = {
    Python: `# Trie Autocomplete (Search Engine Simulation)

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Autocomplete:
    """
    Trie-based autocomplete system
    Used in search engines like Google
    
    Insert: O(m) where m = word length
    Search: O(m + k) where k = number of suggestions
    """
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word):
        """Add a word to the dictionary"""
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True
    
    def autocomplete(self, prefix):
        """Get all words starting with prefix"""
        node = self.root
        
        # Navigate to prefix end
        for char in prefix:
            if char not in node.children:
                return []
            node = node.children[char]
        
        # Collect all words from this point
        suggestions = []
        self._collect_words(node, prefix, suggestions)
        return suggestions[:10]  # Limit to 10 suggestions
    
    def _collect_words(self, node, prefix, suggestions):
        """Recursively collect all words below node"""
        if node.is_end_of_word:
            suggestions.append(prefix)
        
        for char, child in node.children.items():
            self._collect_words(child, prefix + char, suggestions)

# Example: Search engine
search_engine = Autocomplete()

# Build dictionary
words = ['apple', 'app', 'application', 'apply',
         'banana', 'band', 'bandana', 'car', 'cart']

for word in words:
    search_engine.insert(word)

# User types "app"
suggestions = search_engine.autocomplete('app')
print(f"Suggestions for 'app': {suggestions}")
# Output: ['app', 'apple', 'application', 'apply']`,

    JavaScript: `// Trie Autocomplete (Search Engine Simulation)

class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

class Autocomplete {
  /**
   * Trie-based autocomplete system
   * Used in search engines like Google
   * 
   * Insert: O(m) where m = word length
   * Search: O(m + k) where k = number of suggestions
   */
  constructor() {
    this.root = new TrieNode();
  }
  
  insert(word) {
    /** Add a word to the dictionary */
    let node = this.root;
    
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);
    }
    
    node.isEndOfWord = true;
  }
  
  autocomplete(prefix) {
    /** Get all words starting with prefix */
    let node = this.root;
    
    // Navigate to prefix end
    for (const char of prefix) {
      if (!node.children.has(char)) {
        return [];
      }
      node = node.children.get(char);
    }
    
    // Collect all words from this point
    const suggestions = [];
    this._collectWords(node, prefix, suggestions);
    return suggestions.slice(0, 10); // Limit to 10
  }
  
  _collectWords(node, prefix, suggestions) {
    /** Recursively collect all words below node */
    if (node.isEndOfWord) {
      suggestions.push(prefix);
    }
    
    for (const [char, child] of node.children) {
      this._collectWords(child, prefix + char, suggestions);
    }
  }
}

// Example: Search engine
const searchEngine = new Autocomplete();

// Build dictionary
const words = ['apple', 'app', 'application', 'apply',
               'banana', 'band', 'bandana', 'car', 'cart'];

words.forEach(word => searchEngine.insert(word));

// User types "app"
const suggestions = searchEngine.autocomplete('app');
console.log('Suggestions for "app":', suggestions);
// Output: ['app', 'apple', 'application', 'apply']`,

    Java: `// Trie Autocomplete (Search Engine Simulation)
import java.util.*;

class TrieNode {
    Map<Character, TrieNode> children = new HashMap<>();
    boolean isEndOfWord = false;
}

class Autocomplete {
    private TrieNode root;
    
    /**
     * Trie-based autocomplete system
     * Used in search engines like Google
     * 
     * Insert: O(m) where m = word length
     * Search: O(m + k) where k = number of suggestions
     */
    public Autocomplete() {
        root = new TrieNode();
    }
    
    /** Add a word to the dictionary */
    public void insert(String word) {
        TrieNode node = root;
        
        for (char c : word.toCharArray()) {
            node.children.putIfAbsent(c, new TrieNode());
            node = node.children.get(c);
        }
        
        node.isEndOfWord = true;
    }
    
    /** Get all words starting with prefix */
    public List<String> autocomplete(String prefix) {
        TrieNode node = root;
        
        // Navigate to prefix end
        for (char c : prefix.toCharArray()) {
            if (!node.children.containsKey(c)) {
                return new ArrayList<>();
            }
            node = node.children.get(c);
        }
        
        // Collect all words from this point
        List<String> suggestions = new ArrayList<>();
        collectWords(node, prefix, suggestions);
        
        return suggestions.subList(0, Math.min(10, suggestions.size()));
    }
    
    /** Recursively collect all words below node */
    private void collectWords(TrieNode node, String prefix, 
                             List<String> suggestions) {
        if (node.isEndOfWord) {
            suggestions.add(prefix);
        }
        
        for (Map.Entry<Character, TrieNode> entry : 
             node.children.entrySet()) {
            collectWords(entry.getValue(), 
                        prefix + entry.getKey(), 
                        suggestions);
        }
    }
    
    public static void main(String[] args) {
        // Example: Search engine
        Autocomplete searchEngine = new Autocomplete();
        
        // Build dictionary
        String[] words = {"apple", "app", "application", "apply",
                         "banana", "band", "bandana", "car", "cart"};
        
        for (String word : words) {
            searchEngine.insert(word);
        }
        
        // User types "app"
        List<String> suggestions = searchEngine.autocomplete("app");
        System.out.println("Suggestions for 'app': " + suggestions);
        // Output: [app, apple, application, apply]
    }
}`,

    'C++': `// Trie Autocomplete (Search Engine Simulation)
#include <iostream>
#include <unordered_map>
#include <vector>
#include <string>

using namespace std;

class TrieNode {
public:
    unordered_map<char, TrieNode*> children;
    bool isEndOfWord;
    
    TrieNode() : isEndOfWord(false) {}
};

class Autocomplete {
private:
    TrieNode* root;
    
    /**
     * Recursively collect all words below node
     */
    void collectWords(TrieNode* node, string prefix,
                     vector<string>& suggestions) {
        if (node->isEndOfWord) {
            suggestions.push_back(prefix);
        }
        
        for (auto& [c, child] : node->children) {
            collectWords(child, prefix + c, suggestions);
        }
    }
    
public:
    /**
     * Trie-based autocomplete system
     * Used in search engines like Google
     * 
     * Insert: O(m) where m = word length
     * Search: O(m + k) where k = number of suggestions
     */
    Autocomplete() {
        root = new TrieNode();
    }
    
    /** Add a word to the dictionary */
    void insert(string word) {
        TrieNode* node = root;
        
        for (char c : word) {
            if (node->children.find(c) == node->children.end()) {
                node->children[c] = new TrieNode();
            }
            node = node->children[c];
        }
        
        node->isEndOfWord = true;
    }
    
    /** Get all words starting with prefix */
    vector<string> autocomplete(string prefix) {
        TrieNode* node = root;
        
        // Navigate to prefix end
        for (char c : prefix) {
            if (node->children.find(c) == node->children.end()) {
                return vector<string>();
            }
            node = node->children[c];
        }
        
        // Collect all words from this point
        vector<string> suggestions;
        collectWords(node, prefix, suggestions);
        
        // Limit to 10 suggestions
        if (suggestions.size() > 10) {
            suggestions.resize(10);
        }
        
        return suggestions;
    }
};

int main() {
    // Example: Search engine
    Autocomplete searchEngine;
    
    // Build dictionary
    vector<string> words = {"apple", "app", "application", "apply",
                           "banana", "band", "bandana", "car", "cart"};
    
    for (const string& word : words) {
        searchEngine.insert(word);
    }
    
    // User types "app"
    vector<string> suggestions = searchEngine.autocomplete("app");
    
    cout << "Suggestions for 'app': ";
    for (const string& s : suggestions) {
        cout << s << " ";
    }
    cout << endl;
    // Output: app apple application apply
    
    return 0;
}`
  };

  return (
    <VisualizerLayout
      title="Trie Autocomplete (Search Engines)"
      controlPanel={<TrieAutocompleteControls />}
      codePanel={
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Code Examples</h3>
          <p className="text-white/70 mb-4 text-sm">
            Visualize how search engines like Google use Trie data structures to provide instant autocomplete suggestions as you type.
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
      <TrieAutocompleteVisualization />
    </VisualizerLayout>
  );
}
