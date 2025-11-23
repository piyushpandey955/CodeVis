import React from 'react';
import VisualizerLayout from '../../components/visualizer/Shared/VisualizerLayout';
import ControlPanel from '../../components/visualizer/Shared/ControlPanel';
import CodePanel from '../../components/visualizer/Shared/CodePanel';
import OperationHistory from '../../components/visualizer/Shared/OperationHistory';
import GraphVisualization from '../../components/visualizer/Graph/GraphVisualization';
import GraphControls from '../../components/visualizer/Graph/GraphControls';
import useGraphStore from '../../store/graphStore';

const GraphVisualizer = () => {
  const { history, clearHistory } = useGraphStore();

  const codeExamples = {
    python: `# Graph Implementation using Adjacency List
class Graph:
    def __init__(self, directed=False):
        self.graph = {}
        self.directed = directed
    
    def add_node(self, node):
        """Add a node to the graph"""
        if node not in self.graph:
            self.graph[node] = []
    
    def add_edge(self, from_node, to_node, weight=1):
        """Add an edge between two nodes"""
        if from_node not in self.graph:
            self.add_node(from_node)
        if to_node not in self.graph:
            self.add_node(to_node)
        
        self.graph[from_node].append((to_node, weight))
        
        # For undirected graph, add reverse edge
        if not self.directed:
            self.graph[to_node].append((from_node, weight))
    
    def bfs(self, start):
        """Breadth-First Search traversal"""
        visited = set()
        queue = [start]
        result = []
        
        visited.add(start)
        
        while queue:
            node = queue.pop(0)
            result.append(node)
            
            for neighbor, _ in self.graph.get(node, []):
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        
        return result
    
    def dfs(self, start, visited=None):
        """Depth-First Search traversal"""
        if visited is None:
            visited = set()
        
        visited.add(start)
        result = [start]
        
        for neighbor, _ in self.graph.get(start, []):
            if neighbor not in visited:
                result.extend(self.dfs(neighbor, visited))
        
        return result

# Time Complexities:
# BFS: O(V + E) - V: vertices, E: edges
# DFS: O(V + E)
# Space: O(V)`,

    javascript: `// Graph Implementation using Adjacency List
class Graph {
    constructor(directed = false) {
        this.graph = new Map();
        this.directed = directed;
    }
    
    // Add a node to the graph
    addNode(node) {
        if (!this.graph.has(node)) {
            this.graph.set(node, []);
        }
    }
    
    // Add an edge between two nodes
    addEdge(fromNode, toNode, weight = 1) {
        if (!this.graph.has(fromNode)) {
            this.addNode(fromNode);
        }
        if (!this.graph.has(toNode)) {
            this.addNode(toNode);
        }
        
        this.graph.get(fromNode).push({ node: toNode, weight });
        
        // For undirected graph, add reverse edge
        if (!this.directed) {
            this.graph.get(toNode).push({ node: fromNode, weight });
        }
    }
    
    // Breadth-First Search traversal
    bfs(start) {
        const visited = new Set();
        const queue = [start];
        const result = [];
        
        visited.add(start);
        
        while (queue.length > 0) {
            const node = queue.shift();
            result.push(node);
            
            const neighbors = this.graph.get(node) || [];
            for (const { node: neighbor } of neighbors) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }
        
        return result;
    }
    
    // Depth-First Search traversal
    dfs(start, visited = new Set()) {
        visited.add(start);
        const result = [start];
        
        const neighbors = this.graph.get(start) || [];
        for (const { node: neighbor } of neighbors) {
            if (!visited.has(neighbor)) {
                result.push(...this.dfs(neighbor, visited));
            }
        }
        
        return result;
    }
}

// Time Complexities:
// BFS: O(V + E) - V: vertices, E: edges
// DFS: O(V + E)
// Space: O(V)`,

    java: `// Graph Implementation using Adjacency List
import java.util.*;

class Graph {
    private Map<String, List<Edge>> graph;
    private boolean directed;
    
    static class Edge {
        String to;
        int weight;
        
        Edge(String to, int weight) {
            this.to = to;
            this.weight = weight;
        }
    }
    
    public Graph(boolean directed) {
        this.graph = new HashMap<>();
        this.directed = directed;
    }
    
    // Add a node to the graph
    public void addNode(String node) {
        graph.putIfAbsent(node, new ArrayList<>());
    }
    
    // Add an edge between two nodes
    public void addEdge(String from, String to, int weight) {
        addNode(from);
        addNode(to);
        
        graph.get(from).add(new Edge(to, weight));
        
        // For undirected graph, add reverse edge
        if (!directed) {
            graph.get(to).add(new Edge(from, weight));
        }
    }
    
    // Breadth-First Search traversal
    public List<String> bfs(String start) {
        Set<String> visited = new HashSet<>();
        Queue<String> queue = new LinkedList<>();
        List<String> result = new ArrayList<>();
        
        visited.add(start);
        queue.offer(start);
        
        while (!queue.isEmpty()) {
            String node = queue.poll();
            result.add(node);
            
            for (Edge edge : graph.getOrDefault(node, new ArrayList<>())) {
                if (!visited.contains(edge.to)) {
                    visited.add(edge.to);
                    queue.offer(edge.to);
                }
            }
        }
        
        return result;
    }
    
    // Depth-First Search traversal
    public List<String> dfs(String start) {
        Set<String> visited = new HashSet<>();
        List<String> result = new ArrayList<>();
        dfsHelper(start, visited, result);
        return result;
    }
    
    private void dfsHelper(String node, Set<String> visited, List<String> result) {
        visited.add(node);
        result.add(node);
        
        for (Edge edge : graph.getOrDefault(node, new ArrayList<>())) {
            if (!visited.contains(edge.to)) {
                dfsHelper(edge.to, visited, result);
            }
        }
    }
}

// Time Complexities:
// BFS: O(V + E) - V: vertices, E: edges
// DFS: O(V + E)
// Space: O(V)`,

    cpp: `// Graph Implementation using Adjacency List
#include <iostream>
#include <vector>
#include <queue>
#include <unordered_map>
#include <unordered_set>
using namespace std;

class Graph {
private:
    struct Edge {
        string to;
        int weight;
    };
    
    unordered_map<string, vector<Edge>> graph;
    bool directed;
    
    void dfsHelper(const string& node, unordered_set<string>& visited, vector<string>& result) {
        visited.insert(node);
        result.push_back(node);
        
        for (const auto& edge : graph[node]) {
            if (visited.find(edge.to) == visited.end()) {
                dfsHelper(edge.to, visited, result);
            }
        }
    }
    
public:
    Graph(bool dir = false) : directed(dir) {}
    
    // Add a node to the graph
    void addNode(const string& node) {
        if (graph.find(node) == graph.end()) {
            graph[node] = vector<Edge>();
        }
    }
    
    // Add an edge between two nodes
    void addEdge(const string& from, const string& to, int weight = 1) {
        addNode(from);
        addNode(to);
        
        graph[from].push_back({to, weight});
        
        // For undirected graph, add reverse edge
        if (!directed) {
            graph[to].push_back({from, weight});
        }
    }
    
    // Breadth-First Search traversal
    vector<string> bfs(const string& start) {
        unordered_set<string> visited;
        queue<string> q;
        vector<string> result;
        
        visited.insert(start);
        q.push(start);
        
        while (!q.empty()) {
            string node = q.front();
            q.pop();
            result.push_back(node);
            
            for (const auto& edge : graph[node]) {
                if (visited.find(edge.to) == visited.end()) {
                    visited.insert(edge.to);
                    q.push(edge.to);
                }
            }
        }
        
        return result;
    }
    
    // Depth-First Search traversal
    vector<string> dfs(const string& start) {
        unordered_set<string> visited;
        vector<string> result;
        dfsHelper(start, visited, result);
        return result;
    }
};

// Time Complexities:
// BFS: O(V + E) - V: vertices, E: edges
// DFS: O(V + E)
// Space: O(V)`,
  };

  return (
    <VisualizerLayout
      title="Graph Visualizer"
      controlPanel={<GraphControls />}
      codePanel={
        <CodePanel
          title="Graph Implementation"
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
      <GraphVisualization />
    </VisualizerLayout>
  );
};

export default GraphVisualizer;
