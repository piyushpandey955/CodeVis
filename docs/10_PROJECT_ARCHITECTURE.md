# CodeVis - Project Architecture & Technical Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture Overview](#architecture-overview)
4. [Project Structure](#project-structure)
5. [State Management](#state-management)
6. [Component Architecture](#component-architecture)
7. [Data Structure Visualizers](#data-structure-visualizers)
8. [Styling & Design System](#styling--design-system)
9. [Routing & Navigation](#routing--navigation)
10. [Development Workflow](#development-workflow)

---

## Project Overview

**CodeVis** (formerly CodeAtlas) is an interactive, immersive platform for visualizing data structures and algorithms. The project aims to help students and developers understand DSA concepts through real-time, animated visualizations with executable code examples in multiple programming languages.

### Core Features
- Interactive visualizations for 7+ data structures
- Real-time animated operations (insert, delete, search, traversals)
- Multi-language code examples (Python, JavaScript, Java, C++)
- Operation history tracking
- Drag-and-drop node positioning (Graph visualizer)
- Sequential traversal animations with color gradients
- Responsive design with modern UI/UX

---

## Technology Stack

### Frontend Framework
**React 18.3.1** - Chosen for:
- Component-based architecture for reusable visualizer components
- Virtual DOM for efficient updates during animations
- Large ecosystem and community support
- Hooks API for clean state management
- Excellent developer tools

### Build Tool
**Vite 7.2.1** - Selected over Create React App because:
- Lightning-fast hot module replacement (HMR)
- Optimized build performance with esbuild
- Native ES modules support
- Better development experience
- Smaller bundle sizes

### State Management
**Zustand 5.0.2** - Preferred over Redux/Context API for:
- Minimal boilerplate code
- No provider wrapping needed
- Built-in devtools support
- Simple API with hooks
- Excellent TypeScript support
- Smaller bundle size (~1KB vs Redux ~20KB)
- Ideal for medium-complexity state

### Animation Library
**Framer Motion 11.15.0** - Used for:
- Declarative animation API
- Smooth enter/exit animations with `AnimatePresence`
- Spring-based physics animations
- Gesture support (hover, tap, drag)
- SVG animation capabilities
- Layout animations
- Better performance than CSS transitions

### Styling
**Tailwind CSS 3.4.17** - Chosen for:
- Utility-first approach for rapid development
- Consistent design system
- Responsive design utilities
- Dark theme support
- JIT (Just-In-Time) compiler for smaller CSS
- No unused CSS in production
- Easy customization

### Routing
**React Router DOM 7.0.1** - For:
- Client-side routing without page reloads
- Nested routes support
- Dynamic route parameters
- Browser history management
- Code splitting capabilities

### Icons
**Lucide React 0.469.0** - Selected because:
- Modern, clean icon set
- Tree-shakeable (only imports used icons)
- Consistent design language
- SVG-based for scalability
- Lightweight bundle size
- React-optimized

### Linting & Code Quality
**ESLint 9.17.0** - For:
- Code consistency
- Bug prevention
- Best practices enforcement
- React-specific rules
- Custom rule configuration

---

## Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        User Interface                        │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │   Header    │  │  Landing     │  │  Visualizer      │   │
│  │  Navigation │  │    Page      │  │     Pages        │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Component Layer                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │ Visualization│  │   Controls   │  │  Shared          │  │
│  │  Components  │  │  Components  │  │  Components      │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    State Management (Zustand)                │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐    │
│  │Array │ │Stack │ │Queue │ │ List │ │ Tree │ │Graph │    │
│  │Store │ │Store │ │Store │ │Store │ │Store │ │Store │    │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Data Structures                         │
│  • Array Operations    • Binary Search Tree                  │
│  • 2D Array           • Graph (Directed/Undirected)          │
│  • Stack (LIFO)       • Linked List                          │
│  • Queue (FIFO)       • And more...                          │
└─────────────────────────────────────────────────────────────┘
```

### Design Patterns Used

1. **Observer Pattern**: Zustand stores notify components of state changes
2. **Component Composition**: Shared layouts and reusable components
3. **Separation of Concerns**: Logic (stores), UI (components), Routing (pages)
4. **Single Responsibility**: Each component has one clear purpose
5. **Container/Presentational**: Pages (containers) + Components (presentational)

---

## Project Structure

```
CodeVis/
├── docs/                          # Documentation
│   ├── 00_READING_GUIDE.md
│   ├── 02_QUICKSTART.md
│   ├── 03_FRONTEND_ONLY_ARCHITECTURE.md
│   ├── 06_DSA_TOPICS.md
│   └── 10_PROJECT_ARCHITECTURE.md
│
├── frontend/                      # React application
│   ├── public/                    # Static assets
│   │   └── vite.svg
│   │
│   ├── src/
│   │   ├── assets/               # Images, fonts, etc.
│   │   │
│   │   ├── components/           # React components
│   │   │   ├── layout/          # Layout components
│   │   │   │   └── Header.jsx   # Navigation header
│   │   │   │
│   │   │   ├── three/           # 3D components
│   │   │   │   ├── Scene3D.jsx
│   │   │   │   ├── FloatingData.jsx
│   │   │   │   └── FloatingStack.jsx
│   │   │   │
│   │   │   ├── ui/              # Reusable UI components
│   │   │   │   └── Typewriter.jsx
│   │   │   │
│   │   │   └── visualizer/      # Data structure visualizers
│   │   │       ├── Array/
│   │   │       │   ├── ArrayVisualization.jsx
│   │   │       │   └── ArrayControls.jsx
│   │   │       ├── Array2D/
│   │   │       │   ├── Array2DVisualization.jsx
│   │   │       │   └── Array2DControls.jsx
│   │   │       ├── Stack/
│   │   │       │   ├── StackVisualization.jsx
│   │   │       │   └── StackControls.jsx
│   │   │       ├── Queue/
│   │   │       │   ├── QueueVisualization.jsx
│   │   │       │   └── QueueControls.jsx
│   │   │       ├── LinkedList/
│   │   │       │   ├── LinkedListVisualization.jsx
│   │   │       │   └── LinkedListControls.jsx
│   │   │       ├── Tree/
│   │   │       │   ├── TreeVisualization.jsx
│   │   │       │   └── TreeControls.jsx
│   │   │       ├── Graph/
│   │   │       │   ├── GraphVisualization.jsx
│   │   │       │   └── GraphControls.jsx
│   │   │       └── Shared/
│   │   │           ├── VisualizerLayout.jsx
│   │   │           ├── CodePanel.jsx
│   │   │           ├── OperationHistory.jsx
│   │   │           └── ControlPanel.jsx
│   │   │
│   │   ├── pages/                # Page components
│   │   │   ├── Landing/
│   │   │   │   ├── Landing.jsx
│   │   │   │   ├── Hero.jsx
│   │   │   │   └── Features.jsx
│   │   │   └── Visualizers/
│   │   │       ├── ArrayVisualizer.jsx
│   │   │       ├── Array2DVisualizer.jsx
│   │   │       ├── StackVisualizer.jsx
│   │   │       ├── QueueVisualizer.jsx
│   │   │       ├── LinkedListVisualizer.jsx
│   │   │       ├── TreeVisualizer.jsx
│   │   │       └── GraphVisualizer.jsx
│   │   │
│   │   ├── store/                # Zustand state stores
│   │   │   ├── arrayStore.js
│   │   │   ├── array2DStore.js
│   │   │   ├── stackStore.js
│   │   │   ├── queueStore.js
│   │   │   ├── linkedListStore.js
│   │   │   ├── treeStore.js
│   │   │   └── graphStore.js
│   │   │
│   │   ├── utils/                # Utility functions
│   │   │   └── arrayUtils.js    # Sorting algorithms
│   │   │
│   │   ├── App.jsx               # Root component with routing
│   │   ├── App.css               # Global styles
│   │   ├── main.jsx              # Application entry point
│   │   └── index.css             # Tailwind directives
│   │
│   ├── index.html                # HTML template
│   ├── package.json              # Dependencies & scripts
│   ├── vite.config.js            # Vite configuration
│   ├── tailwind.config.js        # Tailwind configuration
│   └── eslint.config.js          # ESLint rules
│
└── 01_README.md                  # Project README
```

### Folder Organization Strategy

#### Component Organization
- **By Feature**: Visualizers grouped by data structure type
- **Shared Components**: Reusable components in `Shared/` folder
- **Separation**: Visualization and Controls as separate components

#### Store Organization
- One store per data structure
- Independent state management
- No cross-store dependencies
- Each store follows same pattern:
  - State properties
  - CRUD operations
  - Traversal/algorithm methods
  - History tracking
  - Helper functions

---

## State Management

### Zustand Store Pattern

Each data structure has a dedicated store following this structure:

```javascript
import { create } from 'zustand';

const useDataStructureStore = create((set, get) => ({
  // State
  data: [],
  highlightedElements: [],
  history: [],
  maxSize: 15,
  
  // Operations
  operation: (params) => {
    const { data, history } = get();
    // Perform operation
    // Update state
    set({
      data: newData,
      history: [...history, operationRecord]
    });
  },
  
  // Helpers
  clearHistory: () => set({ history: [] }),
  clear: () => set({ data: [], highlightedElements: [] }),
}));

export default useDataStructureStore;
```

### Store Responsibilities

#### 1. **arrayStore.js** (Array Operations)
- State: `array`, `highlightedIndex`, `operations`, `maxSize`
- Operations: `insert`, `deleteAt`, `update`, `search`
- Algorithms: `bubbleSort`, `reverse`
- Max Size: 15 elements

#### 2. **array2DStore.js** (2D Array Operations)
- State: `array2D`, `highlightedCell`, `operations`
- Operations: `insertRow`, `deleteRow`, `insertColumn`, `deleteColumn`, `updateCell`, `search`, `transpose`
- Constraints: 5x5 maximum grid

#### 3. **stackStore.js** (LIFO Operations)
- State: `stack`, `highlightedIndex`, `operations`, `maxSize`
- Operations: `push`, `pop`, `peek`, `clear`
- Validation: Overflow/underflow checks
- Max Size: 15 elements

#### 4. **queueStore.js** (FIFO Operations)
- State: `queue`, `front`, `rear`, `operations`, `maxSize`
- Operations: `enqueue`, `dequeue`, `peek`, `clear`
- Validation: Queue full/empty checks
- Max Size: 15 elements

#### 5. **linkedListStore.js** (Linked List Operations)
- State: `nodes`, `highlightedNodes`, `history`, `maxSize`
- Node Structure: `{ id, value, next }`
- Operations: `insertAtHead`, `insertAtTail`, `insertAtPosition`, `deleteAtHead`, `deleteAtTail`, `deleteByValue`, `search`, `clear`
- Layout: Multi-row (5 nodes per row)
- Max Size: 15 nodes

#### 6. **treeStore.js** (Binary Search Tree)
- State: `root`, `highlightedNodes`, `traversalPath`, `currentTraversalIndex`, `isTraversing`
- Node Structure: `{ id, value, left, right }`
- Operations: `insert`, `delete`, `search`, `findMin`, `findMax`, `getHeight`
- Traversals: `inorderTraversal`, `preorderTraversal`, `postorderTraversal`
- Animation: Sequential node highlighting with color gradients
- Max Size: 15 nodes

#### 7. **graphStore.js** (Graph Operations)
- State: `nodes`, `edges`, `highlightedNodes`, `highlightedEdges`, `isDirected`, `isWeighted`
- Node Structure: `{ id, label, x, y }`
- Edge Structure: `{ id, from, to, weight }`
- Operations: `addNode`, `removeNode`, `addEdge`, `removeEdge`, `updateNodePosition`
- Traversals: `bfs`, `dfs`
- Layout: Multi-ring circular layout
- Max Size: 15 nodes

---

## Component Architecture

### Visualizer Component Pattern

Each visualizer follows a consistent structure:

```
VisualizerPage (Container)
  ├── VisualizerLayout (Shared wrapper)
  │     ├── Title & Description
  │     ├── Controls Panel
  │     │     └── DataStructureControls
  │     ├── Visualization Canvas
  │     │     └── DataStructureVisualization
  │     ├── Code Panel
  │     │     └── Multi-language examples
  │     └── Operation History
  └── State Connection (Zustand hooks)
```

### Component Responsibilities

#### Visualization Components
**Purpose**: Render the data structure with animations

Features:
- Framer Motion animations for smooth transitions
- Color-coded elements (blue/purple gradients for normal, highlighted colors for operations)
- Responsive layouts
- Real-time updates on state changes
- Interactive elements (drag & drop for graphs)

Example Pattern:
```jsx
const DataStructureVisualization = () => {
  const { data, highlightedElements } = useDataStructureStore();
  
  return (
    <AnimatePresence>
      {data.map((element, index) => (
        <motion.div
          key={element.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className={isHighlighted ? 'highlighted' : 'normal'}
        >
          {element.value}
        </motion.div>
      ))}
    </AnimatePresence>
  );
};
```

#### Control Components
**Purpose**: Provide user interface for operations

Features:
- Input fields for values
- Operation buttons (Insert, Delete, Search, etc.)
- Quick action buttons (preset values)
- Disabled states for invalid operations
- Consistent button color scheme:
  - Green: Insert/Add operations
  - Red: Delete/Remove operations
  - Blue: Update operations
  - Purple: Search operations
  - Amber/Yellow: Traversal/Sort operations
  - Indigo: Clear/Reset operations

#### Shared Components

**1. VisualizerLayout.jsx**
- Grid layout: 2/3 width for visualization, 1/3 for code
- Wraps all visualizer pages
- Consistent spacing and animations
- Responsive design

**2. CodePanel.jsx**
- Syntax-highlighted code examples
- Language selector (Python, JavaScript, Java, C++)
- Copy-to-clipboard functionality
- Time/space complexity information

**3. OperationHistory.jsx**
- Scrollable list of operations
- Timestamps and operation details
- Success/failure indicators
- Clear history button

**4. ControlPanel.jsx**
- Playback controls (Play, Pause, Reset)
- Speed control slider
- Animation state management

---

## Data Structure Visualizers

### 1. Array Visualizer
**Features**:
- Horizontal layout with indexed boxes
- Insert at index, Delete, Update, Search
- Bubble sort with step-by-step visualization
- Array reversal
- Highlighted index during operations

**Visual Design**:
- Blue-to-purple gradient for normal elements
- Purple highlight with glow for active operations
- Index labels below each element
- Maximum 15 elements

### 2. 2D Array Visualizer
**Features**:
- Grid layout (up to 5x5)
- Insert/Delete rows and columns
- Update individual cells
- Search across entire grid
- Matrix transpose operation

**Visual Design**:
- Bordered grid cells
- Row and column indices
- Highlighted cell with purple glow
- Responsive cell sizing

### 3. Stack Visualizer
**Features**:
- Vertical layout (bottom-to-top)
- Push, Pop, Peek operations
- LIFO visualization
- Top pointer indicator

**Visual Design**:
- Stacked boxes with shadows
- TOP label on topmost element
- Overflow/underflow indicators
- Maximum 15 elements

### 4. Queue Visualizer
**Features**:
- Horizontal layout (left-to-right)
- Enqueue, Dequeue, Peek operations
- FIFO visualization
- Front and Rear pointers

**Visual Design**:
- Linear arrangement
- FRONT and REAR labels
- Animated element movement
- Maximum 15 elements

### 5. Linked List Visualizer
**Features**:
- Multi-row layout (5 nodes per row)
- Insert at head, tail, or position
- Delete operations
- Node connections with arrows
- Search with path highlighting

**Visual Design**:
- Nodes with data and next pointer sections
- Horizontal arrows (→) within rows
- Downward arrows (↓) at row ends
- HEAD and TAIL markers
- Maximum 15 nodes

### 6. Tree Visualizer (Binary Search Tree)
**Features**:
- Hierarchical layout
- Insert, Delete, Search operations
- Min/Max finding
- Three traversal types (Inorder, Preorder, Postorder)
- Height calculation

**Visual Design**:
- Canvas-based edge rendering
- Circular nodes with values
- ROOT and LEAF labels
- Sequential traversal animation with:
  - Green → Yellow → Orange → Red color progression
  - Numbered order indicators (#1, #2, #3...)
- Dynamic positioning based on tree levels

**Traversal Animations**:
- 600ms delay between node highlights
- Color gradient showing order
- Path remains visible during traversal
- Auto-clear after completion

### 7. Graph Visualizer
**Features**:
- Directed/Undirected mode toggle
- Weighted/Unweighted mode toggle
- Add/Remove nodes and edges
- Drag-and-drop node positioning
- BFS and DFS traversals

**Visual Design**:
- Multi-ring circular layout
- SVG edges with arrows (directed graphs)
- Weight labels on edges
- Interactive node selection
- Traversal animation with color progression

**Layout Algorithm**:
- Node 1: Center position
- Node 2: Right of center
- Nodes 3-8: First ring (6 nodes, 180px radius)
- Nodes 9+: Expanding rings with increasing node count
- Automatic boundary checking

---

## Styling & Design System

### Color Palette

#### Primary Colors
```css
/* Background Gradients */
from-gray-900 via-purple-900/20 to-gray-900

/* Node/Element Colors */
Blue-to-Purple: from-blue-500 to-purple-600
Highlight: purple-500 with purple-300 border
```

#### Operation Colors
```css
/* Button Color Scheme */
Green (bg-green-500): Insert/Add operations
Red (bg-red-500): Delete/Remove operations  
Blue (bg-blue-500): Update operations
Purple (bg-purple-500): Search operations
Amber (bg-amber-500): Traversal/Sort operations
Indigo (bg-indigo-500): Clear/Reset operations
Cyan (bg-cyan-500): Utility operations
```

#### Traversal Colors
```css
/* Sequential Color Progression */
Early nodes: from-green-400 to-emerald-500
Mid nodes: from-yellow-400 to-amber-500
Late nodes: from-orange-400 to-red-500
```

### Tailwind Configuration

```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Custom colors if needed
      },
      animation: {
        // Custom animations
      },
    },
  },
  plugins: [],
}
```

### Component Styling Patterns

#### Consistent Classes
- Containers: `bg-gray-900 rounded-lg p-6 border border-white/10`
- Buttons: `px-4 py-3 rounded-lg transition-colors duration-200 font-semibold cursor-pointer`
- Inputs: `px-4 py-3 bg-gray-800 border border-white/20 rounded-lg text-white`
- Cards: `bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6`

#### Animation Classes
- Enter: `initial={{ opacity: 0, scale: 0 }}`
- Animate: `animate={{ opacity: 1, scale: 1 }}`
- Exit: `exit={{ opacity: 0, scale: 0 }}`
- Transition: `transition={{ duration: 0.3 }}`

---

## Routing & Navigation

### Route Structure

```javascript
// App.jsx
<Routes>
  <Route path="/" element={<Landing />} />
  <Route path="/visualizers/array" element={<ArrayVisualizer />} />
  <Route path="/visualizers/2d-array" element={<Array2DVisualizer />} />
  <Route path="/visualizers/stack" element={<StackVisualizer />} />
  <Route path="/visualizers/queue" element={<QueueVisualizer />} />
  <Route path="/visualizers/linked-list" element={<LinkedListVisualizer />} />
  <Route path="/visualizers/tree" element={<TreeVisualizer />} />
  <Route path="/visualizers/graph" element={<GraphVisualizer />} />
</Routes>
```

### Navigation Component

```jsx
// Header.jsx
const visualizers = [
  { name: 'Array', path: '/visualizers/array' },
  { name: '2D Array', path: '/visualizers/2d-array' },
  { name: 'Stack', path: '/visualizers/stack' },
  { name: 'Queue', path: '/visualizers/queue' },
  { name: 'Linked List', path: '/visualizers/linked-list' },
  { name: 'Tree', path: '/visualizers/tree' },
  { name: 'Graph', path: '/visualizers/graph' },
];
```

Features:
- Dropdown menu for visualizer selection
- Responsive header with glassmorphism effect
- Active route highlighting
- Logo with navigation to home

---

## Development Workflow

### Setup & Installation

```bash
# Clone repository
git clone https://github.com/piyushpandey955/CodeVis.git
cd CodeVis/frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Development Server

- **Port**: 5173 (default)
- **Hot Module Replacement**: Enabled
- **Fast Refresh**: Instant updates without full reload

### Build Configuration

```javascript
// vite.config.js
export default {
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
  },
}
```

### Code Quality Tools

#### ESLint Configuration
```javascript
// eslint.config.js
export default [
  {
    files: ['**/*.{js,jsx}'],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
];
```

### Git Workflow

```bash
# Current branch
main

# Repository structure
CodeVis/
├── .git/
├── docs/
└── frontend/
```

---

## Performance Optimizations

### Bundle Size Optimization
1. **Tree-shaking**: Only imported components are bundled
2. **Code splitting**: Route-based lazy loading potential
3. **Icon tree-shaking**: Lucide React only bundles used icons
4. **Zustand**: Minimal state management library (~1KB)
5. **Vite**: Optimized production builds with esbuild

### Runtime Performance
1. **React 18**: Automatic batching for state updates
2. **Framer Motion**: GPU-accelerated animations
3. **Memoization**: Prevent unnecessary re-renders
4. **Efficient updates**: Zustand's selective subscriptions
5. **Canvas rendering**: For complex graphs/trees (efficient drawing)

### Animation Performance
1. **CSS transforms**: Hardware-accelerated
2. **RequestAnimationFrame**: Smooth 60fps animations
3. **AnimatePresence**: Optimized enter/exit animations
4. **Spring physics**: Natural-feeling motion

---

## Future Enhancements

### Potential Features
1. **Additional Data Structures**:
   - Heap (Min/Max)
   - Hash Table
   - AVL Tree
   - Red-Black Tree
   - Trie
   - Disjoint Set (Union-Find)

2. **Advanced Algorithms**:
   - Dijkstra's shortest path
   - Kruskal's MST
   - Prim's MST
   - A* pathfinding
   - Sorting algorithm visualizations
   - Dynamic programming problems

3. **User Features**:
   - Save/Load graph configurations
   - Export visualizations as images
   - Step-by-step algorithm explanations
   - Quiz mode
   - Custom data input from files
   - Theme customization

4. **Technical Improvements**:
   - TypeScript migration
   - Testing (Vitest + React Testing Library)
   - PWA support
   - Backend for user accounts
   - Analytics integration

---

## Conclusion

CodeVis is built with modern web technologies focusing on:
- **Performance**: Fast builds, optimized runtime
- **Maintainability**: Clean architecture, consistent patterns
- **User Experience**: Smooth animations, intuitive controls
- **Scalability**: Easy to add new visualizers
- **Developer Experience**: Hot reload, minimal boilerplate

The project demonstrates best practices in React development, state management, and interactive visualizations. The modular architecture allows for easy extension and maintenance as the project grows.

---

## Contributing

To contribute to CodeVis:
1. Follow the existing component structure
2. Use the established state management pattern
3. Maintain consistent styling with Tailwind
4. Add animations with Framer Motion
5. Update documentation for new features
6. Test thoroughly before submitting PRs

---

**Last Updated**: November 27, 2025  
**Version**: 1.0.0  
**Repository**: https://github.com/piyushpandey955/CodeVis
