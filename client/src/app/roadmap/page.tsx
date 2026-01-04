"use client";

import React, { useState, useRef, useEffect } from "react";
import {
    ChevronDown,
    ArrowRight,
    Cpu,
    Route,
    Sparkles,
    Target,
    Clock,
    Zap,
    GraduationCap,
    Briefcase,
    BarChart3,
    Code2,
    Rocket,
    CheckCircle2,
    ArrowLeft,
    Loader2,
    User,
    BookOpen,
    Calendar,
    Trophy,
    Link,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

// ============================================
// DATA DEFINITIONS
// ============================================

const AVAILABLE_MAJORS = ["Teknik Informatika", "Sistem Informasi"] as const;

const TRENDING_FIELDS = [
    {
        id: "web-dev",
        name: "Web Development",
        icon: Code2,
        description: "Frontend, Backend, atau Fullstack",
        trending: true,
    },
    {
        id: "mobile-dev",
        name: "Mobile Development",
        icon: Rocket,
        description: "Android, iOS, atau Cross-platform",
        trending: true,
    },
    {
        id: "data-science",
        name: "Data Science & AI",
        icon: BarChart3,
        description: "Machine Learning, Deep Learning, Analytics",
        trending: true,
    },
    {
        id: "cloud-devops",
        name: "Cloud & DevOps",
        icon: Zap,
        description: "AWS, Azure, GCP, CI/CD",
        trending: true,
    },
    {
        id: "cybersecurity",
        name: "Cybersecurity",
        icon: Target,
        description: "Security Analyst, Penetration Testing",
        trending: true,
    },
    {
        id: "ui-ux",
        name: "UI/UX Design",
        icon: Sparkles,
        description: "User Research, Prototyping, Design Systems",
        trending: false,
    },
    {
        id: "game-dev",
        name: "Game Development",
        icon: Rocket,
        description: "Unity, Unreal, Game Design",
        trending: false,
    },
    {
        id: "blockchain",
        name: "Blockchain & Web3",
        icon: Code2,
        description: "Smart Contracts, DApps, Crypto",
        trending: false,
    },
];

const PURPOSE_OPTIONS = [
    { id: "from-scratch", label: "Mulai dari nol", description: "Belum punya pengalaman sama sekali" },
    { id: "career-switch", label: "Pindah karir", description: "Sudah bekerja tapi ingin switch ke tech" },
    { id: "skill-upgrade", label: "Upgrade skill", description: "Sudah punya dasar, ingin level up" },
    { id: "job-ready", label: "Siap kerja", description: "Ingin segera dapat pekerjaan di bidang ini" },
    { id: "freelance", label: "Jadi freelancer", description: "Ingin memulai karir freelance" },
];

const SKILL_LEVELS = [
    { id: "beginner", label: "Pemula", description: "Belum pernah coding sama sekali", icon: BookOpen },
    { id: "intermediate", label: "Menengah", description: "Sudah paham dasar programming", icon: GraduationCap },
    { id: "advanced", label: "Mahir", description: "Sudah bisa membuat project sendiri", icon: Briefcase },
    { id: "professional", label: "Profesional", description: "Sudah bekerja di industri", icon: Trophy },
];

const DAILY_TIME_OPTIONS = [
    { id: "1-2", label: "1-2 jam/hari", hours: 1.5 },
    { id: "2-4", label: "2-4 jam/hari", hours: 3 },
    { id: "4-6", label: "4-6 jam/hari", hours: 5 },
    { id: "6+", label: "6+ jam/hari (fulltime)", hours: 7 },
];

const DURATION_OPTIONS = [
    { id: "1-month", label: "1 bulan", months: 1 },
    { id: "3-months", label: "3 bulan", months: 3 },
    { id: "6-months", label: "6 bulan", months: 6 },
    { id: "12-months", label: "12 bulan", months: 12 },
];

const GOAL_OPTIONS = [
    { id: "portfolio", label: "Membangun portfolio", description: "Punya 3-5 project untuk ditunjukkan" },
    { id: "first-job", label: "Dapat pekerjaan pertama", description: "Siap interview dan dapat offer" },
    { id: "promotion", label: "Naik jabatan", description: "Dari junior ke mid-level atau senior" },
    { id: "certification", label: "Dapat sertifikasi", description: "Sertifikasi profesional yang diakui" },
    { id: "side-income", label: "Penghasilan sampingan", description: "Mulai dapat project freelance" },
];

const requestedModels = [
    {
        id: "google/gemma-3-27b-it:free",
        name: "Gemma 3 27B",
        description: "Google (Terbaru)",
        brand: "google",
        color: "#4285F4",
    },
];

// ============================================
// TYPES
// ============================================

interface RoadmapFormData {
    purpose: string;
    field: string;
    level: string;
    dailyTime: string;
    duration: string;
    goal: string;
    additionalInfo: string;
}

interface RoadmapNode {
    id: string;
    title: string;
    type: "topic" | "checkpoint";
    description: string;
    resources: {
        type: "video" | "article" | "official" | "course";
        label: string;
        url: string;
    }[];
}

interface RoadmapData {
    overview: string;
    nodes: RoadmapNode[];
}

type WizardStep = "welcome" | "purpose" | "field" | "level" | "time" | "goal" | "confirm" | "generating" | "result";

// ============================================
// SMALL COMPONENTS
// ============================================

const ModelIcon = ({ brand, className }: { brand: string; className?: string }) => {
    switch (brand) {
        case "google":
            return (
                <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
                </svg>
            );
        default:
            return <Cpu className={className} />;
    }
};

const RadioOption = ({
    selected,
    onClick,
    children,
    className,
}: {
    selected: boolean;
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
}) => (
    <Card
        onClick={onClick}
        className={cn(
            "w-full cursor-pointer transition-all duration-200 border",
            selected
                ? "border-primary/60 bg-primary/5 shadow-sm"
                : "border-border hover:border-primary/40 hover:bg-muted/40",
            className
        )}
    >
        <CardContent className="p-4 sm:p-5">
            {selected && (
                <div className="mb-2 flex items-center gap-2 text-xs text-primary">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="font-medium">Dipilih</span>
                </div>
            )}
            {children}
        </CardContent>
    </Card>
);

// ============================================
// MAIN COMPONENT
// ============================================

export default function RoadmapPage() {
    const STEPS: { id: WizardStep; label: string; icon: any }[] = [
        { id: "purpose", label: "Tujuan", icon: Target },
        { id: "field", label: "Bidang", icon: Rocket },
        { id: "level", label: "Level", icon: BookOpen },
        { id: "time", label: "Waktu", icon: Clock },
        { id: "goal", label: "Target", icon: Trophy },
        { id: "confirm", label: "Review", icon: Zap },
    ];

    const [step, setStep] = useState<WizardStep>("welcome");
    const [formData, setFormData] = useState<RoadmapFormData>({
        purpose: "",
        field: "",
        level: "",
        dailyTime: "",
        duration: "",
        goal: "",
        additionalInfo: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);

    // Topic Detail & Tutor
    const [selectedTopic, setSelectedTopic] = useState<RoadmapNode | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"resources" | "tutor">("resources");
    const [topicMessages, setTopicMessages] = useState<
        Record<string, { role: "user" | "assistant"; content: string }[]>
    >({});
    const [tutorLoading, setTutorLoading] = useState(false);
    const [tutorInput, setTutorInput] = useState("");

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [isLoading, roadmapData, topicMessages]);

    const getStepNumber = (): number => {
        if (step === "generating") return 6;
        const stepOrder: WizardStep[] = ["purpose", "field", "level", "time", "goal", "confirm"];
        const idx = stepOrder.indexOf(step);
        return idx !== -1 ? idx + 1 : 1;
    };

    const nextStep = () => {
        const stepOrder: WizardStep[] = ["welcome", "purpose", "field", "level", "time", "goal", "confirm"];
        const currentIndex = stepOrder.indexOf(step);
        if (currentIndex < stepOrder.length - 1) {
            setStep(stepOrder[currentIndex + 1]);
        }
    };

    const prevStep = () => {
        const stepOrder: WizardStep[] = ["welcome", "purpose", "field", "level", "time", "goal", "confirm"];
        const currentIndex = stepOrder.indexOf(step);
        if (currentIndex > 0) {
            setStep(stepOrder[currentIndex - 1]);
        }
    };

    const generatePrompt = (): string => {
        const purposeLabel = PURPOSE_OPTIONS.find((p) => p.id === formData.purpose)?.label || formData.purpose;
        const fieldLabel = TRENDING_FIELDS.find((f) => f.id === formData.field)?.name || formData.field;
        const levelLabel = SKILL_LEVELS.find((l) => l.id === formData.level)?.label || formData.level;
        const dailyTimeLabel = DAILY_TIME_OPTIONS.find((t) => t.id === formData.dailyTime)?.label || formData.dailyTime;
        const durationLabel = DURATION_OPTIONS.find((d) => d.id === formData.duration)?.label || formData.duration;
        const goalLabel = GOAL_OPTIONS.find((g) => g.id === formData.goal)?.label || formData.goal;

        return `Kamu adalah AI asisten khusus untuk membuat learning roadmap yang personal dan terstruktur.
        
Buatkan roadmap belajar yang sangat detail dalam format JSON (WAJIB JSON VALID).

📌 Profil Learner:
- Tujuan: ${purposeLabel}
- Bidang: ${fieldLabel}
- Level: ${levelLabel}
- Waktu: ${dailyTimeLabel}
- Durasi: ${durationLabel}
- Goal: ${goalLabel}
${formData.additionalInfo ? `- Info tambahan: ${formData.additionalInfo}` : ""}

Output wajib format JSON seperti ini:
{
  "overview": "Ringkasan singkat journey",
  "nodes": [
    {
      "id": "1",
      "title": "HTML Dasar",
      "type": "topic",
      "description": "Penjelasan mendalam tentang topik ini...",
      "resources": [
        {"type": "video", "label": "Tutorial HTML Lengkap", "url": "https://youtube.com/..."},
        {"type": "official", "label": "MDN Web Docs", "url": "https://developer.mozilla.org/..."}
      ]
    },
    {
      "id": "2",
      "title": "Checkpoint: Static Site",
      "type": "checkpoint",
      "description": "Projek yang harus dibuat: Buat landing page sederhana...",
      "resources": []
    }
  ]
}

Berikan roadmap yang komprehensif, urut secara logis dari dasar ke advanced.`;
    };

    const handleGenerateRoadmap = async () => {
        setStep("generating");
        setIsLoading(true);

        const prompt = generatePrompt();

        try {
            const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");
            const endpoint = `${apiUrl}/api/ai/chat`;

            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: prompt,
                    model: "google/gemma-3-27b-it:free",
                }),
            });

            const data = await response.json();

            if (data.success) {
                try {
                    const content = data.data.reply;
                    const jsonMatch = content.match(/\{[\s\S]*\}/);
                    const parsedData = JSON.parse(jsonMatch ? jsonMatch[0] : content);
                    setRoadmapData(parsedData);
                    setStep("result");
                } catch (parseErr) {
                    console.error("JSON Parse Error:", parseErr);
                    setRoadmapData({
                        overview: "Maaf, terjadi kesalahan format pada data AI. Silakan coba generate ulang.",
                        nodes: [],
                    });
                    setStep("result");
                }
            } else {
                setStep("confirm");
                alert(`Error: ${data.message}`);
            }
        } catch (err) {
            console.error(err);
            setStep("confirm");
            alert("Maaf, terjadi kesalahan saat menghubungi AI.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleTutorChat = async () => {
        if (!tutorInput.trim() || !selectedTopic) return;

        const topicId = selectedTopic.id;
        const currentMessages = topicMessages[topicId] || [];
        const newMessages = [...currentMessages, { role: "user" as const, content: tutorInput }];

        setTopicMessages((prev) => ({ ...prev, [topicId]: newMessages }));
        setTutorInput("");
        setTutorLoading(true);

        try {
            const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");
            const endpoint = `${apiUrl}/api/ai/chat`;

            const prompt = `Kamu adalah AI Tutor khusus untuk topik: "${selectedTopic.title}".
      
Konteks Pembelajaran:
${selectedTopic.description}

Aturan:
1. Jawab hanya hal yang berkaitan dengan topik "${selectedTopic.title}".
2. Jika pertanyaan di luar konteks, tolak dengan sopan dan arahkan kembali ke topik ini.
3. Jelaskan dengan bahasa yang sederhana dan edukatif.

Pertanyaan Pengguna: ${tutorInput}`;

            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: prompt,
                    model: "google/gemma-3-27b-it:free",
                }),
            });

            const data = await response.json();
            if (data.success) {
                setTopicMessages((prev) => ({
                    ...prev,
                    [topicId]: [...newMessages, { role: "assistant", content: data.data.reply }],
                }));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setTutorLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            purpose: "",
            field: "",
            level: "",
            dailyTime: "",
            duration: "",
            goal: "",
            additionalInfo: "",
        });
        setRoadmapData(null);
        setSelectedTopic(null);
        setIsDetailOpen(false);
        setTopicMessages({});
        setStep("welcome");
    };

    const canProceed = (): boolean => {
        switch (step) {
            case "welcome":
                return true;
            case "purpose":
                return !!formData.purpose;
            case "field":
                return !!formData.field;
            case "level":
                return !!formData.level;
            case "time":
                return !!formData.dailyTime && !!formData.duration;
            case "goal":
                return !!formData.goal;
            default:
                return true;
        }
    };

    // ============================================
    // RENDER STEPS
    // ============================================

    const renderWelcomeStep = () => (
        <div className="flex flex-col items-center justify-center py-12 sm:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="relative w-full max-w-4xl text-center space-y-8">
                {/* Decorative background element */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#2443B0]/5 rounded-full blur-[100px] -z-10" />

                <div className="space-y-4">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-[#2443B0] text-sm font-black border border-slate-200 shadow-sm mb-4">
                        <Sparkles className="h-4 w-4 mr-2" />
                        AI-Powered Learning Path
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[1.1]">
                        Bangun Roadmap Belajar <br />
                        <span className="text-[#2443B0]">Yang Personal & Goat 🚀</span>
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
                        Jawab beberapa pertanyaan singkat, lalu biarkan AI kami menyusun jalur belajar terstruktur yang dirancang khusus untuk mempercepat karirmu.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto pt-4">
                    {[
                        { icon: Clock, label: "± 2-3 Menit Selesai", color: "text-blue-500" },
                        { icon: Cpu, label: "Powered by Gemma 3", color: "text-purple-500" },
                        { icon: Target, label: "Fokus ke Industri", color: "text-green-500" },
                    ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-2 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-slate-100">
                            <item.icon className={cn("h-6 w-6", item.color)} />
                            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">{item.label}</span>
                        </div>
                    ))}
                </div>

                <div className="pt-8">
                    <Button
                        size="lg"
                        onClick={nextStep}
                        className="h-14 px-10 rounded-full bg-[#D7FE44] text-[#1a1a1a] font-black text-lg hover:bg-[#c4ea3d] shadow-xl hover:scale-105 transition-all group cursor-pointer"
                    >
                        Mulai Sekarang
                        <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </div>
        </div>
    );

    const renderPurposeStep = () => (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900">Apa tujuan belajarmu?</h2>
                <p className="mt-2 text-slate-500 font-medium">
                    Tujuan yang jelas membantu AI menyusun roadmap yang lebih relevan dan targeted.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {PURPOSE_OPTIONS.map((option) => (
                    <div
                        key={option.id}
                        onClick={() => setFormData((prev) => ({ ...prev, purpose: option.id }))}
                        className={cn(
                            "relative overflow-hidden cursor-pointer p-5 rounded-xl border-2 transition-all duration-300",
                            formData.purpose === option.id
                                ? "border-[#2443B0] bg-[#2443B0]/5 shadow-md"
                                : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50"
                        )}
                    >
                        <div className="flex items-center gap-5">
                            <div className={cn(
                                "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                                formData.purpose === option.id ? "bg-[#2443B0] text-white" : "bg-slate-100 text-slate-400"
                            )}>
                                <Target className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                                <p className="text-lg font-bold text-slate-900">{option.label}</p>
                                <p className="text-sm text-slate-500 font-medium">{option.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderFieldStep = () => (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900">Pilih bidang yang kamu minati</h2>
                <p className="mt-2 text-slate-500 font-medium">
                    Kami mendukung berbagai jalur karir tech paling populer saat ini.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TRENDING_FIELDS.map((field) => {
                    const Icon = field.icon;
                    const isActive = formData.field === field.id;
                    return (
                        <div
                            key={field.id}
                            onClick={() => setFormData((prev) => ({ ...prev, field: field.id }))}
                            className={cn(
                                "group relative overflow-hidden cursor-pointer p-6 rounded-xl border-2 transition-all duration-300",
                                isActive
                                    ? "border-[#2443B0] bg-[#2443B0]/5 shadow-md"
                                    : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50"
                            )}
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className={cn(
                                        "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                                        isActive ? "bg-[#2443B0] text-white" : "bg-slate-100 text-slate-400 group-hover:bg-[#2443B0]/10 group-hover:text-[#2443B0]"
                                    )}>
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    {field.trending && (
                                        <Badge className="bg-[#D7FE44] text-[#1a1a1a] border-none font-bold hover:bg-[#D7FE44]">
                                            Trending
                                        </Badge>
                                    )}
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-slate-900">{field.name}</p>
                                    <p className="text-sm text-slate-500 font-medium line-clamp-2">{field.description}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    const renderLevelStep = () => (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900">Level kemampuan saat ini</h2>
                <p className="mt-2 text-slate-500 font-medium">
                    Kami sesuaikan kedalaman materi sesuai dengan pengalamanmu sekarang.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SKILL_LEVELS.map((level) => {
                    const Icon = level.icon;
                    const isActive = formData.level === level.id;
                    return (
                        <div
                            key={level.id}
                            onClick={() => setFormData((prev) => ({ ...prev, level: level.id }))}
                            className={cn(
                                "group relative overflow-hidden cursor-pointer p-6 rounded-xl border-2 transition-all duration-300",
                                isActive
                                    ? "border-[#2443B0] bg-[#2443B0]/5 shadow-md"
                                    : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50"
                            )}
                        >
                            <div className="flex flex-col items-center text-center gap-4">
                                <div className={cn(
                                    "flex h-16 w-16 items-center justify-center rounded-[1.5rem] transition-colors",
                                    isActive ? "bg-[#2443B0] text-white shadow-lg shadow-[#2443B0]/20" : "bg-slate-100 text-slate-400 group-hover:bg-[#2443B0]/10 group-hover:text-[#2443B0]"
                                )}>
                                    <Icon className="h-8 w-8" />
                                </div>
                                <div>
                                    <p className="text-xl font-bold text-slate-900">{level.label}</p>
                                    <p className="text-sm text-slate-500 font-medium mt-1">{level.description}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    const renderTimeStep = () => (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900">Komitmen waktu belajar</h2>
                <p className="mt-2 text-slate-500 font-medium">
                    Pilih jadwal yang realistis agar kamu bisa konsisten sampai garis finish.
                </p>
            </div>

            <div className="space-y-8">
                <div className="space-y-4">
                    <p className="text-sm font-bold uppercase tracking-widest text-[#2443B0]">
                        Waktu belajar per hari
                    </p>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {DAILY_TIME_OPTIONS.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => setFormData((prev) => ({ ...prev, dailyTime: option.id }))}
                                className={cn(
                                    "h-14 rounded-xl font-bold text-sm transition-all border-2 cursor-pointer",
                                    formData.dailyTime === option.id
                                        ? "bg-[#2443B0] text-white border-[#2443B0] shadow-lg shadow-[#2443B0]/20"
                                        : "bg-white text-slate-600 border-slate-100 hover:border-slate-300"
                                )}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="text-sm font-bold uppercase tracking-widest text-[#2443B0]">
                        Target durasi selesai
                    </p>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {DURATION_OPTIONS.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => setFormData((prev) => ({ ...prev, duration: option.id }))}
                                className={cn(
                                    "h-14 rounded-xl font-bold text-sm transition-all border-2 cursor-pointer",
                                    formData.duration === option.id
                                        ? "bg-[#2443B0] text-white border-[#2443B0] shadow-lg shadow-[#2443B0]/20"
                                        : "bg-white text-slate-600 border-slate-100 hover:border-slate-300"
                                )}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderGoalStep = () => (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900">Target akhir yang ingin dicapai</h2>
                <p className="mt-2 text-slate-500 font-medium">
                    Jelaskan apa hasil konkret yang kamu harapkan setelah menyelesaikan roadmap ini.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {GOAL_OPTIONS.map((option) => (
                    <div
                        key={option.id}
                        onClick={() => setFormData((prev) => ({ ...prev, goal: option.id }))}
                        className={cn(
                            "relative overflow-hidden cursor-pointer p-5 rounded-[2rem] border-2 transition-all duration-300",
                            formData.goal === option.id
                                ? "border-[#2443B0] bg-[#2443B0]/5 shadow-md"
                                : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50"
                        )}
                    >
                        <div className="flex items-center gap-5">
                            <div className={cn(
                                "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                                formData.goal === option.id ? "bg-[#2443B0] text-white" : "bg-slate-100 text-slate-400"
                            )}>
                                <Trophy className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                                <p className="text-lg font-bold text-slate-900">{option.label}</p>
                                <p className="text-sm text-slate-500 font-medium">{option.description}</p>
                            </div>
                            {formData.goal === option.id && (
                                <div className="h-6 w-6 rounded-full bg-[#2443B0] flex items-center justify-center">
                                    <CheckCircle2 className="h-4 w-4 text-white" />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-3">
                <p className="text-sm font-bold uppercase tracking-widest text-slate-400 px-1">
                    Info tambahan (opsional)
                </p>
                <div className="relative group">
                    <Textarea
                        value={formData.additionalInfo}
                        onChange={(e) => setFormData((prev) => ({ ...prev, additionalInfo: e.target.value }))}
                        placeholder="Contoh: Sudah pernah belajar Python, ingin fokus ke Machine Learning..."
                        className="min-h-[120px] rounded-[1.5rem] border-slate-200 focus:border-[#2443B0] focus:ring-[#2443B0]/10 text-base p-5 transition-all"
                    />
                </div>
            </div>
        </div>
    );

    const renderConfirmStep = () => (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900">Review profilmu</h2>
                <p className="mt-2 text-slate-500 font-medium">
                    Pastikan semua datanya sudah sesuai sebelum AI kami bekerja.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {[
                    { label: "Tujuan", value: PURPOSE_OPTIONS.find((p) => p.id === formData.purpose)?.label, icon: Target },
                    { label: "Bidang", value: TRENDING_FIELDS.find((f) => f.id === formData.field)?.name, icon: Rocket },
                    { label: "Level", value: SKILL_LEVELS.find((l) => l.id === formData.level)?.label, icon: BookOpen },
                    { label: "Waktu / hari", value: DAILY_TIME_OPTIONS.find((t) => t.id === formData.dailyTime)?.label, icon: Clock },
                    { label: "Durasi", value: DURATION_OPTIONS.find((d) => d.id === formData.duration)?.label, icon: Calendar },
                    { label: "Goal", value: GOAL_OPTIONS.find((g) => g.id === formData.goal)?.label, icon: Trophy },
                ].map((item, idx) => {
                    if (!item.value) return null;
                    const Icon = item.icon;
                    return (
                        <div key={idx} className="flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-[2rem] shadow-sm">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2443B0]/10 text-[#2443B0]">
                                <Icon className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                                <p className="text-base font-bold text-slate-900 leading-tight">{item.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="relative overflow-hidden p-6 bg-white border-border border rounded-xl text-white space-y-4">
                <div className="relative z-10 flex items-center gap-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-lg">
                        <ModelIcon brand="google" className="h-8 w-8" />
                    </div>
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-black">
                            AI Engine Ready
                        </p>
                        <p className="text-[#2443B0]/60 font-medium">
                            Powered by Gemma 3 27B model for deep technical structuring.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderGeneratingStep = () => (
        <div className="flex flex-col items-center justify-center gap-8 py-20 text-center animate-in fade-in duration-500">
            <div className="relative">
                <div className="h-24 w-24 rounded-full border-4 border-slate-100 border-t-[#2443B0] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-[#2443B0] animate-pulse" />
                </div>
            </div>
            <div className="space-y-3">
                <h2 className="text-3xl font-black tracking-tight text-slate-900">Sedang menyusun roadmap</h2>
                <p className="text-slate-500 font-medium max-w-md">
                    AI sedang menggabungkan profilmu dengan kurikulum industri terbaru untuk menghasilkan jalur belajar terstruktur.
                </p>
            </div>
            <div className="w-full max-w-md space-y-4 bg-slate-50 p-6 rounded-[2rem]">
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#2443B0] animate-[progress_3s_ease-in-out_infinite]" style={{ width: '60%' }} />
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Memproses kurikulum logis…</p>
            </div>
        </div>
    );

    const renderResultStep = () => (
        <div className="w-full py-8 space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#2443B0]/10 text-[#2443B0] text-sm font-bold">
                    <Rocket className="h-4 w-4 mr-2" />
                    Roadmap Berhasil Dibuat
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 leading-tight">Jalur Belajar Personal Kamu</h2>
                <p className="text-lg text-slate-500 max-w-3xl font-medium leading-relaxed">
                    {roadmapData?.overview || "Berikut adalah struktur pembelajaran yang kami rekomendasikan berdasarkan profilmu."}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {roadmapData?.nodes.map((node, idx) => {
                    const isCheckpoint = node.type === "checkpoint";
                    return (
                        <div
                            key={node.id}
                            className={cn(
                                "group relative overflow-hidden bg-white rounded-xl border-2 transition-all duration-300 hover:shadow-xl",
                                isCheckpoint ? "border-[#D7FE44] bg-[#D7FE44]/5" : "border-slate-100"
                            )}
                        >
                            <div className="p-8 space-y-6">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "flex h-10 w-10 items-center justify-center rounded-xl font-black text-sm",
                                            isCheckpoint ? "bg-[#D7FE44] text-[#1a1a1a]" : "bg-[#2443B0] text-white"
                                        )}>
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <Badge variant="outline" className={cn(
                                                "text-[10px] font-bold uppercase tracking-widest",
                                                isCheckpoint ? "border-[#D7FE44] text-[#1a1a1a]" : "border-slate-200 text-slate-400"
                                            )}>
                                                {isCheckpoint ? "Checkpoint: Project" : `Fase ${idx + 1}`}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="rounded-full h-9 px-4 text-xs font-bold border border-slate-100 bg-white hover:bg-slate-50 cursor-pointer"
                                            onClick={() => {
                                                setSelectedTopic(node);
                                                setIsDetailOpen(true);
                                                setActiveTab("resources");
                                            }}
                                        >
                                            <BookOpen className="h-3.5 w-3.5 mr-2" />
                                            Detail Materi
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="rounded-full h-9 px-4 text-xs font-bold bg-[#2443B0] text-white hover:bg-[#1a36a9] cursor-pointer"
                                            onClick={() => {
                                                setSelectedTopic(node);
                                                setIsDetailOpen(true);
                                                setActiveTab("tutor");
                                            }}
                                        >
                                            <Sparkles className="h-3.5 w-3.5 mr-2" />
                                            AI Tutor
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-[#2443B0] transition-colors">
                                        {node.title}
                                    </h3>
                                    <p className="text-slate-500 font-medium leading-relaxed max-w-4xl">
                                        {node.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-12 flex items-center justify-center border-t border-slate-100 pt-10" ref={messagesEndRef}>
                <Button
                    variant="outline"
                    size="lg"
                    onClick={resetForm}
                    className="h-14 px-8 rounded-full border-slate-200 text-slate-600 font-bold hover:bg-slate-50 gap-2 cursor-pointer"
                >
                    <ArrowLeft className="h-5 w-5" />
                    Mulai Ulang Builder
                </Button>
            </div>

            {/* Detail topic sheet */}
            <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                <SheetContent className="w-full sm:max-w-2xl p-0 border-l border-slate-100 shadow-2xl overflow-hidden rounded-l-4xl">
                    <div className="flex h-full flex-col bg-white">
                        <div className="relative p-8 bg-[#2443B0] text-white">
                            <div className="relative z-10 space-y-2">
                                <Badge className="bg-[#D7FE44] text-[#1a1a1a] border-none font-black text-[10px] uppercase tracking-widest hover:bg-[#D7FE44]">
                                    Learning Module
                                </Badge>
                                <SheetTitle className="text-3xl font-black tracking-tight leading-tight text-white m-0">
                                    {selectedTopic?.title || "Topic Details"}
                                </SheetTitle>
                            </div>
                        </div>

                        <Tabs
                            value={activeTab}
                            onValueChange={(v) => setActiveTab(v as any)}
                            className="flex h-full flex-col"
                        >
                            <TabsList className="grid w-full grid-cols-2 h-14 bg-slate-100/50 p-1.5 rounded-xl">
                                <TabsTrigger value="resources" className="rounded-md font-bold text-sm data-[state=active]:bg-white data-[state=active]:text-[#2443B0] data-[state=active]:shadow-sm cursor-pointer">
                                    <Link className="mr-2 h-4 w-4" />
                                    Bahan Materi
                                </TabsTrigger>
                                <TabsTrigger value="tutor" className="rounded-md font-bold text-sm data-[state=active]:bg-white data-[state=active]:text-[#2443B0] data-[state=active]:shadow-sm cursor-pointer">
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Tanya Root
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="resources" className="flex-1 data-[state=active]:flex flex-col mt-0">
                                <ScrollArea className="flex-1">
                                    <div className="p-8 space-y-8">
                                        <div className="space-y-3">
                                            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                                                Overview Pembelajaran
                                            </p>
                                            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                                <p className="text-slate-600 font-medium leading-relaxed">
                                                    {selectedTopic?.description}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                                                Ekosistem Belajar (Suggested Links)
                                            </p>
                                            <div className="grid gap-3">
                                                {selectedTopic?.resources && selectedTopic.resources.length > 0 ? (
                                                    selectedTopic.resources.map((res, i) => (
                                                        <a
                                                            key={i}
                                                            href={res.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="group flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:border-[#D7FE44] hover:bg-[#D7FE44]/5 transition-all"
                                                        >
                                                            <div className="flex items-center gap-4">
                                                                <div className={cn(
                                                                    "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                                                                    res.type === "video" ? "bg-red-50 text-red-500 group-hover:bg-red-100" : "bg-blue-50 text-blue-500 group-hover:bg-blue-100"
                                                                )}>
                                                                    {res.type === "video" ? (
                                                                        <Zap className="h-6 w-6" />
                                                                    ) : (
                                                                        <BookOpen className="h-6 w-6" />
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <p className="font-bold text-slate-900 text-base">{res.label}</p>
                                                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                                                                        {res.type} Resource
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#2443B0] group-hover:text-white transition-all">
                                                                <ArrowRight className="h-4 w-4" />
                                                            </div>
                                                        </a>
                                                    ))
                                                ) : (
                                                    <div className="text-center py-10 px-6 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                                                        <p className="text-sm text-slate-400 font-medium">
                                                            Belum ada link materi spesifik. <br />Gunakan AI Tutor di tab sebelah untuk meminta bantuan.
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </ScrollArea>
                            </TabsContent>

                            <TabsContent value="tutor" className="flex-1 data-[state=active]:flex flex-col mt-0">
                                <ScrollArea className="flex-1">
                                    <div className="p-8 space-y-6">

                                        {/* Greeting jika belum ada pesan */}
                                        {(!selectedTopic || !(topicMessages[selectedTopic.id] || []).length) && (
                                            <div className="flex flex-col items-center justify-center text-center py-16 text-slate-400 space-y-3">
                                                <div className="h-12 w-12 rounded-full bg-[#2443B0]/5 flex items-center justify-center mb-2">
                                                    <Sparkles className="h-6 w-6 text-[#2443B0]" />
                                                </div>
                                                <h3 className="text-lg font-semibold text-slate-700">
                                                    Selamat datang di Root AI
                                                </h3>
                                                <p className="max-w-md text-sm leading-relaxed">
                                                    Pilih topik di sebelah kiri, lalu ajukan pertanyaanmu di sini.
                                                    Aku akan membantu kamu belajar dengan penjelasan yang mudah dipahami.
                                                </p>
                                            </div>
                                        )}

                                        {selectedTopic &&
                                            (topicMessages[selectedTopic.id] || []).map((msg, i) => (
                                                <div
                                                    key={i}
                                                    className={cn(
                                                        "flex w-full gap-3",
                                                        msg.role === "user" ? "flex-row-reverse" : "flex-row"
                                                    )}
                                                >
                                                    <div
                                                        className={cn(
                                                            "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                                                            msg.role === "user"
                                                                ? "bg-slate-100 text-slate-500"
                                                                : "bg-[#2443B0] text-white"
                                                        )}
                                                    >
                                                        {msg.role === "user" ? (
                                                            <User className="h-4 w-4" />
                                                        ) : (
                                                            <Sparkles className="h-4 w-4" />
                                                        )}
                                                    </div>
                                                    <div
                                                        className={cn(
                                                            "max-w-[85%] rounded-[1.5rem] p-4 text-sm font-medium leading-relaxed",
                                                            msg.role === "user"
                                                                ? "bg-[#2443B0] text-white rounded-tr-none"
                                                                : "bg-slate-100 text-slate-800 rounded-tl-none"
                                                        )}
                                                    >
                                                        {msg.content}
                                                    </div>
                                                </div>
                                            ))}

                                        {tutorLoading && (
                                            <div className="flex gap-3">
                                                <div className="h-8 w-8 rounded-full bg-[#2443B0] flex items-center justify-center flex-shrink-0 animate-pulse">
                                                    <Sparkles className="h-4 w-4 text-white" />
                                                </div>
                                                <div className="bg-slate-50 rounded-[1.5rem] p-4 rounded-tl-none flex items-center gap-2">
                                                    <div className="h-1.5 w-1.5 bg-slate-300 rounded-full animate-bounce" />
                                                    <div className="h-1.5 w-1.5 bg-slate-300 rounded-full animate-bounce delay-75" />
                                                    <div className="h-1.5 w-1.5 bg-slate-300 rounded-full animate-bounce delay-150" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </ScrollArea>
                                <div className="p-8 border-t border-slate-100 bg-slate-50/50">
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            handleTutorChat();
                                        }}
                                        className="relative"
                                    >
                                        <Textarea
                                            rows={2}
                                            value={tutorInput}
                                            onChange={(e) => setTutorInput(e.target.value)}
                                            placeholder={`Apa yang ingin kamu ketahui tentang ${selectedTopic?.title ?? "topik ini"}?`}
                                            className="w-full bg-white rounded-3xl border-slate-200 focus:border-[#2443B0] focus:ring-[#2443B0]/10 p-5 pr-14 resize-none shadow-sm text-sm font-medium"
                                        />
                                        <Button
                                            type="submit"
                                            size="icon"
                                            disabled={tutorLoading || !tutorInput.trim()}
                                            className="absolute right-3 bottom-3 h-10 w-10 rounded-xl bg-[#2443B0] text-white hover:bg-[#1a36a9] cursor-pointer"
                                        >
                                            <ArrowRight className="h-5 w-5" />
                                        </Button>
                                    </form>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );

    // ============================================
    // MAIN RENDER
    // ============================================

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Header />
            <div className="pt-24 pb-20">
                <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
                    {step === "welcome" ? (
                        renderWelcomeStep()
                    ) : step === "result" ? (
                        renderResultStep()
                    ) : (
                        <div className="flex flex-col gap-8 lg:flex-row items-start">
                            {/* Sidebar stepper */}
                            <aside className="lg:w-80 w-full sticky top-24">
                                <div className="bg-white rounded-xl p-8 text-white space-y-8 border-2 border-border overflow-hidden relative">
                                    <div className="relative z-10 space-y-4">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black">
                                                Builder Progress
                                            </p>
                                            <h3 className="text-2xl font-black text-[#2443B0]">Roadmap Wizard</h3>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between items-end">
                                                <span className="text-xs font-bold text-black/40 uppercase tracking-widest">Step {getStepNumber()} of 6</span>
                                                <span className="text-sm font-black text-black">{Math.round((getStepNumber() / 6) * 100)}%</span>
                                            </div>
                                            <div className="h-2 w-full rounded-full bg-[#2443B0]/10 overflow-hidden">
                                                <div
                                                    className="h-full rounded-full bg-[#2443B0] transition-all duration-700 ease-out"
                                                    style={{ width: `${(getStepNumber() / 6) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative z-10 space-y-2">
                                        {STEPS.map((s, i) => {
                                            const isActive = step === s.id;
                                            const isCompleted = getStepNumber() > i + 1;
                                            const Icon = s.icon;
                                            return (
                                                <div
                                                    key={s.id}
                                                    className={cn(
                                                        "flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-bold transition-all",
                                                        isActive
                                                            ? "bg-white text-[#2443B0] border"
                                                            : isCompleted
                                                                ? "text-[#2443B0]/40 hover:bg-white/5"
                                                                : "text-[#2443B0]/40"
                                                    )}
                                                >
                                                    <div
                                                        className={cn(
                                                            "flex h-8 w-8 items-center justify-center rounded-md border-2 transition-all",
                                                            isActive
                                                                ? "border-[#D7FE44] bg-[#D7FE44] text-[#1a1a1a]"
                                                                : isCompleted
                                                                    ? "border-[#2443B0] bg-[#2443B0]/20 text-[#2443B0]"
                                                                    : "border-[#2443B0]/10 text-[#2443B0]/10"
                                                        )}
                                                    >
                                                        {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Icon className={cn("h-4 w-4", !isActive && !isCompleted && "opacity-20")} />
                                                        <span className="truncate">{s.label}</span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </aside>

                            {/* Main content */}
                            <main className="flex-1 w-full">
                                <div className="bg-white rounded-xl border-2 border-border p-6 sm:p-12 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] min-h-[600px] flex flex-col">
                                    <div className="flex-1">
                                        {step === "purpose" && renderPurposeStep()}
                                        {step === "field" && renderFieldStep()}
                                        {step === "level" && renderLevelStep()}
                                        {step === "time" && renderTimeStep()}
                                        {step === "goal" && renderGoalStep()}
                                        {step === "confirm" && renderConfirmStep()}
                                        {step === "generating" && renderGeneratingStep()}
                                    </div>

                                    {step !== "generating" && (
                                        <div className="mt-12 flex items-center justify-between border-t border-slate-100 pt-8">
                                            <Button
                                                variant="ghost"
                                                size="lg"
                                                onClick={prevStep}
                                                disabled={step === "purpose"}
                                                className="rounded-xl px-6 h-12 font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-50 gap-2 cursor-pointer"
                                            >
                                                <ArrowLeft className="h-5 w-5" />
                                                Sebelumnya
                                            </Button>
                                            <Button
                                                size="lg"
                                                onClick={step === "confirm" ? handleGenerateRoadmap : nextStep}
                                                disabled={!canProceed()}
                                                className={cn(
                                                    "rounded-xl px-4 h-12 font-black shadow-lg transition-all gap-2 cursor-pointer",
                                                    step === "confirm"
                                                        ? "bg-[#D7FE44] text-[#1a1a1a] hover:bg-[#c4ea3d] hover:scale-105"
                                                        : "bg-[#2443B0] text-white hover:bg-[#1a36a9]"
                                                )}
                                            >
                                                {step === "confirm" ? "Selesaikan & Build" : "Langkah Berikutnya"}
                                                <ArrowRight className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </main>
                        </div>
                    )}
                </div>
            </div>

            {/* Global animations */}
            <style jsx global>{`
                @keyframes progress {
                    0% { transform: translateX(-100%); }
                    50% { transform: translateX(0); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
}