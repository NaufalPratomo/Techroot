import { CheckCircle2 } from 'lucide-react';

export const ResultHeader = () => (
    <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-[#D7FE44] shadow-lg shadow-[#D7FE44]/30 mb-6">
            <CheckCircle2 className="h-12 w-12 text-slate-900" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Selamat! 🎉
        </h1>
        <p className="text-slate-500 text-lg">
            Kamu telah menyelesaikan lesson dengan sukses
        </p>
    </div>
);
