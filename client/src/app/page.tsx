import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PathCard } from '@/components/PathCard';
import { CodePlayground } from '@/components/CodePlayground';
import { learningPaths } from '@/data/learningPaths';
import { Header } from '@/components/layout/Header';
import { ArrowRight, Code2, Zap, Target, Sparkles, Lightbulb, PieChart, Settings, MousePointer2, Star } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#2443B0] text-white pt-32 pb-0 lg:pt-16 min-h-screen flex items-center">
        {/* Blueprint Grid Background */}
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

            {/* CTA Buttons */}
            <div className="flex items-center">
              <Link href="/register" className="inline-flex items-center justify-center px-6 py-3.5 bg-[#D7FE44] text-[#1a1a1a] rounded-full font-bold text-base hover:bg-[#c4ea3d] transition-all transform hover:scale-105 active:scale-95 shadow-xl">
                Buat Roadmap Kamu Sekarang!
              </Link>
              <button className="h-12 w-12 flex items-center justify-center bg-[#D7FE44] text-[#1a1a1a] rounded-full font-bold hover:bg-[#c4ea3d] transition-all transform hover:scale-105 active:scale-95 shadow-xl ml-[-1px]">
                <ArrowRight className="h-5 w-5 -rotate-45" />
              </button>
            </div>
          </div>

          <div className="relative max-w-[1400px] mx-auto mt-12">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] aspect-square max-w-[900px] bg-[#1a36a9] rounded-full transform translate-y-1/2 -z-10 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/50"></div>
            </div>
            <div className="absolute left-0 xl:-left-12 top-1/4 hidden lg:block">
              <div className="max-w-[250px]">
                <div className="text-5xl font-serif text-[#D7FE44]">“</div>
                <p className="text-md text-blue-100/60 leading-relaxed font-medium">
                  Dari pembelajaran berbasis AI hingga proyek dunia nyata, platform kami memberdayakan Anda untuk terus belajar.
                </p>
              </div>
              <div className="space-y-1 mt-4">
                <h4 className="text-3xl font-medium text-white">5000+</h4>
                <p className="text-[10px] text-blue-100/50 font-bold tracking-[0.2em] uppercase">Kursus Unggulan</p>
              </div>
            </div>

            {/* Main Student Image */}
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

            {/* Floating Elements - Right */}
            <div className="absolute right-4 xl:-right-12 top-1/4 hidden lg:block space-y-16">
              <div className="bg-white/10 backdrop-blur-xl rounded-[2rem] p-8 border border-white/20 max-w-[320px] shadow-2xl transform rotate-3">
                <div className="flex gap-1.5 mb-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-5 w-5 fill-[#D7FE44] text-[#D7FE44]" />
                  ))}
                </div>
                <p className="text-base text-white/90 leading-relaxed font-semibold mb-6">
                  "Modern, elegan, dan fokus pada keterampilan nyata. Saya sangat menyukai proyek praktis dan sistemnya."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-[#D7FE44] to-yellow-500 border-2 border-white/40 shadow-inner flex items-center justify-center font-bold text-[#1a1a1a]">JK</div>
                  <div>
                    <h5 className="text-sm font-bold text-white">Jason Kim</h5>
                    <p className="text-xs text-blue-100/60 font-medium">UX Designer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-border">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-3">
              <div className="h-12 w-12 rounded-lg bg-secondary mx-auto flex items-center justify-center">
                <Code2 className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">Playground Inovatif</h3>
              <p className="text-sm text-muted-foreground">
                Tulis dan jalankan JavaScript langsung di browser Anda dengan umpan balik instan.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="h-12 w-12 rounded-lg bg-secondary mx-auto flex items-center justify-center">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">Petunjuk Berbasis AI</h3>
              <p className="text-sm text-muted-foreground">
                Dapatkan saran cerdas dan umpan balik saat Anda sedang menulis kode.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="h-12 w-12 rounded-lg bg-secondary mx-auto flex items-center justify-center">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">Pantau Progres</h3>
              <p className="text-sm text-muted-foreground">
                Dapatkan XP, tingkatkan level, dan pertahankan streak untuk tetap termotivasi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-20 border-t border-border">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Jalur Pembelajaran</h2>
              <p className="text-muted-foreground">
                Kursus terstruktur untuk membimbing Anda dari pemula hingga menjadi ahli.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningPaths.map(path => (
                <PathCard key={path.id} path={path} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Playground Preview Section */}
      <section className="py-20 border-t border-border">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Coba Sekarang</h2>
              <p className="text-muted-foreground">
                Tulis baris kode pertama Anda langsung di sini.
              </p>
            </div>
            <CodePlayground
              initialCode={`// Coba tulis kode JavaScript! 
const sapaan = "Halo, Dunia!";
console.log(sapaan);

// Klik "Run Code" untuk melihat hasilnya`}
              showAIFeedback={false}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Siap untuk mulai coding?</h2>
            <p className="text-muted-foreground">
              Bergabunglah dengan ribuan pelajar yang menguasai pemrograman melalui praktik langsung.
            </p>
            <Button size="xl" asChild>
              <Link href="/register">
                Buat Akun Gratis
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Code2 className="h-5 w-5" />
              <span className="font-medium">Techroot</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Techroot. Belajar dengan praktik langsung.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}