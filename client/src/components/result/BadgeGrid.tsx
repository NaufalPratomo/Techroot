import { Sparkles, LucideIcon } from 'lucide-react';

interface Badge {
    id: string;
    name: string;
    icon: LucideIcon;
    color: string;
    bg: string;
    description: string;
}

interface BadgeGridProps {
    badges: Badge[];
}

export const BadgeGrid = ({ badges }: BadgeGridProps) => {
    if (badges.length === 0) return null;

    // Determine grid layout based on badge count
    const getGridCols = () => {
        if (badges.length === 1) return 'grid-cols-1';
        if (badges.length === 2) return 'grid-cols-1 sm:grid-cols-2';
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-6 mb-6 sm:mb-8 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-[#D7FE44] flex-shrink-0" />
                Badge yang Didapat
            </h3>
            <div className={`grid ${getGridCols()} gap-3`}>
                {badges.map(badge => {
                    const IconComponent = badge.icon;
                    return (
                        <div
                            key={badge.id}
                            className="flex items-center gap-2 sm:gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors min-w-0"
                        >
                            <div className={`h-9 w-9 sm:h-10 sm:w-10 rounded-xl ${badge.bg} flex items-center justify-center flex-shrink-0`}>
                                <IconComponent className={`h-4 w-4 sm:h-5 sm:w-5 ${badge.color}`} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="font-medium text-xs sm:text-sm text-slate-900 truncate">{badge.name}</div>
                                <div className="text-[10px] sm:text-xs text-slate-500 line-clamp-1">{badge.description}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
