import { motion, AnimatePresence } from 'framer-motion';
import useCodeVisualizerStore from '../../store/codeVisualizerStore';
import { Code, Loader2 } from 'lucide-react';

export default function VisualizationPanel() {
  const { 
    detectedDSA, 
    executionStates, 
    currentStateIndex,
    isExecuting 
  } = useCodeVisualizerStore();

  const currentState = executionStates[currentStateIndex];
  const data = currentState?.data || [];

  // Render different visualizations based on DSA type
  const renderVisualization = () => {
    if (isExecuting) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-white/70">Executing code...</p>
          </div>
        </div>
      );
    }

    if (!detectedDSA || executionStates.length === 0) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center max-w-md">
            <Code className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Visualization Yet</h3>
            <p className="text-gray-400">
              Write your Java code in the editor and click <strong>Execute</strong> to see the visualization
            </p>
          </div>
        </div>
      );
    }

    switch (detectedDSA) {
      case 'stack':
        return <StackVisualization data={data} operation={currentState?.operation} />;
      case 'queue':
        return <QueueVisualization data={data} operation={currentState?.operation} />;
      case 'array':
        return <ArrayVisualization data={data} operation={currentState?.operation} />;
      default:
        return <GenericVisualization data={data} dsaType={detectedDSA} />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-900">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-white/10">
        <span className="text-white font-semibold">Visualization</span>
        {detectedDSA && (
          <span className="text-sm text-blue-400 font-mono">
            {detectedDSA.toUpperCase()}
          </span>
        )}
      </div>
      
      <div className="flex-1 p-6 overflow-auto">
        {renderVisualization()}
      </div>

      {/* State Info */}
      {currentState && (
        <div className="px-4 py-3 bg-gray-800 border-t border-white/10">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">
              Line {currentState.line} • <span className="text-white">{currentState.operation}</span>
            </span>
            <span className="text-gray-400">
              {currentState.timestamp}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// Stack Visualization
function StackVisualization({ data, operation }) {
  return (
    <div className="flex flex-col items-center justify-end min-h-[400px]">
      {/* Stack Elements */}
      <div className="flex flex-col-reverse items-center gap-2">
        <div className="w-48 h-4 bg-gray-700 rounded-lg border-2 border-gray-600"></div>
        
        <AnimatePresence>
          {data.map((value, index) => (
            <motion.div
              key={`${index}-${value}`}
              initial={{ opacity: 0, y: -50, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className={`
                w-48 h-16 rounded-lg flex items-center justify-center
                text-white text-2xl font-bold border-2
                ${index === data.length - 1 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-300 shadow-lg shadow-purple-500/50' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 border-blue-400'
                }
              `}
            >
              {value}
              {index === data.length - 1 && (
                <span className="absolute -right-16 text-sm text-purple-400 font-semibold">← TOP</span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {data.length === 0 && (
        <div className="text-gray-500 text-center py-8">
          Stack is empty
        </div>
      )}
    </div>
  );
}

// Queue Visualization
function QueueVisualization({ data, operation }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-green-400 text-sm font-semibold">FRONT →</span>
        <div className="flex-1"></div>
        <span className="text-red-400 text-sm font-semibold">← REAR</span>
      </div>

      <div className="flex items-center gap-2">
        <AnimatePresence>
          {data.map((value, index) => (
            <motion.div
              key={`${index}-${value}`}
              initial={{ opacity: 0, x: -50, scale: 0.5 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className={`
                w-20 h-20 rounded-lg flex items-center justify-center
                text-white text-2xl font-bold border-2
                ${index === 0 
                  ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-300' 
                  : index === data.length - 1
                  ? 'bg-gradient-to-br from-red-500 to-pink-600 border-red-300'
                  : 'bg-gradient-to-br from-blue-500 to-purple-600 border-blue-400'
                }
              `}
            >
              {value}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {data.length === 0 && (
        <div className="text-gray-500 text-center py-8">
          Queue is empty
        </div>
      )}
    </div>
  );
}

// Array Visualization
function ArrayVisualization({ data, operation }) {
  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Index Labels */}
      <div className="flex gap-4">
        {data.map((_, index) => (
          <div key={`index-${index}`} className="w-20 text-center">
            <span className="text-sm text-gray-400 font-mono">{index}</span>
          </div>
        ))}
      </div>

      {/* Array Elements */}
      <div className="flex gap-4">
        {data.map((value, index) => (
          <motion.div
            key={`${index}-${value}`}
            initial={{ opacity: 0, scale: 0, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 flex items-center justify-center rounded-xl shadow-lg border-2 border-white/20 bg-gradient-to-br from-blue-500 to-purple-600"
          >
            <span className="text-2xl font-bold text-white">{value}</span>
          </motion.div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-gray-500 text-center py-8">
          Array is empty
        </div>
      )}
    </div>
  );
}

// Generic Visualization (fallback)
function GenericVisualization({ data, dsaType }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">{dsaType.toUpperCase()}</h3>
        <p className="text-gray-400 text-sm">Custom visualization coming soon</p>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-6 border border-white/10">
        <pre className="text-white font-mono text-sm">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
}
