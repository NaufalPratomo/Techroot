import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Lightbulb, Layout, ArrowRight } from 'lucide-react';
import { LearningPath } from '@/data/learningPaths';
import { useUser } from '@/context/UserContext';

interface PathCardProps {
  path: LearningPath;
}

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="h-6 w-6" />,
  Lightbulb: <Lightbulb className="h-6 w-6" />,
  Layout: <Layout className="h-6 w-6" />,
};

export const PathCard: React.FC<PathCardProps> = ({ path }) => {
  const { progress } = useUser();
  
  const completedCount = path.modules.filter(m => 
    progress.completedModules.includes(`${path.id}:${m.id}`)
  ).length;
  
  const totalModules = path.modules.length;
  const progressPercent = totalModules > 0 ? (completedCount / totalModules) * 100 : 0;

  return (
    <Link to={`/paths/${path.id}`}>
      <div className="group border border-border rounded-lg p-6 card-hover h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center text-foreground">
            {iconMap[path.icon] || <Code2 className="h-6 w-6" />}
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
        </div>
        
        <h3 className="font-semibold text-lg mb-2">{path.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 flex-1">{path.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{totalModules} modules</span>
            <span className="font-medium">{completedCount}/{totalModules} completed</span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-foreground rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};
