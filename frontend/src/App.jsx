import { Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import Landing from './pages/Landing/Landing';
import ArrayVisualizer from './pages/Visualizers/ArrayVisualizer';
import Array2DVisualizer from './pages/Visualizers/Array2DVisualizer';
import StackVisualizer from './pages/Visualizers/StackVisualizer';
import QueueVisualizer from './pages/Visualizers/QueueVisualizer';
import LinkedListVisualizer from './pages/Visualizers/LinkedListVisualizer';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/visualizers/array" element={<ArrayVisualizer />} />
          <Route path="/visualizers/2d-array" element={<Array2DVisualizer />} />
          <Route path="/visualizers/stack" element={<StackVisualizer />} />
          <Route path="/visualizers/queue" element={<QueueVisualizer />} />
          <Route path="/visualizers/linked-list" element={<LinkedListVisualizer />} />
          {/* Add other routes here */}
        </Routes>
      </main>
    </>
  );
}

export default App;
