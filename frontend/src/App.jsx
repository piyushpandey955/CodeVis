import { Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import Landing from './pages/Landing/Landing';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* Add other routes here */}
        </Routes>
      </main>
    </>
  );
}

export default App;
