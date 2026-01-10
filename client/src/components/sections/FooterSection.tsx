"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { NAV_LINKS } from '@/constants/landing';

export const FooterSection = () => (
    <footer className="bg-white text-slate-900 pt-24 pb-12 border-t border-slate-100">
        <div className="container max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
                <div className="md:col-span-4 space-y-12">
                    <div className="relative h-24 w-24 md:h-32 md:w-32 group">
                        <Image src="/polinema.png" alt="Polinema" fill className="object-contain transition-all duration-500" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500 tracking-wide">(+62) 812-3456-7890</p>
                        <Link
                            href="mailto:halo@techroot.id"
                            className="text-2xl md:text-3xl font-bold tracking-tight hover:text-[#2443B0] transition-colors"
                        >
                            halo@techroot.id
                        </Link>
                    </div>
                </div>
                <div className="md:col-span-4 space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-slate-900">
                            Dapatkan Insight<br />Terbaru Kami
                        </h3>
                        <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                            Jadilah yang pertama tahu tentang perkembangan teknologi & karir digital yang relevan untuk Anda.
                        </p>
                    </div>
                    <div className="relative max-w-sm group">
                        <input
                            type="email"
                            placeholder="E-mail"
                            className="w-full bg-transparent border-b border-slate-200 py-3 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-[#2443B0] transition-colors"
                        />
                        <button className="absolute right-0 bottom-3 h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-[#2443B0] hover:text-white transition-all">
                            <ArrowRight className="h-4 w-4 -rotate-45" />
                        </button>
                    </div>
                </div>
                <div className="md:col-span-4 grid grid-cols-2 gap-8 md:pl-12">
                    <div className="space-y-6">
                        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Menu</h4>
                        <ul className="space-y-4">
                            {NAV_LINKS.menu.map(item => (
                                <li key={item}>
                                    <Link href="#" className="text-base text-slate-600 hover:text-[#2443B0] transition-colors font-medium">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Socials</h4>
                        <ul className="space-y-4">
                            {NAV_LINKS.socials.map(item => (
                                <li key={item}>
                                    <Link href="#" className="text-base text-slate-600 hover:text-[#2443B0] transition-colors font-medium">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mt-24 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
                <p className="text-slate-400 text-sm max-w-md text-center md:text-left leading-relaxed">
                    Di Techroot, kami melampaui sekadar platform belajar—menghadirkan pengalaman yang didukung oleh kurikulum berbasis industri untuk menghubungkan Anda dengan peluang nyata.
                </p>
                <div className="text-slate-900 text-sm font-bold tracking-tight">© 2025. Techroot Global. All Rights Reserved.</div>
            </div>
        </div>
    </footer>
);
