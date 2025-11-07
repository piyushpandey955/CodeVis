// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Eye, Code, Zap } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import FloatingData from '../../components/three/FloatingData';

const featureVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: 'easeOut',
    },
  }),
};

const FeatureCard = ({ icon, title, description, index }) => (
  <motion.div
    custom={index}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.5 }}
    variants={featureVariants}
    className="bg-white/5 p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center"
  >
    <div className="bg-white/10 p-4 rounded-full mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
    <p className="text-white/70 leading-relaxed">{description}</p>
  </motion.div>
);

export default function Features() {
  const featuresData = [
    {
      icon: <Eye className="w-8 h-8 text-purple-400" />,
      title: 'Stunning Visualizations',
      description: 'Go beyond theory with beautiful, interactive 3D models of every data structure. See algorithms in action like never before.',
    },
    {
      icon: <Code className="w-8 h-8 text-green-400" />,
      title: 'Live Code Sync',
      description: 'Write code in our built-in editor and watch the visualization update in real-time. Supports multiple programming languages.',
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-300" />,
      title: 'AI-Powered Learning',
      description: 'Our intelligent system provides contextual hints, explains complex steps, and helps you understand the "why" behind the code.',
    },
  ];

  return (
    <section className="relative py-24 bg-[#0a001f] overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <FloatingData />
        </Canvas>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tighter">
            Everything You Need to <span className="text-purple-400">Truly Understand</span>
          </h2>
          <p className="text-lg md:text-xl text-white/80 mt-4 max-w-3xl mx-auto">
            CodeVis is more than just a visualizer; it's a complete learning ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <FeatureCard key={index} index={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
