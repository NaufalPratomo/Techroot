"use client";

import Image from 'next/image';
import { ChevronRight, Code2, Zap, Target, Sparkles } from 'lucide-react';
import { FEATURES } from '@/constants/landing';

const FeatureIcon = ({ icon }: { icon: string }) => {
    const icons: Record<string, React.ReactNode> = {
        Code2: <Code2 className="h-4 w-4" />,
        Zap: <Zap className="h-4 w-4" />,
        Target: <Target className="h-4 w-4" />,
        Sparkles: <Sparkles className="h-4 w-4" />
    };
    return icons[icon] || null;
};

const FeatureRadio = ({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) => (
    <label className="flex items-start gap-4 p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-all cursor-pointer group">
        <div className="relative flex items-center justify-center mt-1.5 h-4 w-4">
            <div className="absolute h-2.5 w-2.5 rounded-full bg-[#2443B0] animate-pulse-soft" />
            <div className="absolute h-4 w-4 rounded-full border border-[#2443B0]/30 animate-pulse-soft delay-75" />
        </div>
        <div className="space-y-1">
            <div className="flex items-center gap-2">
                <span className="text-slate-400 group-hover:text-[#2443B0] transition-colors">{icon}</span>
                <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-20 transition-all duration-500">
                {description}
            </p>
        </div>
    </label>
);

export const WhyUsSection = () => (
    <section className="py-24 bg-slate-50/50">
        <div className="container max-w-7xl mx-auto px-4">
            <div className="lg:text-center space-y-4 mb-16">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-slate-600 text-sm font-medium border border-slate-200 shadow-sm">Mengapa Kami?</div>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 leading-tight">
                    Dirancang untuk Membantu Anda Belajar<br className="hidden md:block" />Lebih Baik, Lebih Cepat, & Lebih Cerdas 🤓.
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto text-base leading-relaxed">
                    Kami tidak hanya mengajar. Kami memberdayakan—dengan konten yang relevan di industri, panduan pribadi, dan alat untuk mengubah pembelajaran menjadi tindakan nyata.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
                <div className="md:col-span-4 space-y-6 flex flex-col">
                    <div className="flex-1 bg-[#1a36a9] rounded-3xl p-8 text-white space-y-6 relative overflow-hidden group">
                        <div className="relative z-10 space-y-4">
                            <h3 className="text-2xl font-semibold leading-tight">Kami Memiliki Lebih dari 5rb+ Kursus</h3>
                            <p className="text-blue-100/70 text-sm leading-relaxed">
                                Bergabunglah dengan komunitas global yang berkembang—lebih dari 100.000 pelajar dan 500+ kisah sukses.
                            </p>
                        </div>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#D7FE44] text-[#1a1a1a] rounded-full font-semibold text-sm hover:scale-105 transition-transform mt-4">
                            Jelajahi Kursus <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="bg-[#2443B0] rounded-3xl p-8 text-white space-y-4 relative overflow-hidden group">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-10 w-10 rounded-full border-2 border-[#2443B0] overflow-hidden relative">
                                    <Image src={`https://i.pravatar.cc/100?u=mentor${i}`} alt="Mentor" fill className="object-cover" />
                                </div>
                            ))}
                            <div className="h-10 w-10 rounded-full border-2 border-[#2443B0] bg-[#D7FE44] text-[#1a1a1a] flex items-center justify-center font-bold text-[10px]">200+</div>
                        </div>
                        <h3 className="text-xl font-semibold leading-tight">Kami Memiliki 250+ Mentor & Pelatih Terbaik</h3>
                    </div>
                </div>
                <div className="md:col-span-8 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col group hover:shadow-lg transition-all duration-500">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <p className="text-[#2443B0] font-semibold text-sm uppercase tracking-wide">Tentang Kami</p>
                                <h3 className="text-3xl font-semibold text-slate-900 leading-tight">
                                    Membentuk Masa Depan <span className="text-[#2443B0]">Talenta Digital</span> Indonesia
                                </h3>
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Techroot adalah pionir platform edukasi teknologi yang berfokus pada hasil nyata. Kami menjembatani kesenjangan antara dunia pendidikan dan tuntutan industri melalui kurikulum berbasis proyek praktis.
                            </p>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Misi kami adalah memberikan akses pendidikan berkualitas tinggi bagi sesiapa pun yang ingin membangun karir sukses di ekosistem teknologi yang dinamis.
                            </p>
                            <div className="pt-4 flex items-center gap-6">
                                <div>
                                    <div className="text-2xl font-semibold text-slate-900">10k+</div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Lulusan</p>
                                </div>
                                <div className="w-px h-8 bg-slate-100" />
                                <div>
                                    <div className="text-2xl font-semibold text-slate-900">95%</div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tingkat Serapan Kerja</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <p className="text-[#2443B0] font-semibold text-sm uppercase tracking-wide">Fitur Unggulan</p>
                            <div className="space-y-3">
                                {FEATURES.map(f => (
                                    <FeatureRadio key={f.title} title={f.title} description={f.description} icon={<FeatureIcon icon={f.icon} />} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
