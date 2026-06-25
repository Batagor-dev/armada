import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(217,183,122,0.18),_transparent_32%),linear-gradient(135deg,_#f8f5f0_0%,_#ffffff_60%,_#f8f5f0_100%)] px-4 py-16 dark:bg-[radial-gradient(circle_at_top_left,_rgba(180,143,90,0.2),_transparent_32%),linear-gradient(135deg,_#030712_0%,_#0f172a_70%,_#111827_100%)]">
      <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.35)_50%,transparent_100%)] opacity-40" />
      <div className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white/80 p-8 shadow-[0_24px_80px_rgba(30,58,95,0.16)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/80 sm:p-10 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10 lg:p-12">
        <div className="text-center lg:text-left">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-primary dark:text-accent">
            404 • Halaman Hilang
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-slate-900 dark:text-white sm:text-5xl">
            Sepertinya rute ini
            <span className="block premium-gradient-text">terlewat dari peta</span>
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
            Halaman yang Anda cari tidak tersedia, sudah dipindah, atau mungkin salah ketik alamatnya.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link
              href="/"
              className="rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
            >
              Kembali ke Beranda
            </Link>
            <Link
              href="/vehicles"
              className="rounded-2xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-200"
            >
              Jelajahi Armada
            </Link>
          </div>
        </div>

        <div className="mt-8 lg:mt-0">
          <div className="relative mx-auto flex max-w-sm items-center justify-center">
            <div className="absolute inset-6 rounded-full bg-[radial-gradient(circle,_rgba(217,183,122,0.35),_transparent_70%)] blur-3xl" />
            <div className="relative w-full rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.12)] dark:border-slate-800 dark:bg-slate-950/80">
              <div className="rounded-[1.5rem] border border-amber-200/70 bg-[linear-gradient(135deg,_rgba(217,183,122,0.2),_rgba(30,58,95,0.08))] p-5 text-left dark:border-amber-500/20">
                <p className="text-xs font-black uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                  Butuh bantuan?
                </p>
                <h2 className="mt-3 text-2xl font-black text-slate-900 dark:text-white">
                  Kami siap bantu lanjutkan perjalanan Anda
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Kembali ke beranda atau pilih armada favorit Anda untuk melanjutkan booking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
