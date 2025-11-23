// Animation utility functions for DSA visualizations

export const animationPresets = {
  insert: {
    duration: 0.5,
    ease: 'easeOut',
  },
  delete: {
    duration: 0.4,
    ease: 'easeIn',
  },
  highlight: {
    duration: 0.3,
    ease: 'easeInOut',
  },
  shift: {
    duration: 0.6,
    ease: 'easeInOut',
  },
  swap: {
    duration: 0.5,
    ease: 'easeInOut',
  },
};

export const getAnimationSpeed = (baseSpeed, userSpeed = 1) => {
  return baseSpeed / userSpeed;
};

export const sleep = (ms, speed = 1) => {
  return new Promise(resolve => setTimeout(resolve, ms / speed));
};

export const highlightAnimation = {
  initial: { scale: 1, backgroundColor: 'transparent' },
  animate: { 
    scale: [1, 1.1, 1],
    backgroundColor: ['transparent', '#8B5CF6', 'transparent'],
    transition: { duration: 0.6, ease: 'easeInOut' }
  },
};

export const insertAnimation = {
  initial: { opacity: 0, scale: 0, y: -50 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
};

export const deleteAnimation = {
  initial: { opacity: 1, scale: 1 },
  animate: { 
    opacity: 0, 
    scale: 0,
    transition: { duration: 0.4, ease: 'easeIn' }
  },
};

export const shiftAnimation = (direction = 'right') => ({
  initial: { x: 0 },
  animate: { 
    x: direction === 'right' ? 100 : -100,
    transition: { duration: 0.6, ease: 'easeInOut' }
  },
});

export const swapAnimation = {
  initial: { y: 0 },
  animate: { 
    y: [0, -30, 0],
    transition: { duration: 0.8, ease: 'easeInOut' }
  },
};

// Utility to generate unique IDs
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Format timestamp for operation history
export const formatTimestamp = () => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });
};

// Color utilities for visualizations
export const colors = {
  default: '#6B7280',      // gray-500
  active: '#8B5CF6',       // purple-500
  success: '#10B981',      // green-500
  error: '#EF4444',        // red-500
  warning: '#F59E0B',      // amber-500
  info: '#3B82F6',         // blue-500
};

export const getColorByIndex = (index, total) => {
  const hue = (index / total) * 360;
  return `hsl(${hue}, 70%, 60%)`;
};
