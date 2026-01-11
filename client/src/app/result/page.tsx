'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Confetti from 'react-confetti';
import { useUser } from '@/context/UserContext';
import { AVAILABLE_BADGES } from '@/constants/badges';

// Components
import { ResultLoading } from '@/components/result/ResultLoading';
import { ResultHeader } from '@/components/result/ResultHeader';
import { ResultStats } from '@/components/result/ResultStats';
import { ProgressSummary } from '@/components/result/ProgressSummary';
import { BadgeGrid } from '@/components/result/BadgeGrid';
import { ResultActions } from '@/components/result/ResultActions';

function ResultContent() {
    const searchParams = useSearchParams();
    const { xp, level, streak, progress } = useUser();

    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [showConfetti, setShowConfetti] = useState(true);

    // Get params from URL
    const pathId = searchParams.get('pathId');
    const moduleId = searchParams.get('moduleId');
    const xpEarned = parseInt(searchParams.get('xp') || '0');

    // Calculate stats
    const completedLessons = progress.completedLessons.length;
    const completedModules = progress.completedModules.length;

    // Determine earned badges based on progress
    const earnedBadges = AVAILABLE_BADGES.filter(badge => {
        switch (badge.id) {
            case 'first-lesson': return completedLessons >= 1;
            case 'quick-learner': return completedLessons >= 5;
            case 'module-master': return completedModules >= 1;
            case 'streak-warrior': return streak >= 3;
            case 'xp-hunter': return xp >= 100;
            default: return false;
        }
    });

    useEffect(() => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });

        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener('resize', handleResize);

        // Stop confetti after 80 seconds
        const timer = setTimeout(() => setShowConfetti(false), 80000);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
            {/* Confetti Animation */}
            {showConfetti && windowSize.width > 0 && (
                <Confetti
                    width={windowSize.width}
                    height={windowSize.height}
                    recycle={false}
                    numberOfPieces={1000}
                    gravity={0.2}
                    colors={['#2443B0', '#D7FE44', '#10B981', '#F59E0B', '#8B5CF6']}
                />
            )}

            <div className="max-w-2xl w-full">
                <ResultHeader />

                <ResultStats
                    xpEarned={xpEarned}
                    totalXp={xp}
                    level={level}
                    streak={streak}
                />

                <ProgressSummary
                    completedLessons={completedLessons}
                    completedModules={completedModules}
                />

                <BadgeGrid badges={earnedBadges} />

                <ResultActions pathId={pathId} moduleId={moduleId} />
            </div>
        </div>
    );
}

export default function ResultPage() {
    return (
        <Suspense fallback={<ResultLoading />}>
            <ResultContent />
        </Suspense>
    );
}
