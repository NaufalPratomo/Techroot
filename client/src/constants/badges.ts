import { Star, Zap, Award, Target, Trophy } from 'lucide-react';
import { BadgeDefinition } from '@/types';

export const AVAILABLE_BADGES: BadgeDefinition[] = [
    {
        id: 'first-lesson',
        name: 'Langkah Pertama',
        icon: Star,
        color: 'text-yellow-500',
        bg: 'bg-yellow-100',
        description: 'Menyelesaikan lesson pertama'
    },
    {
        id: 'quick-learner',
        name: 'Pembelajar Cepat',
        icon: Zap,
        color: 'text-blue-500',
        bg: 'bg-blue-100',
        description: 'Menyelesaikan 5 lesson'
    },
    {
        id: 'module-master',
        name: 'Master Modul',
        icon: Award,
        color: 'text-purple-500',
        bg: 'bg-purple-100',
        description: 'Menyelesaikan 1 modul'
    },
    {
        id: 'streak-warrior',
        name: 'Pejuang Streak',
        icon: Target,
        color: 'text-orange-500',
        bg: 'bg-orange-100',
        description: 'Streak 3 hari berturut-turut'
    },
    {
        id: 'xp-hunter',
        name: 'Pemburu XP',
        icon: Trophy,
        color: 'text-emerald-500',
        bg: 'bg-emerald-100',
        description: 'Mengumpulkan 100 XP'
    },
];
