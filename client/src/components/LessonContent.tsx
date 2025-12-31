import React, { useState, useEffect } from 'react';
import { Lesson } from '@/data/learningPaths';
import { CodePlayground } from './CodePlayground';
import { Button } from '@/components/ui/button';
import { Play, CheckCircle, BookOpen, Video, FileQuestion } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LessonContentProps {
  lesson: Lesson;
  isCompleted: boolean;
  onComplete: () => void;
}

// Simple markdown renderer for the content
const MarkdownContent: React.FC<{ content: string }> = ({ content }) => {
  const renderContent = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeContent = '';
    let codeLanguage = '';

    lines.forEach((line, index) => {
      // Code block handling
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLanguage = line.slice(3).trim();
          codeContent = '';
        } else {
          inCodeBlock = false;
          elements.push(
            <div key={`code-${index}`} className="my-4 rounded-lg overflow-hidden bg-secondary">
              <div className="px-4 py-2 text-xs text-muted-foreground border-b border-border">
                {codeLanguage || 'code'}
              </div>
              <pre className="p-4 overflow-x-auto text-sm font-mono">
                <code>{codeContent.trim()}</code>
              </pre>
            </div>
          );
        }
        return;
      }

      if (inCodeBlock) {
        codeContent += line + '\n';
        return;
      }

      // Headers
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={index} className="text-3xl font-bold mb-6 mt-8 first:mt-0">
            {line.slice(2)}
          </h1>
        );
        return;
      }
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-2xl font-bold mb-4 mt-6">
            {line.slice(3)}
          </h2>
        );
        return;
      }
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-lg font-bold mb-3 mt-4">
            {line.slice(4)}
          </h3>
        );
        return;
      }

      // List items
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const content = line.slice(2);
        elements.push(
          <li key={index} className="ml-4 mb-2 text-muted-foreground">
            {renderInlineCode(content)}
          </li>
        );
        return;
      }

      // Numbered list
      if (/^\d+\.\s/.test(line)) {
        const content = line.replace(/^\d+\.\s/, '');
        elements.push(
          <li key={index} className="ml-4 mb-2 text-muted-foreground list-decimal">
            {renderInlineCode(content)}
          </li>
        );
        return;
      }

      // Empty line
      if (line.trim() === '') {
        elements.push(<div key={index} className="h-4" />);
        return;
      }

      // Table row
      if (line.includes('|') && line.trim().startsWith('|')) {
        // Skip table for now, just render as text
        return;
      }

      // Regular paragraph
      elements.push(
        <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
          {renderInlineCode(line)}
        </p>
      );
    });

    return elements;
  };

  const renderInlineCode = (text: string): React.ReactNode => {
    const parts = text.split(/(`[^`]+`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="px-1.5 py-0.5 bg-secondary rounded text-sm font-mono text-foreground">
            {part.slice(1, -1)}
          </code>
        );
      }
      // Handle bold
      if (part.includes('**')) {
        const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
        return boldParts.map((bp, j) => {
          if (bp.startsWith('**') && bp.endsWith('**')) {
            return <strong key={`${i}-${j}`}>{bp.slice(2, -2)}</strong>;
          }
          return bp;
        });
      }
      return part;
    });
  };

  return <div className="prose-content">{renderContent(content)}</div>;
};

// Material Content Component
const MaterialContent: React.FC<LessonContentProps> = ({ lesson, isCompleted, onComplete }) => {
  const [hasRead, setHasRead] = useState(isCompleted);

  useEffect(() => {
    // Mark as read after 10 seconds if not already completed
    if (!isCompleted) {
      const timer = setTimeout(() => {
        setHasRead(true);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isCompleted]);

  return (
    <div className="max-w-3xl">
      <MarkdownContent content={lesson.content || ''} />
      
      {!isCompleted && (
        <div className="mt-8 pt-8 border-t border-border">
          <Button 
            onClick={onComplete}
            disabled={!hasRead}
            className="gap-2"
          >
            <CheckCircle className="h-4 w-4" />
            {hasRead ? 'Tandai Selesai' : 'Membaca...'}
          </Button>
          {!hasRead && (
            <p className="text-xs text-muted-foreground mt-2">
              Baca materi ini untuk melanjutkan
            </p>
          )}
        </div>
      )}
    </div>
  );
};

// Video Content Component
const VideoContent: React.FC<LessonContentProps> = ({ lesson, isCompleted, onComplete }) => {
  const [hasWatched, setHasWatched] = useState(isCompleted);

  return (
    <div className="max-w-4xl">
      {/* Video Player */}
      <div className="aspect-video bg-secondary rounded-lg mb-6 overflow-hidden">
        {lesson.videoUrl ? (
          <iframe
            src={lesson.videoUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <Video className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Video tidak tersedia</p>
            </div>
          </div>
        )}
      </div>

      {/* Description */}
      {lesson.content && (
        <div className="mb-8">
          <MarkdownContent content={lesson.content} />
        </div>
      )}

      {!isCompleted && (
        <div className="mt-8 pt-8 border-t border-border">
          <Button 
            onClick={() => {
              setHasWatched(true);
              onComplete();
            }}
            className="gap-2"
          >
            <CheckCircle className="h-4 w-4" />
            Selesai Menonton
          </Button>
        </div>
      )}
    </div>
  );
};

// Quiz Content Component
const QuizContent: React.FC<LessonContentProps> = ({ lesson, isCompleted, onComplete }) => {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileQuestion className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Kuis Interaktif</h2>
            <p className="text-sm text-muted-foreground">
              Selesaikan tantangan coding di bawah ini
            </p>
          </div>
        </div>
        
        {lesson.content && (
          <div className="mb-6 p-4 bg-muted/50 rounded-lg">
            <MarkdownContent content={lesson.content} />
          </div>
        )}
      </div>

      <CodePlayground
        initialCode={lesson.starterCode || '// Tulis kode Anda di sini\n'}
        testCases={lesson.testCases || []}
        onSuccess={onComplete}
        showAIFeedback={true}
      />
    </div>
  );
};

// Main Lesson Content Router
export const LessonContent: React.FC<LessonContentProps> = (props) => {
  const { lesson } = props;

  const TypeBadge = () => {
    const config = {
      material: { icon: BookOpen, label: 'Materi', color: 'text-blue-500' },
      video: { icon: Video, label: 'Video', color: 'text-purple-500' },
      quiz: { icon: FileQuestion, label: 'Kuis', color: 'text-amber-500' }
    };

    const { icon: Icon, label, color } = config[lesson.type];

    return (
      <div className={cn("inline-flex items-center gap-1.5 text-sm mb-4", color)}>
        <Icon className="h-4 w-4" />
        <span>{label}</span>
        {lesson.isFree && (
          <span className="ml-2 px-2 py-0.5 bg-success/10 text-success text-xs rounded-full">
            Gratis
          </span>
        )}
      </div>
    );
  };

  return (
    <div>
      <TypeBadge />
      <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>
      
      {lesson.type === 'material' && <MaterialContent {...props} />}
      {lesson.type === 'video' && <VideoContent {...props} />}
      {lesson.type === 'quiz' && <QuizContent {...props} />}
    </div>
  );
};
