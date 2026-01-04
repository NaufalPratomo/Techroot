# <img src="./client/public/assets/logo.png" width="40" height="40" valign="middle"> Techroot: Empowering Your Code Roots with AI

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![Supabase](https://img.shields.io/badge/Supabase-DB-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

**Techroot** bukan sekadar platform belajar biasa. Ia adalah ekosistem pendidikan cerdas yang dirancang untuk menumbuhkan akar keahlian Anda di dunia teknologi dari dasar hingga mahir, didorong oleh kekuatan _Large Language Models_ (LLM) terkini.

---

## 🌟 Visi Narrative

Di tengah belantara informasi teknologi yang meluap, banyak pengembang berbakat layu sebelum berkembang karena kehilangan arah. **Techroot** hadir sebagai nutrisi digital yang memandu setiap individu melalui jalur yang unik—sesuai kecepatan, mimpi, dan cara mereka belajar. Kami percaya bahwa setiap pengembang hebat tumbuh dari akar yang kuat, dan AI adalah katalisator terbaik untuk mempercepat pertumbuhan itu.

---

## 🚀 Fitur Unggulan

### 🗺️ AI Roadmap Wizard

Lupakan kurikulum kaku yang sama untuk semua orang. Dengan **AI Roadmap Wizard**, Anda hanya perlu berdialog sebentar tentang mimpi Anda, dan AI kami akan meramu jalur belajar yang presisi, lengkap dengan estimasi waktu dan sumber daya terbaik.

### 🤖 Tanya Root (The AI Tutor)

Bingung dengan konsep _Recursion_? Error _Undefined is not a function_ bikin pening? **Tanya Root** adalah asisten yang selalu siaga di setiap halaman materi. Ia bukan sekadar chatbot; ia adalah tutor yang mengenal konteks belajar Anda dan mampu memberikan solusi instan.

### 💻 Integrated Code Playground

Belajar tanpa praktik adalah mimpi di siang bolong. Techroot menyediakan **Playground** langsung di browser. Tulis kode, jalankan, dan lihat hasilnya tanpa perlu instalasi lingkungan yang rumit di perangkat Anda.

### 🏆 Gamified Growth

Dapatkan **XP** dan koleksi **Badge** eksklusif setiap kali Anda menyelesaikan modul. Progres Anda terekam secara real-time, memberikan kepuasan visual atas setiap inci pertumbuhan keahlian Anda.

---

## 🧩 Masalah & Solusi

| Masalah                                                        | Solusi Techroot                                                         |
| :------------------------------------------------------------- | :---------------------------------------------------------------------- |
| **Paradox of Choice**: Kebingungan memilih ribuan tutorial.    | **AI Curated Paths**: Jalur belajar tunggal yang paling relevan.        |
| **Cold Start Problem**: Sulit mulai belajar teknologi baru.    | **Guided Wizard**: Pengarahan langkah demi langkah sejak menit pertama. |
| **Learning Blockers**: Macet karena error yang sulit dipahami. | **Contextual AI Assistance**: Bantuan teknis yang memahami modul Anda.  |

---

## 🛠️ Arsitektur & Teknologi

Techroot dibangun dengan prinsip modernitas dan performa tinggi:

### 🎨 Frontend Performance

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Server Components)
- **UI Engine**: [React 19](https://react.dev/)
- **Visuals**: [Tailwind CSS 4](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Micro-Animations**: Custom CSS Transitions & Framer Motion logic.

### ⚙️ Backend & Intelligence

- **Server**: [Express 5](https://expressjs.com/) on Node.js
- **Persistence**: [PostgreSQL via Supabase](https://supabase.com/)
- **Authentication**: [Supabase Auth](https://supabase.com/auth)

### 🧠 AI Brains (The Roots)

Kami mengintegrasikan teknologi LLM terbaik untuk berbagai kebutuhan:

- 🔵 **Google Gemma 3**: Otak utama untuk struktur roadmap.
- 🟢 **Xiaomi Mimo V2**: Respons cepat untuk dialog ringan.
- 🟠 **Nvidia Nemotron**: Spesialis logika teknis dan arsitektur.
- 🔴 **Deepseek R1**: _Deep reasoning_ untuk tantangan coding yang kompleks.

---

## 📂 Struktur Folder

```bash
Techroot/
│
├── 📱 client/                          # Frontend Next.js Application
│   ├── public/                         # Static assets
│   │   ├── assets/                     # Media files
│   │   │   ├── hero-students.png       # Hero section image
│   │   │   ├── logo.png                # Techroot logo
│   │   │   └── model/                  # AI brand logos (google, nvidia, etc.)
│   │   └── polinema.png                # Partner logo
│   │
│   └── src/                            # Source code
│       ├── app/                        # Next.js App Router (Pages)
│       │   ├── (auth)/                 # Auth pages group
│       │   │   ├── login/              # Login page
│       │   │   └── register/           # Registration page
│       │   ├── dashboard/              # User dashboard
│       │   ├── learn/                  # Learning interface
│       │   ├── paths/                  # Learning paths catalog
│       │   │   └── [pathId]/           # Dynamic path details
│       │   ├── playground/             # Code playground page
│       │   ├── roadmap/                # AI Roadmap Wizard
│       │   ├── result/                 # Quiz result page
│       │   ├── layout.tsx              # Root layout
│       │   ├── page.tsx                # Landing page (Home)
│       │   └── globals.css             # Global styles
│       │
│       ├── components/                 # React Components
│       │   ├── layout/
│       │   │   └── Header.tsx          # Navigation header
│       │   ├── ui/                     # Shadcn UI Components
│       │   │   ├── button.tsx
│       │   │   ├── card.tsx
│       │   │   ├── dialog.tsx
│       │   │   ├── dropdown-menu.tsx
│       │   │   ├── tabs.tsx
│       │   │   ├── toast.tsx
│       │   │   └── ... (20+ components)
│       │   ├── AIStarterPage.tsx       # AI Chat interface (Tanya Root)
│       │   ├── CodePlayground.tsx      # Multi-language code editor
│       │   ├── DiscussionForum.tsx     # Module discussion forum
│       │   ├── LessonContent.tsx       # Lesson renderer (material/video/quiz)
│       │   ├── LearningSidebar.tsx     # Learning navigation sidebar
│       │   ├── ModuleSidebar.tsx       # Module navigation
│       │   ├── ModuleCard.tsx          # Module card component
│       │   ├── PathCard.tsx            # Learning path card
│       │   ├── BadgeDisplay.tsx        # Achievement badges
│       │   └── StatsDisplay.tsx        # XP/Level/Streak stats
│       │
│       ├── constants/                  # Static data & configurations
│       │   ├── index.ts                # Barrel export
│       │   ├── ai.ts                   # AI model configurations
│       │   └── landing.ts              # Landing page data (categories, testimonials)
│       │
│       ├── context/
│       │   └── UserContext.tsx         # Global user state (auth, progress, XP)
│       │
│       ├── data/
│       │   └── learningPaths.ts        # Learning curriculum data & helpers
│       │
│       ├── hooks/                      # Custom React hooks
│       │   ├── use-mobile.tsx          # Mobile detection hook
│       │   └── use-toast.ts            # Toast notification hook
│       │
│       ├── lib/                        # Utilities & helpers
│       │   ├── api.ts                  # API client & storage helpers
│       │   ├── helpers.ts              # Common utility functions
│       │   ├── supabase.ts             # Supabase client initialization
│       │   └── utils.ts                # cn() classname utility
│       │
│       └── types/
│           └── index.ts                # TypeScript interfaces (User, Progress, etc.)
│
├── ⚙️ server/                          # Backend Express.js API
│   ├── api/
│   │   └── index.ts                    # Vercel serverless entry point
│   │
│   └── src/
│       ├── config/
│       │   └── env.ts                  # Environment configuration
│       │
│       ├── lib/
│       │   └── supabase.ts             # Supabase client
│       │
│       ├── middleware/
│       │   └── auth.ts                 # JWT authentication middleware
│       │
│       ├── routes/                     # API endpoints
│       │   ├── ai.route.ts             # POST /api/ai/chat - AI chat proxy
│       │   ├── auth.route.ts           # POST /api/auth/* - Authentication
│       │   ├── discussion.route.ts     # GET/POST /api/discussions/:moduleId
│       │   ├── health.route.ts         # GET /api/health - Server health check
│       │   └── progress.route.ts       # GET/POST /api/progress/* - User progress
│       │
│       ├── app.ts                      # Express app configuration
│       └── server.ts                   # Server entry point
│
├── 📄 README.md                        # Project documentation
├── 📄 vercel.json                      # Vercel deployment config
└── 📄 .gitignore                       # Git ignore rules
```

### 📁 Arsitektur Kode (Clean Code)

| Layer         | Folder                      | Deskripsi                            |
| ------------- | --------------------------- | ------------------------------------ |
| **Types**     | `client/src/types/`         | Semua TypeScript interfaces terpusat |
| **Constants** | `client/src/constants/`     | Data statis & konfigurasi            |
| **Utilities** | `client/src/lib/`           | Helper functions & API client        |
| **State**     | `client/src/context/`       | Global state management              |
| **Data**      | `client/src/data/`          | Learning curriculum & helpers        |
| **UI**        | `client/src/components/ui/` | Shadcn reusable components           |
| **Features**  | `client/src/components/`    | Feature-specific components          |
| **Pages**     | `client/src/app/`           | Next.js App Router pages             |

---

## � Timeline Pengerjaan

- **Minggu 1 (Des 2025)**: Perancangan Arsitektur & Integrasi Database.
- **Minggu 2 (Des 2025)**: Pengembangan AI Roadmap Wizard.
- **Minggu 3 (Jan 2026)**: Implementasi Tanya Root & Code Playground.
- **Minggu 4 (Jan 2026)**: Polishing UI, Gamifikasi, & Final QA.

---

## 👥 Kontributor

Proyek ini tumbuh berkat dedikasi dari para pengembang berikut:

- **Riovaldo Alfiyan Fahmi Rahman** ([@ckckckcz](https://github.com/ckckckcz)) - _Lead Architect & Fullstack Developer_
- **Naufal Pratomo** ([@NaufalPratomo](https://github.com/NaufalPratomo)) - _Data Researcher_
- **Antigravity AI** - _AI Development Assistant_

---

## 📄 Lisensi

Techroot dilisensikan di bawah [MIT License](LICENSE). Mari membangun ekosistem edukasi yang lebih baik bersama-sama!

---

<p align="center">
  Didesain dengan perhatian pada detail dan didorong oleh masa depan AI.
</p>
