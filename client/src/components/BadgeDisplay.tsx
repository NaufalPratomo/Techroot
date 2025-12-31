import React from 'react';
import { Award, Flame, Zap, BookOpen, Code2, Trophy } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { cn } from '@/lib/utils';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  condition: (stats: { xp: number; level: number; streak: number; completedCount: number }) => boolean;
}

const badges: Badge[] = [
  {
    id: 'first-step',
    name: 'First Step',
    description: 'Complete your first module',
    icon: <BookOpen className="h-5 w-5" />,
    condition: ({ completedCount }) => completedCount >= 1,
  },
  {
    id: 'code-starter',
    name: 'Code Starter',
    description: 'Complete 5 modules',
    icon: <Code2 className="h-5 w-5" />,
    condition: ({ completedCount }) => completedCount >= 5,
  },
  {
    id: 'xp-hunter',
    name: 'XP Hunter',
    description: 'Earn 500 XP',
    icon: <Zap className="h-5 w-5" />,
    condition: ({ xp }) => xp >= 500,
  },
  {
    id: 'streak-master',
    name: 'Streak Master',
    description: 'Maintain a 7-day streak',
    icon: <Flame className="h-5 w-5" />,
    condition: ({ streak }) => streak >= 7,
  },
  {
    id: 'level-up',
    name: 'Level Up',
    description: 'Reach level 5',
    icon: <Trophy className="h-5 w-5" />,
    condition: ({ level }) => level >= 5,
  },
  {
    id: 'champion',
    name: 'Champion',
    description: 'Complete 10 modules',
    icon: <Award className="h-5 w-5" />,
    condition: ({ completedCount }) => completedCount >= 10,
  },
];

export const BadgeDisplay: React.FC = () => {
  const { xp, level, streak, progress } = useUser();
  const completedCount = progress.completedModules.length;
  const stats = { xp, level, streak, completedCount };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Badges</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {badges.map(badge => {
          const isEarned = badge.condition(stats);
          
          return (
            <div
              key={badge.id}
              className={cn(
                'border rounded-lg p-4 text-center transition-all',
                isEarned 
                  ? 'border-foreground/20 bg-secondary' 
                  : 'border-border opacity-50'
              )}
            >
              <div className={cn(
                'h-10 w-10 rounded-full mx-auto mb-2 flex items-center justify-center',
                isEarned ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground'
              )}>
                {badge.icon}
              </div>
              <p className="text-sm font-medium">{badge.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
