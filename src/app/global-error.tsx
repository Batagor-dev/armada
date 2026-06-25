"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(217,183,122,0.18),transparent_34%),linear-gradient(135deg,#f8f5f0_0%,#ffffff_64%,#f8f5f0_100%)] text-slate-950 dark:bg-[radial-gradient(circle_at_top_left,rgba(180,143,90,0.2),transparent_34%),linear-gradient(135deg,#030712_0%,#0f172a_70%,#111827_100%)] dark:text-white">
        <div className="flex min-h-screen items-center justify-center px-4 py-16">
          <div className="w-full max-w-4xl overflow-hidden rounded-4xl border border-slate-200/70 bg-white/80 p-8 shadow-[0_24px_80px_rgba(30,58,95,0.16)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/80 sm:p-10 lg:grid lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-10">
            <div className="text-center lg:text-left">
              <p className="text-sm font-black uppercase tracking-[0.35em] text-red-500">Error • Sistem</p>
              <h1 className="mt-4 text-4xl font-black leading-tight text-slate-900 dark:text-white sm:text-5xl">
                Ada yang tidak beres
                <span className="block premium-gradient-text">saat halaman sedang dimuat</span>
              </h1>
              <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
                Mohon maaf, halaman ini sedang mengalami gangguan. Silakan coba lagi atau kembali ke beranda untuk melanjutkan.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <button
                  onClick={() => reset()}
                  className="rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
                >
                  Coba Lagi
                </button>
                <Link
                  href="/"
                  className="rounded-2xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-200"
                >
                  Kembali ke Beranda
                </Link>
              </div>
            </div>

            <div className="mt-8 lg:mt-0">
              <div className="relative mx-auto max-w-sm rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-inner dark:border-slate-800 dark:bg-slate-950/70">
                <div className="absolute inset-4 rounded-[1.25rem] border border-dashed border-amber-300/60 dark:border-amber-500/20" />
                <div className="relative">
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                    Status
                  </p>
                  <div className="mt-4 text-6xl font-black text-primary dark:text-accent">500</div>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    Tim kami sedang memeriksa masalah ini agar pengalaman booking Anda tetap lancar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
