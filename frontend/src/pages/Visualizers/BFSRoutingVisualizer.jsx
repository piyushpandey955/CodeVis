import VisualizerLayout from '../../components/visualizer/Shared/VisualizerLayout';
import BFSRoutingVisualization from '../../components/visualizer/BFSRouting/BFSRoutingVisualization';
import BFSRoutingControls from '../../components/visualizer/BFSRouting/BFSRoutingControls';

export default function BFSRoutingVisualizer() {
  const codeExamples = {
    Python: `# BFS for Shortest Path (Google Maps Simulation)
from collections import deque

def bfs_shortest_path(grid, start, end):
    """
    Find shortest path in a grid using BFS.
    Used in navigation apps like Google Maps.
    
    Time: O(rows * cols)
    Space: O(rows * cols)
    """
    rows, cols = len(grid), len(grid[0])
    queue = deque([(start[0], start[1], [start])])
    visited = {start}
    
    # Directions: up, right, down, left
    directions = [(-1, 0), (0, 1), (1, 0), (0, -1)]
    
    while queue:
        row, col, path = queue.popleft()
        
        # Found destination
        if (row, col) == end:
            return path
        
        # Explore neighbors
        for dr, dc in directions:
            new_row, new_col = row + dr, col + dc
            
            # Check boundaries and obstacles
            if (0 <= new_row < rows and 
                0 <= new_col < cols and
                grid[new_row][new_col] != 'obstacle' and
                (new_row, new_col) not in visited):
                
                visited.add((new_row, new_col))
                new_path = path + [(new_row, new_col)]
                queue.append((new_row, new_col, new_path))
    
    return None  # No path found

# Example: City navigation
grid = [
    ['start', 'empty', 'empty', 'obstacle'],
    ['empty', 'obstacle', 'empty', 'empty'],
    ['empty', 'empty', 'obstacle', 'empty'],
    ['obstacle', 'empty', 'empty', 'end']
]

path = bfs_shortest_path(grid, (0, 0), (3, 3))
print(f"Shortest path: {path}")
print(f"Distance: {len(path)} blocks")`,

    JavaScript: `// BFS for Shortest Path (Google Maps Simulation)

class MapRouter {
  constructor(grid) {
    this.grid = grid;
    this.rows = grid.length;
    this.cols = grid[0].length;
  }
  
  findShortestPath(start, end) {
    /**
     * BFS pathfinding algorithm
     * Used in navigation apps like Google Maps
     * 
     * Time: O(rows * cols)
     * Space: O(rows * cols)
     */
    const queue = [[start.row, start.col, [start]]];
    const visited = new Set([\`\${start.row},\${start.col}\`]);
    
    // Directions: up, right, down, left
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    
    while (queue.length > 0) {
      const [row, col, path] = queue.shift();
      
      // Found destination
      if (row === end.row && col === end.col) {
        return path;
      }
      
      // Explore neighbors
      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        const key = \`\${newRow},\${newCol}\`;
        
        // Check boundaries and obstacles
        if (newRow >= 0 && newRow < this.rows &&
            newCol >= 0 && newCol < this.cols &&
            this.grid[newRow][newCol] !== 'obstacle' &&
            !visited.has(key)) {
          
          visited.add(key);
          const newPath = [...path, { row: newRow, col: newCol }];
          queue.push([newRow, newCol, newPath]);
        }
      }
    }
    
    return null; // No path found
  }
}

// Example: City navigation
const cityMap = [
  ['start', 'empty', 'empty', 'obstacle'],
  ['empty', 'obstacle', 'empty', 'empty'],
  ['empty', 'empty', 'obstacle', 'empty'],
  ['obstacle', 'empty', 'empty', 'end']
];

const router = new MapRouter(cityMap);
const path = router.findShortestPath(
  { row: 0, col: 0 },
  { row: 3, col: 3 }
);

console.log('Shortest route:', path);
console.log('Distance:', path.length, 'blocks');`,

    Java: `// BFS for Shortest Path (Google Maps Simulation)
import java.util.*;

class MapRouter {
    private char[][] grid;
    private int rows, cols;
    
    static class Position {
        int row, col;
        List<Position> path;
        
        Position(int row, int col, List<Position> path) {
            this.row = row;
            this.col = col;
            this.path = new ArrayList<>(path);
            this.path.add(this);
        }
    }
    
    public MapRouter(char[][] grid) {
        this.grid = grid;
        this.rows = grid.length;
        this.cols = grid[0].length;
    }
    
    /**
     * BFS pathfinding algorithm
     * Used in navigation apps like Google Maps
     * 
     * Time: O(rows * cols)
     * Space: O(rows * cols)
     */
    public List<Position> findShortestPath(int startR, int startC, 
                                          int endR, int endC) {
        Queue<Position> queue = new LinkedList<>();
        Set<String> visited = new HashSet<>();
        
        queue.offer(new Position(startR, startC, new ArrayList<>()));
        visited.add(startR + "," + startC);
        
        // Directions: up, right, down, left
        int[][] directions = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
        
        while (!queue.isEmpty()) {
            Position current = queue.poll();
            
            // Found destination
            if (current.row == endR && current.col == endC) {
                return current.path;
            }
            
            // Explore neighbors
            for (int[] dir : directions) {
                int newRow = current.row + dir[0];
                int newCol = current.col + dir[1];
                String key = newRow + "," + newCol;
                
                // Check boundaries and obstacles
                if (newRow >= 0 && newRow < rows &&
                    newCol >= 0 && newCol < cols &&
                    grid[newRow][newCol] != 'X' &&
                    !visited.contains(key)) {
                    
                    visited.add(key);
                    queue.offer(new Position(newRow, newCol, current.path));
                }
            }
        }
        
        return null; // No path found
    }
    
    public static void main(String[] args) {
        // Example: City navigation
        char[][] cityMap = {
            {'S', '.', '.', 'X'},
            {'.', 'X', '.', '.'},
            {'.', '.', 'X', '.'},
            {'X', '.', '.', 'E'}
        };
        
        MapRouter router = new MapRouter(cityMap);
        List<Position> path = router.findShortestPath(0, 0, 3, 3);
        
        System.out.println("Shortest route found!");
        System.out.println("Distance: " + path.size() + " blocks");
    }
}`,

    'C++': `// BFS for Shortest Path (Google Maps Simulation)
#include <iostream>
#include <vector>
#include <queue>
#include <set>
#include <string>

using namespace std;

struct Position {
    int row, col;
    vector<Position> path;
    
    Position(int r, int c) : row(r), col(c) {}
};

class MapRouter {
private:
    vector<vector<char>> grid;
    int rows, cols;
    
public:
    MapRouter(vector<vector<char>>& g) : grid(g) {
        rows = grid.size();
        cols = grid[0].size();
    }
    
    /**
     * BFS pathfinding algorithm
     * Used in navigation apps like Google Maps
     * 
     * Time: O(rows * cols)
     * Space: O(rows * cols)
     */
    vector<Position> findShortestPath(int startR, int startC,
                                     int endR, int endC) {
        queue<Position> q;
        set<string> visited;
        
        Position start(startR, startC);
        start.path.push_back(start);
        q.push(start);
        visited.insert(to_string(startR) + "," + to_string(startC));
        
        // Directions: up, right, down, left
        int directions[4][2] = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
        
        while (!q.empty()) {
            Position current = q.front();
            q.pop();
            
            // Found destination
            if (current.row == endR && current.col == endC) {
                return current.path;
            }
            
            // Explore neighbors
            for (auto& dir : directions) {
                int newRow = current.row + dir[0];
                int newCol = current.col + dir[1];
                string key = to_string(newRow) + "," + to_string(newCol);
                
                // Check boundaries and obstacles
                if (newRow >= 0 && newRow < rows &&
                    newCol >= 0 && newCol < cols &&
                    grid[newRow][newCol] != 'X' &&
                    visited.find(key) == visited.end()) {
                    
                    visited.insert(key);
                    Position next(newRow, newCol);
                    next.path = current.path;
                    next.path.push_back(next);
                    q.push(next);
                }
            }
        }
        
        return vector<Position>(); // No path found
    }
};

int main() {
    // Example: City navigation
    vector<vector<char>> cityMap = {
        {'S', '.', '.', 'X'},
        {'.', 'X', '.', '.'},
        {'.', '.', 'X', '.'},
        {'X', '.', '.', 'E'}
    };
    
    MapRouter router(cityMap);
    auto path = router.findShortestPath(0, 0, 3, 3);
    
    cout << "Shortest route found!" << endl;
    cout << "Distance: " << path.size() << " blocks" << endl;
    
    return 0;
}`
  };

  return (
    <VisualizerLayout
      title="BFS Routing (Google Maps)"
      controlPanel={<BFSRoutingControls />}
      codePanel={
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Code Examples</h3>
          <p className="text-white/70 mb-4 text-sm">
            Visualize how mapping applications like Google Maps use BFS to find the shortest route between two locations, avoiding obstacles like traffic and closed roads.
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
      <BFSRoutingVisualization />
    </VisualizerLayout>
  );
}
