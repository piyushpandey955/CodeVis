import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Grid3x3, 
  Layers, 
  List, 
  GitBranch, 
  Network, 
  Share2,
  Box,
  ArrowRight,
  ArrowUpDown,
  Hash,
  Database,
  Navigation,
  Search,
  HardDrive,
  Zap
} from 'lucide-react';

const visualizers = [
  {
    id: 'array',
    name: 'Array',
    icon: Grid3x3,
    description: 'Learn array operations, indexing, and sorting algorithms with interactive visualizations.',
    path: '/visualizers/array',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
  {
    id: '2d-array',
    name: '2D Array',
    icon: Layers,
    description: 'Explore matrix operations, grid traversals, and multi-dimensional data structures.',
    path: '/visualizers/2d-array',
    color: 'from-cyan-500 to-teal-500',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
  },
  {
    id: 'stack',
    name: 'Stack',
    icon: Box,
    description: 'Master LIFO operations with push, pop, and peek in a vertical stack visualization.',
    path: '/visualizers/stack',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
  },
  {
    id: 'queue',
    name: 'Queue',
    icon: List,
    description: 'Understand FIFO operations with enqueue, dequeue, and front/rear pointers.',
    path: '/visualizers/queue',
    color: 'from-yellow-500 to-amber-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
  },
  {
    id: 'priority-queue',
    name: 'Priority Queue',
    icon: ArrowUpDown,
    description: 'Learn heap-based priority queues with min/max heap operations and priority management.',
    path: '/visualizers/priority-queue',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
  },
  {
    id: 'linked-list',
    name: 'Linked List',
    icon: Share2,
    description: 'Visualize node connections, insertions, deletions, and traversals in linked structures.',
    path: '/visualizers/linked-list',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
  },
  {
    id: 'tree',
    name: 'Binary Search Tree',
    icon: GitBranch,
    description: 'Explore hierarchical structures with BST operations and animated traversals.',
    path: '/visualizers/tree',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
  },
  {
    id: 'graph',
    name: 'Graph',
    icon: Network,
    description: 'Navigate complex networks with BFS, DFS, and interactive node/edge manipulation.',
    path: '/visualizers/graph',
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20',
  },
  {
    id: 'hashmap',
    name: 'HashMap',
    icon: Database,
    description: 'Understand key-value pairs, hash functions, collision handling, and O(1) lookups.',
    path: '/visualizers/hashmap',
    color: 'from-teal-500 to-green-500',
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-500/20',
  },
  {
    id: 'hashset',
    name: 'HashSet',
    icon: Hash,
    description: 'Explore unique value storage, hash-based sets, and fast membership testing.',
    path: '/visualizers/hashset',
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/20',
  },
];

const realWorldUseCases = [
  {
    id: 'bfs-routing',
    name: 'BFS Routing',
    icon: Navigation,
    description: 'See how Google Maps finds the shortest route using BFS pathfinding algorithm.',
    path: '/visualizers/bfs-routing',
    color: 'from-blue-400 to-purple-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    realWorld: 'Google Maps',
  },
  {
    id: 'trie-autocomplete',
    name: 'Trie Autocomplete',
    icon: Search,
    description: 'Experience how search engines provide instant suggestions using Trie data structures.',
    path: '/visualizers/trie-autocomplete',
    color: 'from-purple-400 to-pink-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    realWorld: 'Search Engines',
  },
  {
    id: 'lru-cache',
    name: 'LRU Cache',
    icon: HardDrive,
    description: 'Discover how browsers cache pages for instant loading using LRU eviction.',
    path: '/visualizers/lru-cache',
    color: 'from-emerald-400 to-teal-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    realWorld: 'Browser Cache',
  },
  {
    id: 'dijkstra',
    name: "Dijkstra's Algorithm",
    icon: Zap,
    description: 'Watch how GPS systems find optimal paths using priority queues and Dijkstra.',
    path: '/visualizers/dijkstra',
    color: 'from-orange-400 to-red-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    realWorld: 'GPS Navigation',
  },
];

const VisualizerCard = ({ visualizer, index }) => {
  const navigate = useNavigate();
  const Icon = visualizer.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`${visualizer.bgColor} ${visualizer.borderColor} border backdrop-blur-md rounded-2xl p-6 cursor-pointer group transition-all duration-300`}
      onClick={() => navigate(visualizer.path)}
    >
      <div className="flex flex-col h-full">
        {/* Icon */}
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${visualizer.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-8 h-8 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-2xl font-bold text-white mb-3">
          {visualizer.name}
        </h3>
        <p className="text-white/70 mb-4 flex-grow">
          {visualizer.description}
        </p>

        {/* Call to Action */}
        <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all duration-300">
          <span className={`bg-gradient-to-r ${visualizer.color} bg-clip-text text-transparent`}>
            Explore Now
          </span>
          <ArrowRight className={`w-5 h-5 bg-gradient-to-r ${visualizer.color} text-white group-hover:translate-x-1 transition-transform`} />
        </div>
      </div>
    </motion.div>
  );
};

export default function VisualizersOverview() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 px-4 pt-28 pb-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Data Structure
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Select from 10 interactive data structure visualizations to explore operations, 
            learn algorithms, and master CS fundamentals with real-time code examples.
          </p>
        </motion.div>

        {/* Data Structures Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Core Data Structures</h2>
          <p className="text-white/60 mb-8">Master the fundamental building blocks of computer science</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visualizers.map((visualizer, index) => (
              <VisualizerCard 
                key={visualizer.id} 
                visualizer={visualizer} 
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Real-World Use Cases Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Real-World{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Use Cases
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              See how these algorithms power the apps you use every day. Connect theory to practice!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {realWorldUseCases.map((visualizer, index) => (
              <VisualizerCard 
                key={visualizer.id} 
                visualizer={visualizer} 
                index={index + visualizers.length}
              />
            ))}
          </div>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">
              Interactive Learning Experience
            </h2>
            <p className="text-white/70 text-lg">
              Each visualizer includes step-by-step animations, multi-language code examples 
              (Python, JavaScript, Java, C++), and operation history tracking. 
              Master data structures through hands-on exploration!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
