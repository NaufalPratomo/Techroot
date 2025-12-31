import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { TestCase } from '@/data/learningPaths';
import { AIFeedback } from './AIFeedback';

interface CodePlaygroundProps {
  initialCode?: string;
  testCases?: TestCase[];
  onSuccess?: () => void;
  showAIFeedback?: boolean;
}

interface ExecutionResult {
  output: string;
  error: string | null;
  success: boolean;
}

export const CodePlayground: React.FC<CodePlaygroundProps> = ({
  initialCode = '',
  testCases = [],
  onSuccess,
  showAIFeedback = true,
}) => {
  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<{ passed: boolean; message: string }[]>([]);

  const executeCode = useCallback((codeToRun: string): ExecutionResult => {
    let output = '';
    const originalLog = console.log;
    
    // Capture console.log outputs
    const logs: string[] = [];
    console.log = (...args) => {
      logs.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      ).join(' '));
    };

    try {
      // Create a function from the code and execute it
      const fn = new Function(codeToRun);
      fn();
      output = logs.join('\n');
      
      return { output, error: null, success: true };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Unknown error';
      return { output: logs.join('\n'), error, success: false };
    } finally {
      console.log = originalLog;
    }
  }, []);

  const runCode = useCallback(() => {
    setIsRunning(true);
    setTestResults([]);
    
    // Small delay for UI feedback
    setTimeout(() => {
      const executionResult = executeCode(code);
      setResult(executionResult);

      // Run test cases if provided
      if (testCases.length > 0 && executionResult.success) {
        const results = testCases.map(testCase => {
          const output = executionResult.output.trim();
          const expected = testCase.expected.trim();
          const passed = output === expected;
          
          return {
            passed,
            message: passed 
              ? `✓ ${testCase.description}` 
              : `✗ ${testCase.description}\n  Expected: ${expected}\n  Got: ${output}`,
          };
        });
        
        setTestResults(results);
        
        if (results.every(r => r.passed) && onSuccess) {
          onSuccess();
        }
      }
      
      setIsRunning(false);
    }, 100);
  }, [code, executeCode, testCases, onSuccess]);

  const resetCode = useCallback(() => {
    setCode(initialCode);
    setResult(null);
    setTestResults([]);
  }, [initialCode]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      
      setCode(code.substring(0, start) + '  ' + code.substring(end));
      
      // Set cursor position after tab
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runCode();
    }
  }, [code, runCode]);

  const allTestsPassed = testResults.length > 0 && testResults.every(r => r.passed);
  const hasError = result?.error !== null;

  return (
    <div className="flex flex-col gap-4">
      {/* Editor */}
      <div className="relative">
        <div className="absolute top-3 left-3 text-xs text-muted-foreground font-mono">
          JavaScript
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          className="code-editor w-full min-h-[200px] resize-y pt-8 focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="// Write your code here..."
          spellCheck={false}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <Button onClick={runCode} disabled={isRunning} className="gap-2">
          <Play className="h-4 w-4" />
          {isRunning ? 'Running...' : 'Run Code'}
        </Button>
        <Button variant="outline" onClick={resetCode} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
        <span className="text-xs text-muted-foreground ml-auto hidden sm:inline">
          Ctrl + Enter to run
        </span>
      </div>

      {/* Output Panel */}
      {result && (
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-secondary px-4 py-2 border-b border-border flex items-center gap-2">
            {result.error ? (
              <XCircle className="h-4 w-4 text-destructive" />
            ) : allTestsPassed ? (
              <CheckCircle className="h-4 w-4 text-success" />
            ) : (
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="text-sm font-medium">Output</span>
          </div>
          <div className="p-4 font-mono text-sm bg-background">
            {result.output && (
              <pre className="whitespace-pre-wrap text-foreground">{result.output}</pre>
            )}
            {result.error && (
              <pre className="whitespace-pre-wrap text-destructive mt-2">
                Error: {result.error}
              </pre>
            )}
            {!result.output && !result.error && (
              <span className="text-muted-foreground">No output</span>
            )}
          </div>
        </div>
      )}

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-secondary px-4 py-2 border-b border-border">
            <span className="text-sm font-medium">Test Results</span>
          </div>
          <div className="p-4 space-y-2">
            {testResults.map((test, index) => (
              <div
                key={index}
                className={`font-mono text-sm ${
                  test.passed ? 'text-success' : 'text-destructive'
                }`}
              >
                <pre className="whitespace-pre-wrap">{test.message}</pre>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Feedback */}
      {showAIFeedback && result && (
        <AIFeedback
          hasError={hasError}
          allTestsPassed={allTestsPassed}
          errorMessage={result.error || undefined}
        />
      )}
    </div>
  );
};
