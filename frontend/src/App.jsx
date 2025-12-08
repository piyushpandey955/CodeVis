import { Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import Landing from './pages/Landing/Landing';
import VisualizersOverview from './pages/VisualizersOverview';
import Docs from './pages/Docs';
import ArrayVisualizer from './pages/Visualizers/ArrayVisualizer';
import Array2DVisualizer from './pages/Visualizers/Array2DVisualizer';
import StackVisualizer from './pages/Visualizers/StackVisualizer';
import QueueVisualizer from './pages/Visualizers/QueueVisualizer';
import LinkedListVisualizer from './pages/Visualizers/LinkedListVisualizer';
import TreeVisualizer from './pages/Visualizers/TreeVisualizer';
import GraphVisualizer from './pages/Visualizers/GraphVisualizer';
import PriorityQueueVisualizer from './pages/Visualizers/PriorityQueueVisualizer';
import HashMapVisualizer from './pages/Visualizers/HashMapVisualizer';
import HashSetVisualizer from './pages/Visualizers/HashSetVisualizer';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/visualizers" element={<VisualizersOverview />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/visualizers/array" element={<ArrayVisualizer />} />
          <Route path="/visualizers/2d-array" element={<Array2DVisualizer />} />
          <Route path="/visualizers/stack" element={<StackVisualizer />} />
          <Route path="/visualizers/queue" element={<QueueVisualizer />} />
          <Route path="/visualizers/linked-list" element={<LinkedListVisualizer />} />
          <Route path="/visualizers/tree" element={<TreeVisualizer />} />
          <Route path="/visualizers/graph" element={<GraphVisualizer />} />
          <Route path="/visualizers/priority-queue" element={<PriorityQueueVisualizer />} />
          <Route path="/visualizers/hashmap" element={<HashMapVisualizer />} />
          <Route path="/visualizers/hashset" element={<HashSetVisualizer />} />
          {/* Add other routes here */}
        </Routes>
      </main>
    </>
  );
}

export default App;
