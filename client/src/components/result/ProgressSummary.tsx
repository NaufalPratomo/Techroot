import { BookOpen } from 'lucide-react';

interface ProgressSummaryProps {
    completedLessons: number;
    completedModules: number;
}

export const ProgressSummary = ({ completedLessons, completedModules }: ProgressSummaryProps) => {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-8 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#2443B0]" />
                Progress Belajar
            </h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-xl p-4">
                    <div className="text-3xl font-bold text-[#2443B0]">{completedLessons}</div>
                    <div className="text-sm text-slate-500">Lesson Selesai</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                    <div className="text-3xl font-bold text-[#2443B0]">{completedModules}</div>
                    <div className="text-sm text-slate-500">Modul Selesai</div>
                </div>
            </div>
        </div>
    );
};
