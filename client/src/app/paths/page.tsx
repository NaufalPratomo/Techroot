import { Header } from '@/components/layout/Header';
import { PathCard } from '@/components/PathCard';
import { learningPaths } from '@/data/learningPaths';
import { Sparkles } from 'lucide-react';

export default function Paths() {
    return (
        <div className="min-h-screen bg-white text-slate-900">
            <Header />

            <div className="container max-w-7xl mx-auto px-4 py-8">
                <div className='mt-20'>
                    <div className="mb-10 space-y-3">
                        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#2443B0]/10 text-[#2443B0] text-sm font-medium">
                            <Sparkles className="h-4 w-4 mr-2" />
                            Jalur Pembelajaran
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">Learning Paths</h1>
                        <p className="text-slate-500 text-base max-w-xl">
                            Pilih jalur belajar dan mulai bangun keterampilan coding Anda langkah demi langkah.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {learningPaths.map(path => (
                            <PathCard key={path.id} path={path} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
