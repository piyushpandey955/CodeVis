import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaMousePointer, FaKeyboard, FaPlay } from 'react-icons/fa';
import SectionWrapper from '../../components/layout/SectionWrapper';
import FloatingTree from '../../components/three/FloatingTree';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaMousePointer className="text-4xl text-brand-purple" />,
      title: 'Choose Algorithm',
      description: 'Select from a wide range of data structures and algorithms to visualize.',
    },
    {
      icon: <FaKeyboard className="text-4xl text-brand-purple" />,
      title: 'Input Data',
      description: 'Provide your own data or use our pre-made examples to see the magic happen.',
    },
    {
      icon: <FaPlay className="text-4xl text-brand-purple" />,
      title: 'Visualize & Learn',
      description: 'Watch the step-by-step execution, understand the logic, and master the concept.',
    },
  ];

  return (
    <SectionWrapper threeComponent={FloatingTree}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
        <p className="text-lg text-gray-300 mb-12">Three simple steps to bring algorithms to life.</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {steps.map((step, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
            whileHover={{ scale: 1.05, y: -10 }}
            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300"
          >
            <div className="flex justify-center mb-6">{step.icon}</div>
            <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
            <p className="text-gray-300">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default HowItWorks;
