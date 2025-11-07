import React, { useState, useEffect, Suspense } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import SectionWrapper from '../../components/layout/SectionWrapper';
import FloatingTree from '../../components/three/FloatingTree';
import FloatingArray from '../../components/three/FloatingArray';
import FloatingStack from '../../components/three/FloatingStack';
import FloatingQueue from '../../components/three/FloatingQueue';

const visualizations = [
  { name: 'Array', component: FloatingArray },
  { name: 'Stack', component: FloatingStack },
  { name: 'Queue', component: FloatingQueue },
];

const VisualDemo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % visualizations.length);
    }, 4000); // Switch every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const CurrentVisualization = visualizations[currentIndex].component;
  const currentName = visualizations[currentIndex].name;

  return (
    <SectionWrapper threeComponent={FloatingTree}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Visual Demo</h2>
        <p className="text-lg text-gray-300 mb-12">
          See our dynamic visualizations in action.
        </p>
        <motion.div 
          initial={{ opacity: 0, x: -100, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="bg-gray-900/50 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl max-w-4xl mx-auto overflow-hidden"
        >
          <div className="bg-gray-800/80 h-10 flex items-center px-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="grow text-center text-gray-300 font-mono text-sm">
              {currentName} Visualization
            </div>
          </div>
          <div className="h-96">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <pointLight position={[-10, -10, -10]} intensity={0.8} color="#8B5CF6" />
                <CurrentVisualization />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
              </Suspense>
            </Canvas>
          </div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
};

export default VisualDemo;
