import React from 'react';
import { Zap, Flame, Trophy, Target } from 'lucide-react';
import { useUser } from '@/context/UserContext';

const XP_PER_LEVEL = 200;

export const StatsDisplay: React.FC = () => {
  const { xp, level, streak, progress } = useUser();
  
  const currentLevelXP = xp % XP_PER_LEVEL;
  const progressToNextLevel = (currentLevelXP / XP_PER_LEVEL) * 100;
  const xpToNextLevel = XP_PER_LEVEL - currentLevelXP;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* XP Card */}
      <div className="border border-border rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total XP</span>
          <Zap className="h-4 w-4 text-muted-foreground" />
        </div>
        <p className="text-2xl font-bold">{xp}</p>
      </div>

      {/* Level Card */}
      <div className="border border-border rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Level</span>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </div>
        <p className="text-2xl font-bold">{level}</p>
        <div className="space-y-1">
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-foreground rounded-full transition-all duration-300"
              style={{ width: `${progressToNextLevel}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">{xpToNextLevel} XP to next level</p>
        </div>
      </div>

      {/* Streak Card */}
      <div className="border border-border rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Day Streak</span>
          <Flame className="h-4 w-4 text-muted-foreground" />
        </div>
        <p className="text-2xl font-bold">{streak}</p>
        <p className="text-xs text-muted-foreground">
          {streak === 0 ? 'Start your streak today!' : 'Keep it going!'}
        </p>
      </div>

      {/* Completed Modules Card */}
      <div className="border border-border rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Completed</span>
          <Target className="h-4 w-4 text-muted-foreground" />
        </div>
        <p className="text-2xl font-bold">{progress.completedModules.length}</p>
        <p className="text-xs text-muted-foreground">modules finished</p>
      </div>
    </div>
  );
};
