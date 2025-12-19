import { Editor } from '@monaco-editor/react';
import useCodeVisualizerStore from '../../store/codeVisualizerStore';

export default function CodeEditor() {
  const { code, setCode, language, currentStateIndex, executionStates } = useCodeVisualizerStore();

  // Get the current line being executed
  const currentLine = executionStates[currentStateIndex]?.line;

  const handleEditorChange = (value) => {
    setCode(value || '');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-white/10">
        <span className="text-white font-semibold">Code Editor</span>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">Language:</span>
          <span className="text-white font-mono text-sm">{language.toUpperCase()}</span>
        </div>
      </div>
      
      <div className="flex-1">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            lineDecorationsWidth: 10,
            lineNumbersMinChars: 3,
            glyphMargin: true,
            folding: true,
            // Highlight current line
            renderLineHighlight: 'line',
            renderLineHighlightOnlyWhenFocus: false,
          }}
          // Highlight the current executing line
          beforeMount={(monaco) => {
            monaco.editor.defineTheme('execution-theme', {
              base: 'vs-dark',
              inherit: true,
              rules: [],
              colors: {
                'editor.lineHighlightBackground': '#3b82f640',
                'editor.lineHighlightBorder': '#3b82f6'
              }
            });
          }}
          onMount={(editor, monaco) => {
            // Highlight current line during execution
            if (currentLine) {
              editor.revealLineInCenter(currentLine);
              editor.deltaDecorations([], [
                {
                  range: new monaco.Range(currentLine, 1, currentLine, 1),
                  options: {
                    isWholeLine: true,
                    className: 'currentExecutionLine',
                    glyphMarginClassName: 'currentExecutionGlyph',
                  }
                }
              ]);
            }
          }}
        />
      </div>
      
      {/* Line highlight styles */}
      <style jsx global>{`
        .currentExecutionLine {
          background: rgba(59, 130, 246, 0.2) !important;
          border-left: 3px solid #3b82f6 !important;
        }
        .currentExecutionGlyph {
          background: #3b82f6;
          width: 4px !important;
          margin-left: 3px;
        }
      `}</style>
    </div>
  );
}
