import React from 'react';
import Image from 'next/image';
import { useUser } from '@/context/UserContext';
import { cn } from '@/lib/utils';

interface Badge {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  condition: (stats: { xp: number; level: number; streak: number; completedCount: number }) => boolean;
}

const badges: Badge[] = [
  {
    id: 'first-step',
    name: 'First Step',
    description: 'Complete your first module',
    imagePath: '/assets/badge/first-step.png',
    condition: ({ completedCount }) => completedCount >= 1,
  },
  {
    id: 'code-starter',
    name: 'Code Starter',
    description: 'Complete 5 modules',
    imagePath: '/assets/badge/code-starter.png',
    condition: ({ completedCount }) => completedCount >= 5,
  },
  {
    id: 'xp-hunter',
    name: 'XP Hunter',
    description: 'Earn 500 XP',
    imagePath: '/assets/badge/xp-hunter.png',
    condition: ({ xp }) => xp >= 500,
  },
  {
    id: 'streak-master',
    name: 'Streak Master',
    description: 'Maintain a 7-day streak',
    imagePath: '/assets/badge/streak-master.png',
    condition: ({ streak }) => streak >= 7,
  },
  {
    id: 'level-up',
    name: 'Level Up',
    description: 'Reach level 5',
    imagePath: '/assets/badge/level-up.png',
    condition: ({ level }) => level >= 5,
  },
  {
    id: 'champion',
    name: 'Champion',
    description: 'Complete 10 modules',
    imagePath: '/assets/badge/champion.png',
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
                  : 'border-border opacity-50 grayscale'
              )}
            >
              <div className="relative w-16 h-16 mx-auto mb-2">
                <Image
                  src={badge.imagePath}
                  alt={badge.name}
                  fill
                  sizes="64px"
                  className={cn(
                    'object-contain transition-all',
                    !isEarned && 'opacity-50'
                  )}
                />
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
