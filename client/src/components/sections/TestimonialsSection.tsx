"use client";

import Image from 'next/image';
import { TESTIMONIALS } from '@/constants/landing';

const TestimonialCard = ({ name, role, avatar, quote, highlight, highlightColor }: typeof TESTIMONIALS[0]) => (
    <div className="flex flex-col space-y-6 w-[80vw] md:w-auto shrink-0 snap-center snap-always p-4 md:p-0 h-full">
        <div className="text-[#44fe9b] text-5xl font-serif leading-none">"</div>
        <p className="text-lg text-slate-700 leading-relaxed font-medium flex-grow">
            "{quote} <span style={{ backgroundColor: highlightColor }} className="px-1">{highlight}</span>"
        </p>
        <div className="flex items-center gap-4 pt-6 mt-auto">
            <div className="h-12 w-12 rounded-full overflow-hidden relative border-2 border-slate-100">
                <Image src={avatar} alt={name} fill className="object-cover" />
            </div>
            <div>
                <h4 className="font-bold text-slate-900">{name}</h4>
                <p className="text-sm text-slate-500">{role}</p>
            </div>
        </div>
    </div>
);

export const TestimonialsSection = () => (
    <section className="py-24 bg-white relative overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center space-y-4 lg:mb-20 mb-5">
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">
                    Dengarkan Kisah Para<br />Pelajar Kami
                </h2>
            </div>
            <div className="relative overflow-hidden md:overflow-visible group">
                <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-hide py-4 px-4 -mx-4 md:p-0 md:m-0 no-scrollbar">
                    {TESTIMONIALS.map(t => <TestimonialCard key={t.name} {...t} />)}
                </div>
            </div>
        </div>
    </section>
);
