'use client';

import { use } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { ModuleCard } from '@/components/ModuleCard';
import { Button } from '@/components/ui/button';
import { getPathById } from '@/data/learningPaths';
import { useUser } from '@/context/UserContext';
import { ArrowLeft, Code2, Lightbulb, Layout, Sparkles, ChevronRight } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
    Code2: <Code2 className="h-8 w-8 text-[#2443B0]" />,
    Lightbulb: <Lightbulb className="h-8 w-8 text-[#2443B0]" />,
    Layout: <Layout className="h-8 w-8 text-[#2443B0]" />,
};

export default function PathDetail({ params }: { params: Promise<{ pathId: string }> }) {
    const { pathId } = use(params);
    const { progress } = useUser();

    const path = pathId ? getPathById(pathId) : undefined;

    if (!path) {
        return (
            <div className="min-h-screen bg-white text-slate-900">
                <Header />
                <div className="container max-w-7xl mx-auto px-4 py-20 text-center mt-20">
                    <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
                        <Sparkles className="h-10 w-10 text-slate-400" />
                    </div>
                    <h1 className="text-2xl font-bold mb-4 text-slate-900">Path Tidak Ditemukan</h1>
                    <p className="text-slate-500 mb-6">
                        Jalur pembelajaran yang Anda cari tidak ada.
                    </p>
                    <Button asChild className="bg-[#2443B0] hover:bg-[#1e3895] text-white rounded-full px-6">
                        <Link href="/paths">Lihat Semua Paths</Link>
                    </Button>
                </div>
            </div>
        );
    }

    // Determine module status
    const getModuleStatus = (moduleId: string, index: number): 'locked' | 'active' | 'completed' => {
        const key = `${path.id}:${moduleId}`;

        if (progress.completedModules.includes(key)) {
            return 'completed';
        }

        // First module is always active, others need previous to be completed
        if (index === 0) {
            return 'active';
        }

        const previousModuleKey = `${path.id}:${path.modules[index - 1].id}`;
        if (progress.completedModules.includes(previousModuleKey)) {
            return 'active';
        }

        return 'locked';
    };

    const completedCount = path.modules.filter(m =>
        progress.completedModules.includes(`${path.id}:${m.id}`)
    ).length;

    const progressPercentage = (completedCount / path.modules.length) * 100;

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <Header />

            <div className="container max-w-7xl mx-auto px-4 py-8">
                <div className="max-w-7xl mx-auto">
                    {/* Back Link */}
                    <Link
                        href="/paths"
                        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#2443B0] mt-20 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Semua Paths
                    </Link>

                    {/* Path Header */}
                    <div className="mb-10 mt-6">
                        <div className="flex items-start gap-5 mb-6">
                            <div className="h-16 w-16 rounded-2xl bg-[#D7FE44] flex items-center justify-center shadow-sm">
                                {iconMap[path.icon] || <Code2 className="h-8 w-8 text-[#2443B0]" />}
                            </div>
                            <div className="space-y-1">
                                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#2443B0]/10 text-[#2443B0] text-xs font-semibold mb-2">
                                    {path.modules.length} Modules
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">{path.title}</h1>
                                <p className="text-slate-500 text-base max-w-2xl">{path.description}</p>
                            </div>
                        </div>

                        {/* Progress */}
                        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                            <div className="flex items-center justify-between text-sm mb-3">
                                <span className="text-slate-500 font-medium">Progress Anda</span>
                                <span className="font-semibold text-[#2443B0]">{completedCount}/{path.modules.length} selesai</span>
                            </div>
                            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-[#2443B0] to-[#3a5bc7] rounded-full transition-all duration-500"
                                    style={{ width: `${progressPercentage}%` }}
                                />
                            </div>
                            {progressPercentage === 100 && (
                                <div className="mt-4 flex items-center gap-2 text-sm text-emerald-600 font-medium">
                                    <Sparkles className="h-4 w-4" />
                                    Selamat! Anda telah menyelesaikan path ini!
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Modules List */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold text-slate-900">Modules</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            {path.modules.map((module, index) => (
                                <ModuleCard
                                    key={module.id}
                                    module={module}
                                    pathId={path.id}
                                    status={getModuleStatus(module.id, index)}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
