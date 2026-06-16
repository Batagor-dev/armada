# Base Structure Project

Proyek ini dibangun menggunakan **Next.js versi 16** dan memerlukan **Node.js versi 26.1.0**.

## 📂 Struktur Folder Proyek

Struktur direktori di bawah ini dirancang untuk mempermudah skalabilitas dan kerapian kode. Berikut adalah penjelasan (dalam Bahasa Indonesia) untuk masing-masing folder:

```text
my-app/
│
├── src/                     # App Router Next.js (Folder utama untuk routing halaman)
│   └── app/                 # App Router Next.js (Folder utama untuk routing halaman)
│       ├── layout.tsx       # Layout dasar/utama untuk seluruh aplikasi
│       ├── page.tsx         # Halaman utama (Home page)
│       └── globals.css      # CSS global
│
├── components/              # Tempat untuk komponen UI yang bisa digunakan ulang (Reusable UI)
│   ├── ui/                  # Komponen UI dasar dan kecil (seperti Button, Input, Modal)
│   │   └── button.tsx       # Komponen UI dasar dan kecil (seperti Button, Input, Modal)
│   ├── shared/              # Komponen gabungan yang dipakai di banyak tempat (seperti Navbar, Footer)
│   │   └── navbar.tsx       # Komponen Navbar
│   └── sections/            # Komponen besar yang mewakili satu bagian halaman (seperti HeroSection)
│       └── hero.tsx         # Komponen Hero Section
│
├── features/                # Kode yang dikelompokkan secara spesifik berdasarkan "Fitur" (Feature-driven)
│   └── auth/                # (Contoh: Fitur Autentikasi / Login)
│       ├── components/      # Komponen UI yang HANYA dipakai untuk fitur Auth
│       │   └── login-form.tsx # Komponen Login Form
│       ├── hooks/           # Custom hooks yang HANYA dipakai untuk fitur Auth
│       │   └── useLogin.ts  # Custom hook Login
│       ├── services/        # Logika pemanggilan API (Fetch/Axios) untuk fitur Auth
│       │   └── login.ts     # Service untuk fitur Auth
│       ├── store/           # State management khusus untuk fitur Auth
│       │   └── auth.store.ts # State Auth      
│       ├── types/           # Definisi tipe data TypeScript khusus untuk fitur Auth
│       │   └── auth.types.ts # Tipe data Auth
│       └── utils/           # Definisi utility khusus untuk fitur Auth
│           └── validate-password.ts # Validasi password
│
├── lib/                     # Utility global (Fungsi-fungsi pembantu umum yang bisa dipakai di mana saja)
│   ├── axios.ts             # Konfigurasi Axios
│   ├── fetcher.ts           # Konfigurasi Fetch API
│   ├── prisma.ts            # Konfigurasi Prisma ORM
│   └── utils.ts             # Utility global
│
├── hooks/                   # Custom hooks global (Hooks pembantu umum)
│   ├── useTheme.ts          # Custom hook untuk tema
│   └── useDebounce.ts       # Custom hook untuk debounce
│
├── constants/               # Data statis global (Misalnya URL dasar, daftar menu statis, nilai konstan)
│   ├── routes.ts            # Definisi rute aplikasi
│   └── metadata.ts          # Metadata aplikasi
│
├── public/                  # Aset publik statis (Bisa diakses langsung lewat URL browser)
│   ├── images/              # Folder khusus gambar (PNG, JPG, dll)
│   └── icons/               # Folder khusus ikon (SVG, ICO, dll)
│
├── .env.local               # File untuk menyimpan variabel environment lokal (Jangan di-commit ke Git!)
├── AGENTS.md                # Aturan dan instruksi khusus untuk asisten AI (AI coding assistant)
├── CLAUDE.md                # Aturan spesifik untuk Claude AI
├── eslint.config.mjs        # Konfigurasi untuk ESLint (pengecekan error kode)
├── middleware.ts            # Middleware Next.js (Biasa dipakai untuk mengecek sesi login atau redirect)
├── next-env.d.ts            # Deklarasi tipe dasar dari Next.js (Dibuat otomatis, jangan diubah manual)
├── next.config.js           # Konfigurasi utama dari Next.js
├── package-lock.json        # Mengunci versi spesifik dari library/dependensi npm
├── package.json             # Daftar library/dependensi yang digunakan beserta script NPM
├── postcss.config.js        # Konfigurasi PostCSS (Biasa digunakan untuk memproses Tailwind CSS)
├── README.md                # File dokumen ini sendiri
└── tsconfig.json            # Konfigurasi TypeScript untuk proyek ini
```

---

## 🚀 Cara Menjalankan Proyek di Komputer Lokal

1. Pastikan versi Node.js Anda adalah **v26.1.0**. Anda bisa mengeceknya dengan menjalankan perintah:
   ```bash
   node -v
   ```
2. Instal semua dependensi proyek:
   ```bash
   npm install
   ```
3. Jalankan *development server*:
   ```bash
   npm run dev
   ```
4. Buka browser dan akses [http://localhost:3000](http://localhost:3000).

---

## ☁️ Deployment (Vercel)

Cara termudah untuk melakukan *deploy* (mempublikasikan) aplikasi Next.js ini adalah dengan menggunakan [Platform Vercel](https://vercel.com/new). Vercel dibuat oleh pembuat Next.js sendiri sehingga prosesnya sangat mudah.

**Langkah-langkah deployment dasar:**
1. *Push* kode sumber proyek ini ke repository GitHub, GitLab, atau Bitbucket Anda.
2. Buka dashboard Vercel, lalu pilih **"Add New Project"**.
3. Import repository Anda.
4. Vercel secara otomatis akan mendeteksi bahwa ini adalah proyek Next.js.
5. Klik **"Deploy"**. Vercel akan mengurus proses *build* dan aplikasi Anda akan segera *live*!

Untuk panduan lebih lengkap, silakan lihat [Dokumentasi Deployment Next.js](https://nextjs.org/docs/app/building-your-application/deploying).
