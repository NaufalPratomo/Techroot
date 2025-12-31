import React from 'react';
import { Sparkles, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface AIFeedbackProps {
  hasError: boolean;
  allTestsPassed: boolean;
  errorMessage?: string;
}

const feedbackMessages = {
  success: [
    "Excellent work! Your code is clean and efficient.",
    "Perfect! You've demonstrated a solid understanding of this concept.",
    "Great job! Your solution works exactly as expected.",
    "Well done! Consider exploring edge cases to deepen your understanding.",
  ],
  syntaxError: [
    "I noticed a syntax error. Check for missing brackets, parentheses, or semicolons.",
    "There's a syntax issue in your code. Review the error message for hints.",
    "Syntax errors are common! Double-check your code structure.",
  ],
  runtimeError: [
    "Your code has a runtime error. Make sure all variables are defined before use.",
    "Check if you're accessing properties of undefined values.",
    "Runtime errors often come from unexpected data types. Verify your inputs.",
  ],
  testFailed: [
    "Almost there! Your code runs but doesn't produce the expected output.",
    "The logic isn't quite right. Try tracing through your code step by step.",
    "Check if you're handling all the requirements in the problem.",
    "Review the expected output and compare it with what your code produces.",
  ],
};

const getRandomMessage = (messages: string[]): string => {
  return messages[Math.floor(Math.random() * messages.length)];
};

export const AIFeedback: React.FC<AIFeedbackProps> = ({
  hasError,
  allTestsPassed,
  errorMessage,
}) => {
  let feedbackType: 'success' | 'syntaxError' | 'runtimeError' | 'testFailed';
  let icon: React.ReactNode;
  let bgClass: string;
  let iconClass: string;

  if (allTestsPassed && !hasError) {
    feedbackType = 'success';
    icon = <CheckCircle className="h-5 w-5" />;
    bgClass = 'bg-success/10 border-success/20';
    iconClass = 'text-success';
  } else if (hasError) {
    const isSyntaxError = errorMessage?.toLowerCase().includes('syntax') || 
                          errorMessage?.toLowerCase().includes('unexpected');
    feedbackType = isSyntaxError ? 'syntaxError' : 'runtimeError';
    icon = <XCircle className="h-5 w-5" />;
    bgClass = 'bg-destructive/10 border-destructive/20';
    iconClass = 'text-destructive';
  } else {
    feedbackType = 'testFailed';
    icon = <AlertTriangle className="h-5 w-5" />;
    bgClass = 'bg-secondary border-border';
    iconClass = 'text-muted-foreground';
  }

  const message = getRandomMessage(feedbackMessages[feedbackType]);

  return (
    <div className={`rounded-lg border p-4 ${bgClass}`}>
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 ${iconClass}`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">AI Feedback</span>
          </div>
          <p className="text-sm text-foreground">{message}</p>
        </div>
      </div>
    </div>
  );
};
