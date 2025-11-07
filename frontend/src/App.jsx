import Header from './components/layout/Header';
import Features from './pages/Landing/Features';
import Hero from './pages/Landing/Hero';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
      </main>
    </>
  );
}

export default App;
