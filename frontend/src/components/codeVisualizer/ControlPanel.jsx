import { Play, FileCode, AlertCircle } from 'lucide-react';
import useCodeVisualizerStore from '../../store/codeVisualizerStore';

const JAVA_EXAMPLES = {
  stack: `import java.util.Stack;

public class StackExample {
    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();
        
        stack.push(10);
        stack.push(20);
        stack.push(30);
        stack.pop();
        stack.push(40);
    }
}`,
  queue: `import java.util.LinkedList;
import java.util.Queue;

public class QueueExample {
    public static void main(String[] args) {
        Queue<Integer> queue = new LinkedList<>();
        
        queue.add(5);
        queue.add(10);
        queue.add(15);
        queue.poll();
        queue.add(20);
    }
}`,
  array: `import java.util.ArrayList;

public class ArrayExample {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        
        list.add(1);
        list.add(2);
        list.add(3);
        list.add(1, 99);  // Insert 99 at index 1
        list.add(4);
    }
}`,
};

export default function ControlPanel() {
  const {
    code,
    setCode,
    language,
    setLanguage,
    executeCode,
    isExecuting,
    errors,
    executionLog
  } = useCodeVisualizerStore();

  const handleExecute = () => {
    executeCode();
  };

  const loadExample = (exampleKey) => {
    if (language === 'java') {
      setCode(JAVA_EXAMPLES[exampleKey]);
    }
  };

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {/* Language Selector */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-400 font-semibold whitespace-nowrap">Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          disabled={isExecuting}
          className="px-3 py-2 bg-gray-700 text-white rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer disabled:opacity-50 text-sm"
        >
          <option value="java">Java</option>
          <option value="python" disabled>Python (Soon)</option>
          <option value="cpp" disabled>C++ (Soon)</option>
          <option value="javascript" disabled>JavaScript (Soon)</option>
        </select>
      </div>

      {/* Divider */}
      <div className="h-8 w-px bg-white/10"></div>

      {/* Load Examples */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-400 font-semibold flex items-center gap-1 whitespace-nowrap">
          <FileCode className="w-4 h-4" />
          Examples:
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => loadExample('stack')}
            disabled={isExecuting}
            className="px-3 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 rounded-lg text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
          >
            Stack
          </button>
          <button
            onClick={() => loadExample('queue')}
            disabled={isExecuting}
            className="px-3 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-300 rounded-lg text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
          >
            Queue
          </button>
          <button
            onClick={() => loadExample('array')}
            disabled={isExecuting}
            className="px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-300 rounded-lg text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
          >
            ArrayList
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="h-8 w-px bg-white/10"></div>

      {/* Execute Button */}
      <button
        onClick={handleExecute}
        disabled={isExecuting || !code.trim()}
        className="flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all shadow-lg cursor-pointer"
      >
        <Play className="w-4 h-4" />
        {isExecuting ? 'Executing...' : 'Execute'}
      </button>

      {/* Errors - Inline notification */}
      {errors.length > 0 && (
        <>
          <div className="h-8 w-px bg-white/10"></div>
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <div className="text-xs text-red-300">
              {errors[0].message}
              {errors.length > 1 && ` (+${errors.length - 1} more)`}
            </div>
          </div>
        </>
      )}

      {/* Execution Log - Compact inline */}
      {executionLog.length > 0 && executionLog[executionLog.length - 1] && (
        <>
          <div className="h-8 w-px bg-white/10"></div>
          <div className={`text-xs ${
            executionLog[executionLog.length - 1].type === 'error' ? 'text-red-400' :
            executionLog[executionLog.length - 1].type === 'success' ? 'text-green-400' :
            'text-gray-300'
          }`}>
            {executionLog[executionLog.length - 1].message}
          </div>
        </>
      )}
    </div>
  );
}
