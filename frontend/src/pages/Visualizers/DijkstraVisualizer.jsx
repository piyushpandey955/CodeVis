import VisualizerLayout from '../../components/visualizer/Shared/VisualizerLayout';
import DijkstraVisualization from '../../components/visualizer/Dijkstra/DijkstraVisualization';
import DijkstraControls from '../../components/visualizer/Dijkstra/DijkstraControls';

export default function DijkstraVisualizer() {
  const codeExamples = {
    Python: `# Dijkstra's Shortest Path with Priority Queue

import heapq
from collections import defaultdict

class Graph:
    """
    Dijkstra's Algorithm for Shortest Path
    Used in GPS, network routing, game AI
    
    Time: O((V + E) log V) with min-heap
    Space: O(V)
    """
    def __init__(self):
        self.graph = defaultdict(list)
    
    def add_edge(self, u, v, weight):
        """Add weighted edge to graph"""
        self.graph[u].append((v, weight))
        self.graph[v].append((u, weight))  # Undirected
    
    def dijkstra(self, start, end):
        """Find shortest path using priority queue"""
        # Min-heap: (distance, node)
        pq = [(0, start)]
        distances = {node: float('inf') for node in self.graph}
        distances[start] = 0
        previous = {}
        visited = set()
        
        while pq:
            current_dist, current = heapq.heappop(pq)
            
            if current in visited:
                continue
            
            visited.add(current)
            
            # Found destination
            if current == end:
                break
            
            # Explore neighbors
            for neighbor, weight in self.graph[current]:
                distance = current_dist + weight
                
                # Found shorter path
                if distance < distances[neighbor]:
                    distances[neighbor] = distance
                    previous[neighbor] = current
                    heapq.heappush(pq, (distance, neighbor))
        
        # Reconstruct path
        path = []
        current = end
        while current in previous:
            path.append(current)
            current = previous[current]
        path.append(start)
        path.reverse()
        
        return path, distances[end]

# Example: City road network
road_network = Graph()

# Add roads with distances (in km)
road_network.add_edge('A', 'B', 4)
road_network.add_edge('A', 'C', 2)
road_network.add_edge('B', 'D', 3)
road_network.add_edge('C', 'E', 5)
road_network.add_edge('C', 'B', 1)
road_network.add_edge('D', 'F', 2)
road_network.add_edge('E', 'F', 1)
road_network.add_edge('E', 'D', 3)

# Find shortest route from A to F
path, distance = road_network.dijkstra('A', 'F')
print(f"Shortest path: {' → '.join(path)}")
print(f"Total distance: {distance} km")`,

    JavaScript: `// Dijkstra's Shortest Path with Priority Queue

class MinHeap {
  constructor() {
    this.heap = [];
  }
  
  push(item) {
    this.heap.push(item);
    this._bubbleUp(this.heap.length - 1);
  }
  
  pop() {
    if (this.heap.length === 0) return null;
    const min = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this._bubbleDown(0);
    }
    return min;
  }
  
  _bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex][0] <= this.heap[index][0]) break;
      [this.heap[parentIndex], this.heap[index]] = 
        [this.heap[index], this.heap[parentIndex]];
      index = parentIndex;
    }
  }
  
  _bubbleDown(index) {
    while (true) {
      let smallest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;
      
      if (left < this.heap.length && 
          this.heap[left][0] < this.heap[smallest][0]) {
        smallest = left;
      }
      if (right < this.heap.length && 
          this.heap[right][0] < this.heap[smallest][0]) {
        smallest = right;
      }
      
      if (smallest === index) break;
      
      [this.heap[index], this.heap[smallest]] = 
        [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }
  
  isEmpty() {
    return this.heap.length === 0;
  }
}

class Graph {
  /**
   * Dijkstra's Algorithm for Shortest Path
   * Used in GPS, network routing, game AI
   * 
   * Time: O((V + E) log V) with min-heap
   * Space: O(V)
   */
  constructor() {
    this.graph = new Map();
  }
  
  addEdge(u, v, weight) {
    /** Add weighted edge to graph */
    if (!this.graph.has(u)) this.graph.set(u, []);
    if (!this.graph.has(v)) this.graph.set(v, []);
    this.graph.get(u).push([v, weight]);
    this.graph.get(v).push([u, weight]); // Undirected
  }
  
  dijkstra(start, end) {
    /** Find shortest path using priority queue */
    const pq = new MinHeap();
    const distances = new Map();
    const previous = new Map();
    const visited = new Set();
    
    // Initialize distances
    for (const node of this.graph.keys()) {
      distances.set(node, Infinity);
    }
    distances.set(start, 0);
    
    pq.push([0, start]);
    
    while (!pq.isEmpty()) {
      const [currentDist, current] = pq.pop();
      
      if (visited.has(current)) continue;
      visited.add(current);
      
      // Found destination
      if (current === end) break;
      
      // Explore neighbors
      for (const [neighbor, weight] of this.graph.get(current)) {
        const distance = currentDist + weight;
        
        // Found shorter path
        if (distance < distances.get(neighbor)) {
          distances.set(neighbor, distance);
          previous.set(neighbor, current);
          pq.push([distance, neighbor]);
        }
      }
    }
    
    // Reconstruct path
    const path = [];
    let current = end;
    while (previous.has(current)) {
      path.unshift(current);
      current = previous.get(current);
    }
    path.unshift(start);
    
    return { path, distance: distances.get(end) };
  }
}

// Example: City road network
const roadNetwork = new Graph();

// Add roads with distances (in km)
roadNetwork.addEdge('A', 'B', 4);
roadNetwork.addEdge('A', 'C', 2);
roadNetwork.addEdge('B', 'D', 3);
roadNetwork.addEdge('C', 'E', 5);
roadNetwork.addEdge('C', 'B', 1);
roadNetwork.addEdge('D', 'F', 2);
roadNetwork.addEdge('E', 'F', 1);
roadNetwork.addEdge('E', 'D', 3);

// Find shortest route from A to F
const result = roadNetwork.dijkstra('A', 'F');
console.log('Shortest path:', result.path.join(' → '));
console.log('Total distance:', result.distance, 'km');`,

    Java: `// Dijkstra's Shortest Path with Priority Queue
import java.util.*;

class Edge {
    String node;
    int weight;
    
    Edge(String node, int weight) {
        this.node = node;
        this.weight = weight;
    }
}

class Graph {
    private Map<String, List<Edge>> graph;
    
    /**
     * Dijkstra's Algorithm for Shortest Path
     * Used in GPS, network routing, game AI
     * 
     * Time: O((V + E) log V) with min-heap
     * Space: O(V)
     */
    public Graph() {
        graph = new HashMap<>();
    }
    
    /** Add weighted edge to graph */
    public void addEdge(String u, String v, int weight) {
        graph.putIfAbsent(u, new ArrayList<>());
        graph.putIfAbsent(v, new ArrayList<>());
        graph.get(u).add(new Edge(v, weight));
        graph.get(v).add(new Edge(u, weight)); // Undirected
    }
    
    /** Find shortest path using priority queue */
    public Result dijkstra(String start, String end) {
        // Min-heap: [distance, node]
        PriorityQueue<int[]> pq = new PriorityQueue<>(
            Comparator.comparingInt(a -> a[0])
        );
        
        Map<String, Integer> distances = new HashMap<>();
        Map<String, String> previous = new HashMap<>();
        Set<String> visited = new HashSet<>();
        
        // Initialize distances
        for (String node : graph.keySet()) {
            distances.put(node, Integer.MAX_VALUE);
        }
        distances.put(start, 0);
        
        pq.offer(new int[]{0, start.charAt(0)});
        
        while (!pq.isEmpty()) {
            int[] current = pq.poll();
            int currentDist = current[0];
            String currentNode = String.valueOf((char)current[1]);
            
            if (visited.contains(currentNode)) continue;
            visited.add(currentNode);
            
            // Found destination
            if (currentNode.equals(end)) break;
            
            // Explore neighbors
            for (Edge edge : graph.get(currentNode)) {
                int distance = currentDist + edge.weight;
                
                // Found shorter path
                if (distance < distances.get(edge.node)) {
                    distances.put(edge.node, distance);
                    previous.put(edge.node, currentNode);
                    pq.offer(new int[]{distance, edge.node.charAt(0)});
                }
            }
        }
        
        // Reconstruct path
        List<String> path = new ArrayList<>();
        String current = end;
        while (previous.containsKey(current)) {
            path.add(0, current);
            current = previous.get(current);
        }
        path.add(0, start);
        
        return new Result(path, distances.get(end));
    }
    
    static class Result {
        List<String> path;
        int distance;
        
        Result(List<String> path, int distance) {
            this.path = path;
            this.distance = distance;
        }
    }
    
    public static void main(String[] args) {
        // Example: City road network
        Graph roadNetwork = new Graph();
        
        // Add roads with distances (in km)
        roadNetwork.addEdge("A", "B", 4);
        roadNetwork.addEdge("A", "C", 2);
        roadNetwork.addEdge("B", "D", 3);
        roadNetwork.addEdge("C", "E", 5);
        roadNetwork.addEdge("C", "B", 1);
        roadNetwork.addEdge("D", "F", 2);
        roadNetwork.addEdge("E", "F", 1);
        roadNetwork.addEdge("E", "D", 3);
        
        // Find shortest route from A to F
        Result result = roadNetwork.dijkstra("A", "F");
        System.out.println("Shortest path: " + String.join(" → ", result.path));
        System.out.println("Total distance: " + result.distance + " km");
    }
}`,

    'C++': `// Dijkstra's Shortest Path with Priority Queue
#include <iostream>
#include <vector>
#include <queue>
#include <unordered_map>
#include <unordered_set>
#include <limits>
#include <algorithm>

using namespace std;

class Graph {
private:
    unordered_map<char, vector<pair<char, int>>> graph;
    
public:
    /**
     * Dijkstra's Algorithm for Shortest Path
     * Used in GPS, network routing, game AI
     * 
     * Time: O((V + E) log V) with min-heap
     * Space: O(V)
     */
    
    /** Add weighted edge to graph */
    void addEdge(char u, char v, int weight) {
        graph[u].push_back({v, weight});
        graph[v].push_back({u, weight}); // Undirected
    }
    
    /** Find shortest path using priority queue */
    pair<vector<char>, int> dijkstra(char start, char end) {
        // Min-heap: (distance, node)
        priority_queue<pair<int, char>, 
                      vector<pair<int, char>>, 
                      greater<pair<int, char>>> pq;
        
        unordered_map<char, int> distances;
        unordered_map<char, char> previous;
        unordered_set<char> visited;
        
        // Initialize distances
        for (auto& [node, _] : graph) {
            distances[node] = numeric_limits<int>::max();
        }
        distances[start] = 0;
        
        pq.push({0, start});
        
        while (!pq.empty()) {
            auto [currentDist, current] = pq.top();
            pq.pop();
            
            if (visited.count(current)) continue;
            visited.insert(current);
            
            // Found destination
            if (current == end) break;
            
            // Explore neighbors
            for (auto& [neighbor, weight] : graph[current]) {
                int distance = currentDist + weight;
                
                // Found shorter path
                if (distance < distances[neighbor]) {
                    distances[neighbor] = distance;
                    previous[neighbor] = current;
                    pq.push({distance, neighbor});
                }
            }
        }
        
        // Reconstruct path
        vector<char> path;
        char current = end;
        while (previous.count(current)) {
            path.push_back(current);
            current = previous[current];
        }
        path.push_back(start);
        reverse(path.begin(), path.end());
        
        return {path, distances[end]};
    }
};

int main() {
    // Example: City road network
    Graph roadNetwork;
    
    // Add roads with distances (in km)
    roadNetwork.addEdge('A', 'B', 4);
    roadNetwork.addEdge('A', 'C', 2);
    roadNetwork.addEdge('B', 'D', 3);
    roadNetwork.addEdge('C', 'E', 5);
    roadNetwork.addEdge('C', 'B', 1);
    roadNetwork.addEdge('D', 'F', 2);
    roadNetwork.addEdge('E', 'F', 1);
    roadNetwork.addEdge('E', 'D', 3);
    
    // Find shortest route from A to F
    auto [path, distance] = roadNetwork.dijkstra('A', 'F');
    
    cout << "Shortest path: ";
    for (int i = 0; i < path.size(); i++) {
        cout << path[i];
        if (i < path.size() - 1) cout << " → ";
    }
    cout << endl;
    cout << "Total distance: " << distance << " km" << endl;
    
    return 0;
}`
  };

  return (
    <VisualizerLayout
      title="Dijkstra's Algorithm (GPS Navigation)"
      controlPanel={<DijkstraControls />}
      codePanel={
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Code Examples</h3>
          <p className="text-white/70 mb-4 text-sm">
            Visualize Dijkstra's shortest path algorithm with priority queue. See how GPS systems find optimal paths.
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
      <DijkstraVisualization />
    </VisualizerLayout>
  );
}
