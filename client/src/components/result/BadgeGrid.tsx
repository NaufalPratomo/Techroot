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

    return (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-8 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#D7FE44]" />
                Badge yang Didapat
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {badges.map(badge => {
                    const IconComponent = badge.icon;
                    return (
                        <div
                            key={badge.id}
                            className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                        >
                            <div className={`h-10 w-10 rounded-xl ${badge.bg} flex items-center justify-center flex-shrink-0`}>
                                <IconComponent className={`h-5 w-5 ${badge.color}`} />
                            </div>
                            <div>
                                <div className="font-medium text-sm text-slate-900">{badge.name}</div>
                                <div className="text-xs text-slate-500">{badge.description}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
