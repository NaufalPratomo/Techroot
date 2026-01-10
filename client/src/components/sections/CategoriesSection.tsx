"use client";

import { ArrowRight, Code2, Globe, Camera, Brain, Layout } from 'lucide-react';
import { CATEGORIES } from '@/constants/landing';

const ICON_MAP: Record<string, any> = {
    Layout,
    Code2,
    Globe,
    Camera,
    Brain,
};

export const CategoriesSection = () => {
    return (
        <section className="py-20 md:py-32 bg-white relative overflow-hidden">
            <div className="container max-w-7xl mx-auto px-4 relative z-10">
                <div className="lg:text-center space-y-4 mb-16">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-slate-600 text-sm font-medium border border-slate-200 shadow-sm">Pilihan Kategori</div>
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 leading-tight">
                        Eksplorasi Jalur Belajar yang Sesuai<br className="hidden md:block" />dengan Passion & Masa Depanmu 🚀.
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-base leading-relaxed">
                        Temukan ribuan modul pembelajaran berkualitas yang dirancang khusus untuk membantumu menguasai skill baru, mulai dari dasar hingga tingkat mahir.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {CATEGORIES.map((category) => {
                        const IconComponent = ICON_MAP[category.icon] || Code2;

                        return (
                            <div
                                key={category.id}
                                className="group cursor-pointer p-8 md:p-10 rounded-3xl border-2 border-slate-100 bg-white hover:border-[#2443B0]/20 hover:shadow-2xl hover:-translate-y-2 text-slate-900 transition-all duration-500 relative overflow-hidden"
                            >
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-10 transition-all duration-500 group-hover:scale-110 bg-slate-50 text-[#2443B0] group-hover:bg-[#2443B0]/10"
                                >
                                    <IconComponent className="w-8 h-8" />
                                </div>

                                <h4 className="text-2xl font-black mb-4 tracking-tight leading-tight">{category.title}</h4>

                                <p className="text-base mb-10 leading-relaxed font-medium transition-colors duration-500 text-slate-500">
                                    {category.description}
                                </p>

                                <div className="flex items-center justify-between pt-6 border-t border-slate-100 transition-colors duration-500">
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                        {category.count} Courses
                                    </span>
                                    <div className="flex items-center gap-2 text-xs font-bold transition-all duration-300 text-[#2443B0] opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0">
                                        Jelajahi
                                        <ArrowRight className="w-4 h-4 transition-transform -rotate-45" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
