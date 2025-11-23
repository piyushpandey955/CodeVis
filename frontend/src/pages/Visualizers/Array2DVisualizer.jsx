import React from 'react';
import VisualizerLayout from '../../components/visualizer/Shared/VisualizerLayout';
import ControlPanel from '../../components/visualizer/Shared/ControlPanel';
import CodePanel from '../../components/visualizer/Shared/CodePanel';
import OperationHistory from '../../components/visualizer/Shared/OperationHistory';
import Array2DVisualization from '../../components/visualizer/Array2D/Array2DVisualization';
import Array2DControls from '../../components/visualizer/Array2D/Array2DControls';
import use2DArrayStore from '../../store/array2DStore';

const array2DCodeExamples = {
  python: `# 2D Array Operations in Python
class Matrix:
    def __init__(self, rows, cols):
        self.matrix = [[0] * cols for _ in range(rows)]
    
    def insert_row(self, index, row):
        """Insert a row at given index"""
        self.matrix.insert(index, row)
    
    def insert_column(self, index, value=0):
        """Insert a column at given index"""
        for row in self.matrix:
            row.insert(index, value)
    
    def delete_row(self, index):
        """Delete row at given index"""
        if 0 <= index < len(self.matrix):
            del self.matrix[index]
    
    def delete_column(self, index):
        """Delete column at given index"""
        for row in self.matrix:
            if 0 <= index < len(row):
                del row[index]
    
    def update_cell(self, row, col, value):
        """Update cell value"""
        if 0 <= row < len(self.matrix):
            if 0 <= col < len(self.matrix[row]):
                self.matrix[row][col] = value
    
    def search(self, value):
        """Search for value in matrix"""
        positions = []
        for i, row in enumerate(self.matrix):
            for j, cell in enumerate(row):
                if cell == value:
                    positions.append((i, j))
        return positions
    
    def transpose(self):
        """Transpose the matrix"""
        self.matrix = [[self.matrix[j][i] 
            for j in range(len(self.matrix))] 
            for i in range(len(self.matrix[0]))]`,
        
  javascript: `// 2D Array Operations in JavaScript
class Matrix {
    constructor(rows, cols) {
        this.matrix = Array(rows).fill()
            .map(() => Array(cols).fill(0));
    }
    
    insertRow(index, row) {
        // Insert a row at given index
        this.matrix.splice(index, 0, row);
    }
    
    insertColumn(index, value = 0) {
        // Insert a column at given index
        this.matrix.forEach(row => {
            row.splice(index, 0, value);
        });
    }
    
    deleteRow(index) {
        // Delete row at given index
        if (index >= 0 && index < this.matrix.length) {
            this.matrix.splice(index, 1);
        }
    }
    
    deleteColumn(index) {
        // Delete column at given index
        this.matrix.forEach(row => {
            if (index >= 0 && index < row.length) {
                row.splice(index, 1);
            }
        });
    }
    
    updateCell(row, col, value) {
        // Update cell value
        if (row >= 0 && row < this.matrix.length &&
            col >= 0 && col < this.matrix[row].length) {
            this.matrix[row][col] = value;
        }
    }
    
    search(value) {
        // Search for value in matrix
        const positions = [];
        this.matrix.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell === value) {
                    positions.push({ row: i, col: j });
                }
            });
        });
        return positions;
    }
    
    transpose() {
        // Transpose the matrix
        this.matrix = this.matrix[0].map((_, i) => 
            this.matrix.map(row => row[i])
        );
    }
}`,
    
  java: `// 2D Array Operations in Java
import java.util.*;

public class Matrix {
    private List<List<Integer>> matrix;
    
    public Matrix(int rows, int cols) {
        matrix = new ArrayList<>();
        for (int i = 0; i < rows; i++) {
            List<Integer> row = new ArrayList<>();
            for (int j = 0; j < cols; j++) {
                row.add(0);
            }
            matrix.add(row);
        }
    }
    
    public void insertRow(int index, List<Integer> row) {
        matrix.add(index, row);
    }
    
    public void insertColumn(int index, int value) {
        for (List<Integer> row : matrix) {
            row.add(index, value);
        }
    }
    
    public void deleteRow(int index) {
        if (index >= 0 && index < matrix.size()) {
            matrix.remove(index);
        }
    }
    
    public void deleteColumn(int index) {
        for (List<Integer> row : matrix) {
            if (index >= 0 && index < row.size()) {
                row.remove(index);
            }
        }
    }
    
    public void updateCell(int row, int col, int value) {
        if (row >= 0 && row < matrix.size() &&
            col >= 0 && col < matrix.get(row).size()) {
            matrix.get(row).set(col, value);
        }
    }
    
    public List<int[]> search(int value) {
        List<int[]> positions = new ArrayList<>();
        for (int i = 0; i < matrix.size(); i++) {
            for (int j = 0; j < matrix.get(i).size(); j++) {
                if (matrix.get(i).get(j) == value) {
                    positions.add(new int[]{i, j});
                }
            }
        }
        return positions;
    }
}`,
    
  cpp: `// 2D Array Operations in C++
#include <vector>
#include <algorithm>
using namespace std;

class Matrix {
private:
    vector<vector<int>> matrix;
    
public:
    Matrix(int rows, int cols) {
        matrix.resize(rows, vector<int>(cols, 0));
    }
    
    void insertRow(int index, vector<int> row) {
        matrix.insert(matrix.begin() + index, row);
    }
    
    void insertColumn(int index, int value = 0) {
        for (auto& row : matrix) {
            row.insert(row.begin() + index, value);
        }
    }
    
    void deleteRow(int index) {
        if (index >= 0 && index < matrix.size()) {
            matrix.erase(matrix.begin() + index);
        }
    }
    
    void deleteColumn(int index) {
        for (auto& row : matrix) {
            if (index >= 0 && index < row.size()) {
                row.erase(row.begin() + index);
            }
        }
    }
    
    void updateCell(int row, int col, int value) {
        if (row >= 0 && row < matrix.size() &&
            col >= 0 && col < matrix[row].size()) {
            matrix[row][col] = value;
        }
    }
    
    vector<pair<int,int>> search(int value) {
        vector<pair<int,int>> positions;
        for (int i = 0; i < matrix.size(); i++) {
            for (int j = 0; j < matrix[i].size(); j++) {
                if (matrix[i][j] == value) {
                    positions.push_back({i, j});
                }
            }
        }
        return positions;
    }
    
    void transpose() {
        int rows = matrix.size();
        int cols = matrix[0].size();
        vector<vector<int>> result(cols, vector<int>(rows));
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                result[j][i] = matrix[i][j];
            }
        }
        matrix = result;
    }
};`
};

const array2DComplexity = {
  time: 'O(m*n) for most operations, O(m) or O(n) for row/column operations',
  space: 'O(m*n) where m=rows, n=cols',
};

const Array2DVisualizer = () => {
  const { 
    isPlaying, 
    setIsPlaying, 
    speed, 
    setSpeed, 
    reset, 
    operations, 
    clearOperations 
  } = use2DArrayStore();

  return (
    <VisualizerLayout
      title="2D Array (Matrix) Visualizer"
      controlPanel={
        <ControlPanel
          isPlaying={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onReset={reset}
          speed={speed}
          onSpeedChange={setSpeed}
        >
          <Array2DControls />
        </ControlPanel>
      }
      codePanel={
        <CodePanel 
          codeExamples={array2DCodeExamples}
          complexity={array2DComplexity}
        />
      }
      operationHistory={
        <OperationHistory 
          operations={operations}
          onClear={clearOperations}
        />
      }
    >
      <Array2DVisualization />
    </VisualizerLayout>
  );
};

export default Array2DVisualizer;
