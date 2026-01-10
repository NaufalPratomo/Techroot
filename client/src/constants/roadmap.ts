import {
    Code2,
    Rocket,
    BarChart3,
    Zap,
    Target,
    Sparkles,
    BookOpen,
    GraduationCap,
    Briefcase,
    Trophy
} from "lucide-react";

export const AVAILABLE_MAJORS = ["Teknik Informatika", "Sistem Informasi"] as const;

export const TRENDING_FIELDS = [
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

export const PURPOSE_OPTIONS = [
    { id: "from-scratch", label: "Mulai dari nol", description: "Belum punya pengalaman sama sekali" },
    { id: "career-switch", label: "Pindah karir", description: "Sudah bekerja tapi ingin switch ke tech" },
    { id: "skill-upgrade", label: "Upgrade skill", description: "Sudah punya dasar, ingin level up" },
    { id: "job-ready", label: "Siap kerja", description: "Ingin segera dapat pekerjaan di bidang ini" },
    { id: "freelance", label: "Jadi freelancer", description: "Ingin memulai karir freelance" },
];

export const SKILL_LEVELS = [
    { id: "beginner", label: "Pemula", description: "Belum pernah coding sama sekali", icon: BookOpen },
    { id: "intermediate", label: "Menengah", description: "Sudah paham dasar programming", icon: GraduationCap },
    { id: "advanced", label: "Mahir", description: "Sudah bisa membuat project sendiri", icon: Briefcase },
    { id: "professional", label: "Profesional", description: "Sudah bekerja di industri", icon: Trophy },
];

export const DAILY_TIME_OPTIONS = [
    { id: "1-2", label: "1-2 jam/hari", hours: 1.5 },
    { id: "2-4", label: "2-4 jam/hari", hours: 3 },
    { id: "4-6", label: "4-6 jam/hari", hours: 5 },
    { id: "6+", label: "6+ jam/hari (fulltime)", hours: 7 },
];

export const DURATION_OPTIONS = [
    { id: "1-month", label: "1 bulan", months: 1 },
    { id: "3-months", label: "3 bulan", months: 3 },
    { id: "6-months", label: "6 bulan", months: 6 },
    { id: "12-months", label: "12 bulan", months: 12 },
];

export const GOAL_OPTIONS = [
    { id: "portfolio", label: "Membangun portfolio", description: "Punya 3-5 project untuk ditunjukkan" },
    { id: "first-job", label: "Dapat pekerjaan pertama", description: "Siap interview dan dapat offer" },
    { id: "promotion", label: "Naik jabatan", description: "Dari junior ke mid-level atau senior" },
    { id: "certification", label: "Dapat sertifikasi", description: "Sertifikasi profesional yang diakui" },
    { id: "side-income", label: "Penghasilan sampingan", description: "Mulai dapat project freelance" },
];

export const REQUESTED_MODELS = [
    {
        id: "google/gemma-3-27b-it:free",
        name: "Gemma 3 27B",
        description: "Google (Terbaru)",
        brand: "google",
        color: "#4285F4",
    },
];
