"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const CTAButton = ({ href, text }: { href: string; text: string }) => (
    <div className="flex items-center">
        <Link
            href={href}
            className="inline-flex items-center justify-center px-6 py-3.5 bg-[#D7FE44] text-[#1a1a1a] rounded-full font-bold text-base hover:bg-[#c4ea3d] transition-all transform hover:scale-105 active:scale-95 shadow-xl"
        >
            {text}
        </Link>
        <button className="h-12 w-12 flex items-center justify-center bg-[#D7FE44] text-[#1a1a1a] rounded-full font-bold hover:bg-[#c4ea3d] transition-all transform hover:scale-105 active:scale-95 shadow-xl ml-[-1px]">
            <ArrowRight className="h-5 w-5 -rotate-45" />
        </button>
    </div>
);
