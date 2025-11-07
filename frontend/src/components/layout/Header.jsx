// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';

const NavLink = ({ children }) => (
  <a href="#" className="text-white/80 hover:text-white transition-colors duration-300">
    {children}
  </a>
);

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl"
    >
      <nav className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full shadow-lg">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Code className="w-7 h-7 text-purple-400" />
          <span className="text-xl font-bold text-white">CodeVis</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink>Visualizers</NavLink>
          <NavLink>Features</NavLink>
          <NavLink>Pricing</NavLink>
          <NavLink>Docs</NavLink>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-5 py-2 bg-indigo-500 text-white rounded-full font-semibold text-md shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
        >
          Get Started
        </motion.button>
      </nav>
    </motion.header>
  );
}
