import { Progress, Badge } from '@/types';

export const INITIAL_PROGRESS: Progress = {
    completedLessons: [],
    completedModules: [],
    currentPath: null,
    currentModule: null,
    currentLesson: null
};

export const INITIAL_USER_STATE: {
    xp: number;
    streak: number;
    badges: Badge[];
} = {
    xp: 0,
    streak: 1,
    badges: []
};
