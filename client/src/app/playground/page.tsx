"use client";

import { Header } from "@/components/layout/Header";
import CodePlayground from "@/components/CodePlayground";

/**
 * Playground Page
 * Interactive code editor untuk eksperimen dengan JavaScript, HTML, dan Java
 */
export default function PlaygroundPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <div className="container max-w-7xl mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="mb-8 mt-20">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Techroot Playground
                    </h1>
                    <p className="text-muted-foreground max-w-2xl">
                        Ruang eksperimen interaktif untuk JavaScript, HTML, dan Java.
                        Tulis kode, jalankan, dan lihat hasilnya secara instan.
                    </p>
                </div>

                {/* Playground Component */}
                <CodePlayground
                    initialLanguage="javascript"
                    initialCode={`// Selamat datang di Techroot Playground!
// Tulis kode JavaScript dan klik "Run" untuk menjalankannya.

// Contoh: Menghitung faktorial
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

console.log("Faktorial dari 5:", factorial(5));

// Coba modifikasi kode di atas atau tulis kode baru!
`}
                />

                    {/* Tips Section */}
                <div className="mt-8 p-6 border border-border rounded-xl bg-card/50">
                    <h2 className="font-semibold mb-4 text-lg">💡 Tips</h2>
                    <ul className="text-sm text-muted-foreground space-y-3">
                        <li className="flex items-start gap-2">
                            <span className="text-blue-500">•</span>
                            <span>
                                Gunakan <code className="px-1.5 py-0.5 bg-muted rounded text-foreground font-mono text-xs">console.log()</code> untuk menampilkan output
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-500">•</span>
                            <span>
                                Tekan <code className="px-1.5 py-0.5 bg-muted rounded text-foreground font-mono text-xs">Ctrl + Enter</code> untuk menjalankan kode dengan cepat
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-500">•</span>
                            <span>
                                Pilih bahasa pemrograman dari dropdown: <strong>JavaScript</strong>, <strong>HTML</strong>, atau <strong>Java</strong>
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-500">•</span>
                            <span>
                                Untuk HTML, gunakan tab <strong>Preview</strong> untuk melihat hasil render
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-500">•</span>
                            <span>
                                Error akan ditampilkan di panel output dengan detail yang jelas
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}