'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { StatsDisplay } from '@/components/StatsDisplay';
import { BadgeDisplay } from '@/components/BadgeDisplay';
import { PathCard } from '@/components/PathCard';
import { useUser } from '@/context/UserContext';
import { learningPaths, getModuleById } from '@/data/learningPaths';
import { ArrowRight, BookOpen, Sparkles, ChevronRight } from 'lucide-react';

export default function Dashboard() {
    const { isAuthenticated, user, progress } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null;
    }

    // Find the next suggested module
    const getSuggestedModule = () => {
        for (const path of learningPaths) {
            for (const module of path.modules) {
                if (!progress.completedModules.includes(`${path.id}:${module.id}`)) {
                    return { path, module };
                }
            }
        }
        return null;
    };

    const suggestion = getSuggestedModule();

    // Get current module if in progress
    const currentModule = progress.currentPath && progress.currentModule
        ? getModuleById(progress.currentPath, progress.currentModule)
        : null;

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <Header />

            <div className="container max-w-7xl mx-auto px-4 py-8">
                <div className="space-y-10 mt-20">
                    {/* Welcome Section */}
                    <div className="space-y-2">
                        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#2443B0]/10 text-[#2443B0] text-sm font-medium">
                            <Sparkles className="h-4 w-4 mr-2" />
                            Dashboard
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                            Selamat Datang, <span className="text-[#2443B0]">{user?.name}</span>!
                        </h1>
                        <p className="text-slate-500 text-base max-w-xl">
                            Lanjutkan perjalanan belajar Anda dan bangun keterampilan coding Anda.
                        </p>
                    </div>

                    {/* Stats */}
                    <StatsDisplay />

                    {/* Continue Learning / Suggested Module */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-8 space-y-6 shadow-sm hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-[#D7FE44] flex items-center justify-center">
                                <BookOpen className="h-5 w-5 text-slate-900" />
                            </div>
                            <h2 className="text-xl font-semibold text-slate-900">
                                {currentModule ? 'Lanjutkan Belajar' : 'Rekomendasi Hari Ini'}
                            </h2>
                        </div>

                        {(currentModule || suggestion) ? (
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                                <div className="space-y-1">
                                    <p className="text-lg font-semibold text-slate-900">
                                        {currentModule?.title || suggestion?.module.title}
                                    </p>
                                    <p className="text-sm text-slate-500">
                                        {currentModule
                                            ? learningPaths.find(p => p.id === progress.currentPath)?.title
                                            : suggestion?.path.title}
                                    </p>
                                </div>
                                <Button asChild className="bg-[#2443B0] hover:bg-[#1e3895] text-white rounded-full px-6 font-semibold">
                                    <Link href={currentModule
                                        ? `/learn/${progress.currentPath}/${progress.currentModule}`
                                        : `/learn/${suggestion?.path.id}/${suggestion?.module.id}`
                                    }>
                                        {currentModule ? 'Lanjutkan' : 'Mulai'}
                                        <ChevronRight className="h-4 w-4 ml-1" />
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="text-center py-8 bg-slate-50/50 rounded-2xl border border-slate-100">
                                <div className="h-16 w-16 rounded-full bg-[#D7FE44] flex items-center justify-center mx-auto mb-4">
                                    <Sparkles className="h-8 w-8 text-slate-900" />
                                </div>
                                <p className="text-slate-600 mb-4 font-medium">
                                    Selamat! Anda telah menyelesaikan semua modul yang tersedia.
                                </p>
                                <Button variant="outline" asChild className="rounded-full border-[#2443B0] text-[#2443B0] hover:bg-[#2443B0] hover:text-white">
                                    <Link href="/playground">Latihan di Playground</Link>
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Badges */}
                    <BadgeDisplay />

                    {/* Learning Paths */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-semibold text-slate-900">Learning Paths</h2>
                                <p className="text-slate-500 text-sm">Pilih jalur belajar dan mulai bangun skill Anda</p>
                            </div>
                            <Link href="/paths" className="text-sm font-semibold text-[#2443B0] hover:underline flex items-center gap-1">
                                Lihat Semua <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {learningPaths.map(path => (
                                <PathCard key={path.id} path={path} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
