"use client";

import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { CategoriesSection } from '@/components/sections/CategoriesSection';
import { WhyUsSection } from '@/components/sections/WhyUsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FooterSection } from '@/components/sections/FooterSection';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-slate-900">
      <Header />
      <HeroSection />
      <CategoriesSection />
      <WhyUsSection />
      <TestimonialsSection />
      <FooterSection />
    </div>
  );
}