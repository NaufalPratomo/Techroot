import { Zap, Trophy, Star, Target } from 'lucide-react';

interface ResultStatsProps {
    xpEarned: number;
    totalXp: number;
    level: number;
    streak: number;
}

export const ResultStats = ({ xpEarned, totalXp, level, streak }: ResultStatsProps) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-3 sm:p-4 text-center shadow-sm">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-[#2443B0]/10 flex items-center justify-center mx-auto mb-1.5 sm:mb-2">
                    <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-[#2443B0]" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900">+{xpEarned}</div>
                <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5">XP Earned</div>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-3 sm:p-4 text-center shadow-sm">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-1.5 sm:mb-2">
                    <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900">{totalXp}</div>
                <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5">Total XP</div>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-3 sm:p-4 text-center shadow-sm">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-amber-100 flex items-center justify-center mx-auto mb-1.5 sm:mb-2">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900">Lv.{level}</div>
                <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5">Level</div>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-3 sm:p-4 text-center shadow-sm">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-orange-100 flex items-center justify-center mx-auto mb-1.5 sm:mb-2">
                    <Target className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900">{streak}</div>
                <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5">Day Streak</div>
            </div>
        </div>
    );
};
