# <img src="./client/public/assets/logo.png" width="40" height="40" valign="middle"> Techroot: Empowering Your Code Roots with AI

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![Supabase](https://img.shields.io/badge/Supabase-DB-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

**Techroot** bukan sekadar platform belajar biasa. Ia adalah ekosistem pendidikan cerdas yang dirancang untuk menumbuhkan akar keahlian Anda di dunia teknologi dari dasar hingga mahir, didorong oleh kekuatan _Large Language Models_ (LLM) terkini.

---

## 🚀 Fitur Unggulan Terkini

### 🗺️ AI Roadmap Wizard

Lupakan kurikulum kaku yang sama untuk semua orang. Dengan **AI Roadmap Wizard**, Anda hanya perlu berdialog sebentar tentang mimpi Anda, dan AI kami akan meramu jalur belajar yang presisi, lengkap dengan estimasi waktu dan sumber daya terbaik.

### 🤖 Tanya Root (The AI Tutor)

Bingung dengan konsep _Recursion_? Error _Undefined is not a function_ bikin pening? **Tanya Root** adalah asisten yang selalu siaga di setiap halaman materi. Ia menggunakan konteks modul yang sedang Anda pelajari untuk memberikan bimbingan instan.

### 📊 Dynamic Mastery Dashboard

Visualisasi progres belajar yang sepenuhnya dinamis. Menampilkan **XP**, **Level**, **Streak**, serta jumlah modul dan pelajaran yang telah diselesaikan secara real-time dari database.

### 👤 Responsive Profile Management

Kelola identitas digital Anda dengan sistem profil yang cerdas:

- **Desktop**: Dialog modal yang elegan untuk pembaruan cepat.
- **Mobile/Tablet**: _Standard-compliant bottom sheet_ (drawer) untuk aksesibilitas maksimal.
- **Avatar Customization**: Integrasi dengan **DiceBear API (Thumbs collection)** untuk ribuan variasi karakter unik.

---

## 🛠️ Arsitektur & Teknologi

Techroot dibangun dengan prinsip modernitas, performa tinggi, dan skalabilitas:

### 🎨 Frontend Ecosystem

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **UI Engine**: [React 19](https://react.dev/) dengan _Concurrent Rendering_
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) untuk fleksibilitas desain premium.
- **Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI) yang dikustomisasi penuh.

### ⚙️ Backend & Intelligence

- **Platform**: Node.js dengan [Express 5](https://expressjs.com/)
- **Database**: [PostgreSQL (Supabase)](https://supabase.com/)
- **AI Engines**: Deepseek R1, Google Gemma 3, Nvidia Nemotron.

---

## 📂 Struktur Folder & Fungsi (Clean Architecture)

```bash
Techroot/
│
├── 📱 client/                          # Frontend Next.js Application
│   ├── src/
│   │   ├── app/                        # [Fungsi] Root Navigasi & Halaman Utama.
│   │   │   ├── profile/                # Menangani Profile Page & Edit Logic (Modal/Sheet).
│   │   │   ├── learn/                  # Antarmuka pembelajaran interaktif (Video/Materi).
│   │   │   └── roadmap/                # Alur pembuatan Roadmap otomatis berbasis AI.
│   │   ├── components/                 # [Fungsi] Reusable UI unit.
│   │   │   ├── layout/                 # Komponen struktur global (Header, Footer, Sidebar).
│   │   │   └── ui/                     # Komponen atomik (Buttons, Dialogs) dari Shadcn.
│   │   ├── context/                    # [Fungsi] Centralized State (UserContext).
│   │   │                               # Mengatur auth, XP, & progress di seluruh aplikasi.
│   │   ├── lib/                        # [Fungsi] Utilities & Service client (API, Supabase).
│   │   └── types/                      # [Fungsi] TypeScript Definitions (Antarmuka Kontrak Data).
│   └── next.config.ts                  # Konfigurasi Next.js (Image optimization, dll).
│
├── ⚙️ server/                          # Backend Express.js API
│   ├── src/
│   │   ├── routes/                     # [Fungsi] API Endpoints (Auth, AI, Progress).
│   │   ├── middleware/                 # [Fungsi] Security Layer (JWT & Rate Limiting).
│   │   └── lib/                        # [Fungsi] Database & External Service Connection.
│   └── server.ts                       # Entry Point API.
│
└── 📄 README.md                        # Project Documentation.
```

---

## 🔄 Alur Data Dinamis (Deep Dive)

Aplikasi Techroot bekerja dengan sinkronisasi data real-time antara Client dan server melalui beberapa mekanisme utama:

### 1. Siklus Autentikasi & Sesi

- **Initial Load**: Saat aplikasi dibuka, Client memeriksa JWT di storage dan memanggil `/api/auth/me`.
- **Persistence**: Server memvalidasi token melalui Middleware. Jika valid, data user dikirim ke Client dan disimpan di `UserContext` untuk menghindari "flicker" saat navigasi.

### 2. Gamifikasi & Sinkronisasi Progress

- **Aksi Belajar**: Setiap kali user menyelesaikan kuis atau materi, Client mengirimkan request ke `/api/progress/lesson`.
- **Logic Server**: Server memvalidasi integritas data, menghitung XP, dan memperbarui tabel `user_progress` serta data `streak` di database.
- **Live UI Update**: Response sukses dari server akan memicu update `UserContext` secara instan, sehingga bar progres dan level di dashboard berubah tanpa perlu refresh halaman.

### 3. Ekosistem AI Tutoring (Tanya Root)

- **Konteks**: Client mengirimkan pertanyaan beserta context modul yang sedang dipelajari ke `/api/ai/chat`.
- **Proxying**: Server bertindak sebagai perantara (proxy) untuk menyuntikkan API Key secara aman sebelum diteruskan ke provider LLM (Deepseek/Google/Nvidia).
- **Hasil**: Jawaban dikembalikan sebagai streaming atau JSON terstruktur untuk ditampilkan langsung di UI asisten.

### 4. Manajemen UI Responsif (Adaptive Layout)

- **Decision Engine**: Aplikasi menggunakan hook `use-mobile` untuk mendeteksi ukuran layar secara real-time.
- **Switching**: Jika layar < 1024px (Mobile/Tablet), fitur Edit Profil akan dirender sebagai `Sheet` (Bottom Drawer). Jika > 1024px, fitur tersebut akan menggunakan `Dialog` (Modal Tengah). Ini memastikan UX yang native di setiap perangkat.

---

## 👥 Tim Kontributor

- **Riovaldo Alfiyan Fahmi Rahman** ([@ckckckcz](https://github.com/ckckckcz)) - _Lead Architect & Fullstack Developer_
- **Naufal Pratomo** ([@NaufalPratomo](https://github.com/NaufalPratomo)) - _Data Researcher_

---

## 📄 Lisensi

Techroot dilisensikan di bawah [MIT License](LICENSE). Mari membangun ekosistem edukasi yang lebih cerdas bersama-sama!

---

<p align="center">
  <b>Built with ❤️ at Techroot Dev Labs</b><br>
  <i>"Growing Great Developers from Strong Roots"</i>
</p>
