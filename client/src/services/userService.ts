import { User, Progress, Badge } from '@/types';
import { api } from '@/lib/api';

interface ProgressApiResponse {
    success: boolean;
    data?: {
        completed_lessons?: string[];
        completed_modules?: string[];
        current_path?: string | null;
        current_module?: string | null;
        current_lesson?: string | null;
        xp?: number;
        streak?: number;
        last_active_date?: string;
        badges?: Badge[];
    };
}

interface AuthApiResponse {
    success: boolean;
    data?: {
        user: User;
        token: string;
        isNewUser?: boolean;
    };
    message?: string;
}

export const authService = {
    async login(email: string, password: string): Promise<AuthApiResponse> {
        return api<AuthApiResponse>('/api/auth/login', {
            method: 'POST',
            body: { email, password }
        });
    },

    async register(name: string, email: string, password: string, institution?: string): Promise<AuthApiResponse> {
        return api<AuthApiResponse>('/api/auth/register', {
            method: 'POST',
            body: { name, email, password, institution }
        });
    },

    async initiateGitHubOAuth(): Promise<{ success: boolean; data?: { url: string } }> {
        return api('/api/auth/github');
    },

    async loginWithGitHub(code: string): Promise<AuthApiResponse> {
        return api<AuthApiResponse>('/api/auth/github/callback', {
            method: 'POST',
            body: { code }
        });
    }
};

export const progressService = {
    async fetchProgress(): Promise<ProgressApiResponse> {
        return api<ProgressApiResponse>('/api/progress');
    },

    async completeLesson(lessonKey: string, xpReward: number): Promise<void> {
        await api('/api/progress/lesson', {
            method: 'POST',
            body: { lesson_key: lessonKey, xp_reward: xpReward }
        });
    },

    async completeModule(moduleKey: string, xpReward: number): Promise<void> {
        await api('/api/progress/module', {
            method: 'POST',
            body: { module_key: moduleKey, xp_reward: xpReward }
        });
    },

    async updateCurrentPosition(pathId: string, moduleId: string, lessonId?: string): Promise<void> {
        await api('/api/progress/current', {
            method: 'PUT',
            body: { current_path: pathId, current_module: moduleId, current_lesson: lessonId }
        });
    },

    async syncProgress(progress: Progress, xp: number, streak: number): Promise<void> {
        await api('/api/progress/sync', {
            method: 'POST',
            body: {
                completed_lessons: progress.completedLessons,
                completed_modules: progress.completedModules,
                current_path: progress.currentPath,
                current_module: progress.currentModule,
                current_lesson: progress.currentLesson,
                xp,
                streak
            }
        });
    }
};
