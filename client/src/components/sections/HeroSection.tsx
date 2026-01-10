"use client";

import Image from 'next/image';
import { Star, ArrowRight } from 'lucide-react';
import { CTAButton } from './CTAButton';

const ReviewCard = () => (
    <div className="bg-white/10 backdrop-blur-xl rounded-[2rem] p-8 border border-white/20 max-w-[320px] shadow-2xl transform rotate-3">
        <div className="flex gap-1.5 mb-3">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-5 w-5 fill-[#D7FE44] text-[#D7FE44]" />)}
        </div>
        <p className="text-base text-white/90 leading-relaxed font-semibold mb-6">
            "Modern, elegan, dan fokus pada keterampilan nyata. Saya sangat menyukai proyek praktis dan sistemnya."
        </p>
        <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-[#D7FE44] to-blue-500 border-2 border-white/40 shadow-inner flex items-center justify-center font-bold text-[#1a1a1a]">
                JK
            </div>
            <div>
                <h5 className="text-sm font-bold text-white">Jason Kim</h5>
                <p className="text-xs text-blue-100/60 font-medium">UX Designer</p>
            </div>
        </div>
    </div>
);

export const HeroSection = () => (
    <section className="relative overflow-hidden bg-[#2443B0] text-white pt-32 pb-0 lg:pt-16 min-h-screen flex items-center">
        <div
            className="absolute inset-0 opacity-20"
            style={{
                backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
            }}
        />
        <div className="container max-w-7xl mx-auto px-4 relative z-10 mt-20">
            <div className="flex flex-col items-center text-center space-y-10">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter max-w-4xl leading-[1.05]">
                    Raih Karir Impian dengan<br />
                    <span className="text-white italic">Kursus Online Terpercaya</span>
                </h1>
                <p className="text-base md:text-lg text-blue-100/70 max-w-2xl font-light">
                    Bergabunglah dengan ribuan pelajar di seluruh dunia yang mengakses kursus mutakhir untuk masa depan cerah.
                </p>
                <CTAButton href="/register" text="Buat Roadmap Kamu Sekarang!" />
            </div>
            <div className="relative max-w-[1400px] mx-auto mt-12">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] aspect-square max-w-[900px] bg-[#1a36a9] rounded-full transform translate-y-1/2 -z-10 shadow-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/50" />
                </div>
                <div className="absolute left-0 xl:-left-12 top-1/4 hidden lg:block">
                    <div className="max-w-[250px]">
                        <div className="text-5xl font-serif text-[#D7FE44]">"</div>
                        <p className="text-md text-blue-100/60 leading-relaxed font-medium">
                            Dari pembelajaran berbasis AI hingga proyek dunia nyata, platform kami memberdayakan Anda untuk terus belajar.
                        </p>
                    </div>
                    <div className="space-y-1 mt-4">
                        <h4 className="text-3xl font-medium text-white">5000+</h4>
                        <p className="text-[10px] text-blue-100/50 font-bold tracking-[0.2em] uppercase">Kursus Unggulan</p>
                    </div>
                </div>
                <div className="relative z-20 flex justify-center">
                    <Image
                        src="/assets/hero-students.png"
                        alt="Logo Mahasiswa Polinema"
                        width={700}
                        height={700}
                        className="w-full max-w-xl h-auto object-contain relative -bottom-4 drop-shadow-[0_25px_60px_rgba(0,0,0,0.6)] transform transition-transform duration-700"
                        priority
                    />
                </div>
                <div className="absolute right-4 xl:-right-12 top-1/4 hidden lg:block space-y-16">
                    <ReviewCard />
                </div>
            </div>
        </div>
    </section>
);
