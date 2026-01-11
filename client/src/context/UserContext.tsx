"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { User, Badge, Progress, GitHubLoginResult, UserContextType } from '@/types';
import { storage, API_URL } from '@/lib/api';
import { calculateLevel, toDateString } from '@/lib/helpers';
import { INITIAL_PROGRESS, INITIAL_USER_STATE } from '@/constants/userContext';
import { authService, progressService } from '@/services/userService';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [xp, setXP] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastActiveDate, setLastActiveDate] = useState<string | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState<Progress>(INITIAL_PROGRESS);

  // ==================== PROGRESS MANAGEMENT ====================  
  const fetchProgress = useCallback(async () => {
    try {
      const data = await progressService.fetchProgress();
      if (data.success && data.data) {
        const d = data.data;
        setProgress({
          completedLessons: d.completed_lessons || [],
          completedModules: d.completed_modules || [],
          currentPath: d.current_path || null,
          currentModule: d.current_module || null,
          currentLesson: d.current_lesson || null
        });
        if (d.xp !== undefined) setXP(d.xp);  
        if (d.streak !== undefined) setStreak(d.streak);
        if (d.last_active_date) setLastActiveDate(d.last_active_date);
        if (d.badges) setBadges(d.badges);
      }
    } catch {
      const saved = storage.get<Progress>('progress');
      if (saved) setProgress(saved);
      const savedXP = storage.get<number>('xp');
      const savedStreak = storage.get<number>('streak');
      if (savedXP) setXP(savedXP);
      if (savedStreak) setStreak(savedStreak);
    }
  }, []);

  const syncProgress = useCallback(async () => {
    if (!user) return;
    try {
      await progressService.syncProgress(progress, xp, streak);
    } catch { }
  }, [user, progress, xp, streak]);

  // ==================== AUTHENTICATION ====================
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const data = await authService.login(email, password);
      if (data.success && data.data) {
        const { user: u, token } = data.data;
        setUser(u);
        storage.set('token', token);
        storage.set('user', u);
        await fetchProgress();
        return true;
      }
      return false;
    } catch {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, institution?: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const data = await authService.register(name, email, password, institution);
      if (data.success && data.data) {
        const { user: u, token } = data.data;
        setUser(u);
        setXP(INITIAL_USER_STATE.xp);
        setStreak(INITIAL_USER_STATE.streak);
        setLastActiveDate(toDateString());
        setProgress(INITIAL_PROGRESS);
        setBadges(INITIAL_USER_STATE.badges);
        storage.set('token', token);
        storage.set('user', u);
        return true;
      }
      return false;
    } catch {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setXP(0);
    setStreak(0);
    setLastActiveDate(null);
    setProgress(INITIAL_PROGRESS);
    setBadges([]);
    storage.clearAll();
  };

  // ==================== GITHUB OAUTH ====================
  const initiateGitHubLogin = useCallback(async () => {
    try {
      console.log('🔍 Initiating GitHub login with API_URL:', API_URL);
      const data = await authService.initiateGitHubOAuth();
      console.log('✅ GitHub OAuth response:', data);
      if (data.success && data.data?.url) {
        window.location.href = data.data.url;
      }
    } catch (error) {
      console.error('❌ Failed to initiate GitHub login:', error);
    }
  }, []);

  const loginWithGitHub = useCallback(async (code: string): Promise<GitHubLoginResult> => {
    setIsLoading(true);
    try {
      const data = await authService.loginWithGitHub(code);

      if (data.success && data.data) {
        const { user: u, token, isNewUser } = data.data;
        setUser(u);
        storage.set('token', token);
        storage.set('user', u);

        if (isNewUser) {
          setXP(INITIAL_USER_STATE.xp);
          setStreak(INITIAL_USER_STATE.streak);
          setLastActiveDate(toDateString());
          setProgress(INITIAL_PROGRESS);
          setBadges(INITIAL_USER_STATE.badges);
        } else {
          await fetchProgress();
        }

        return { success: true, isNewUser };
      }

      return { success: false, message: data.message || 'Login gagal' };
    } catch (error) {
      return { success: false, message: 'Terjadi kesalahan' };
    } finally {
      setIsLoading(false);
    }
  }, [fetchProgress]);

  // ==================== PROGRESS ACTIONS ====================
  const addXP = useCallback((amount: number) => setXP(prev => prev + amount), []);

  const completeLesson = useCallback(async (moduleId: string, lessonId: string, xpReward: number) => {
    const key = `${moduleId}:${lessonId}`;
    setProgress(p => p.completedLessons.includes(key) ? p : { ...p, completedLessons: [...p.completedLessons, key] });
    setXP(p => p + xpReward);
    try {
      await progressService.completeLesson(key, xpReward);
    } catch { }
  }, []);

  const completeModule = useCallback(async (pathId: string, moduleId: string, xpReward?: number) => {
    const key = `${pathId}:${moduleId}`;
    setProgress(p => p.completedModules.includes(key) ? p : { ...p, completedModules: [...p.completedModules, key] });
    if (xpReward) setXP(p => p + xpReward);
    try {
      await progressService.completeModule(key, xpReward || 0);
    } catch { }
  }, []);

  const setCurrentPosition = useCallback((pathId: string, moduleId: string, lessonId?: string) => {
    setProgress(p => ({ ...p, currentPath: pathId, currentModule: moduleId, currentLesson: lessonId || null }));
    progressService.updateCurrentPosition(pathId, moduleId, lessonId).catch(() => { });
  }, []);

  const updateUser = useCallback((u: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...u } : null);
  }, []);

  // ==================== LIFECYCLE EFFECTS ====================
  useEffect(() => {
    const loadUser = async () => {
      const savedUser = storage.get<User>('user');
      const token = storage.get<string>('token');
      if (savedUser && token) {
        setUser(savedUser);
        await fetchProgress();
      }
      setIsLoading(false);
    };
    loadUser();
  }, [fetchProgress]);

  useEffect(() => {
    if (user) {
      storage.set('user', user);
      storage.set('progress', progress);
      storage.set('xp', xp);
      storage.set('streak', streak);
    }
  }, [user, progress, xp, streak]);

  useEffect(() => {
    const handleUnload = () => {
      if (user && storage.get('token')) {
        navigator.sendBeacon(
          `${API_URL}/api/progress/sync`,
          new Blob([JSON.stringify({
            completed_lessons: progress.completedLessons,
            completed_modules: progress.completedModules,
            current_path: progress.currentPath,
            current_module: progress.currentModule,
            current_lesson: progress.currentLesson,
            xp,
            streak
          })], { type: 'application/json' })
        );
      }
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [user, progress, xp, streak]);

  // ==================== CONTEXT PROVIDER ====================
  const contextValue: UserContextType = {
    user,
    xp,
    level: calculateLevel(xp),
    streak,
    lastActiveDate,
    progress,
    badges,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    addXP,
    completeLesson,
    completeModule,
    setCurrentPosition,
    syncProgress,
    updateUser,
    initiateGitHubLogin,
    loginWithGitHub
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
