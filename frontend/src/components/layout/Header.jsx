// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Code, ChevronDown } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const NavLink = ({ children, direction = 'left', href = '#' }) => (
  <motion.a 
    href={href} 
    whileHover={{ x: direction === 'left' ? -5 : 5, scale: 1.05 }}
    transition={{ duration: 0.3 }}
    className="text-white/80 hover:text-white transition-colors duration-300"
  >
    {children}
  </motion.a>
);

const VisualizersDropdown = ({ direction = 'left' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const visualizers = [
    { name: 'Array', path: '/visualizers/array' },
    { name: '2D Array', path: '/visualizers/2d-array' },
    { name: 'Stack', path: '/visualizers/stack' },
    { name: 'Queue', path: '/visualizers/queue' },
    { name: 'Linked List', path: '/visualizers/linked-list' },
    { name: 'Tree', path: '/visualizers/tree' },
    { name: 'Graph', path: '/visualizers/graph' },
    { name: 'Priority Queue', path: '/visualizers/priority-queue' },
    { name: 'HashMap', path: '/visualizers/hashmap' },
    { name: 'HashSet', path: '/visualizers/hashset' },
  ];

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <motion.button
        whileHover={{ x: direction === 'left' ? -5 : 5, scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-1 text-white/80 hover:text-white transition-colors duration-300 cursor-pointer"
      >
        Visualizers
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      {/* Dropdown Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full mt-2 left-0 w-48 bg-gray-900/95 backdrop-blur-lg border border-white/10 rounded-xl shadow-xl overflow-hidden"
        >
          {visualizers.map((viz, index) => (
            viz.disabled ? (
              <div
                key={index}
                className="px-4 py-3 text-gray-500 cursor-not-allowed flex items-center justify-between"
              >
                <span>{viz.name}</span>
                <span className="text-xs text-gray-600">Soon</span>
              </div>
            ) : (
              <Link
                key={index}
                to={viz.path}
                className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors duration-200 cursor-pointer"
              >
                {viz.name}
              </Link>
            )
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we're on a visualizer page
  const isVisualizerPage = location.pathname.startsWith('/visualizers');

  return (
    <motion.header
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl"
    >
      <nav className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full shadow-lg">
        {/* Logo */}
        <Link to="/">
          <motion.div 
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ x: -5, scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Code className="w-7 h-7 text-purple-400" />
            <span className="text-xl font-bold text-white">CodeAtlas</span>
          </motion.div>
        </Link>

        {/* Navigation Links - Conditional based on page */}
        <div className="hidden md:flex items-center gap-8">
          {isVisualizerPage ? (
            // Visualizer Pages Navigation
            <>
              <Link to="/" className="text-white/80 hover:text-white transition-colors duration-300 cursor-pointer">
                Home
              </Link>
              <Link to="/visualizers" className="text-white/80 hover:text-white transition-colors duration-300 cursor-pointer">
                Visualizers
              </Link>
              <Link to="/code-visualizer" className="text-white/80 hover:text-white transition-colors duration-300 cursor-pointer">
                Code Visualizer
              </Link>
              <span className="text-white/50 cursor-not-allowed">AI Code Assist</span>
            </>
          ) : (
            // Landing Page Navigation
            <>
              <Link to="/visualizers" className="text-white/80 hover:text-white transition-colors duration-300 cursor-pointer">
                Visualizers
              </Link>
              <Link to="/code-visualizer" className="text-white/80 hover:text-white transition-colors duration-300 cursor-pointer">
                Code Visualizer
              </Link>
              <NavLink direction="left" href="#features">Features</NavLink>
              <NavLink direction="right" href="#pricing">Pricing</NavLink>
            </>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          {/* Docs Button - Always visible */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={() => navigate('/docs')}
            className="px-5 py-2 bg-indigo-500 text-white rounded-full font-semibold text-md shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 cursor-pointer"
          >
            Docs
          </motion.button>

          {/* Get Started Button - Only show on landing page */}
          {!isVisualizerPage && (
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={() => navigate('/visualizers')}
              className="px-5 py-2 bg-indigo-500 text-white rounded-full font-semibold text-md shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 cursor-pointer"
            >
              Get Started
            </motion.button>
          )}
        </div>
      </nav>
    </motion.header>
  );
}
