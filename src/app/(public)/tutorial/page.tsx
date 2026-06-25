import React from "react";
import { FadeInScroll } from "@/../components/ui/animations/fade-in-scroll";
import { SplitText } from "@/../components/ui/animations/split-text";

export default function Tutorial() {
  return (
     <section className="py-24 md:py-36 bg-slate-50 dark:bg-slate-950" id="tutorial">
      <div className="max-w-[1280px] w-full mx-auto px-4 md:px-8 lg:px-16 space-y-20">

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-xs font-black text-primary uppercase tracking-widest">
            Panduan Pengguna
          </h2>
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
            <SplitText text="Semua yang kamu butuhkan sebelum mulai perjalanan" className="justify-center" />
          </h3>
          <FadeInScroll delay={0.4}>
            <p className="text-slate-500 text-sm leading-relaxed">
              Dari booking sampai pembayaran, semuanya dibuat simpel tanpa ribet.
            </p>
          </FadeInScroll>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LANGKAH BOOKING */}
          <FadeInScroll delay={0.2} direction="up" className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 space-y-6">
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">
              Langkah Booking
            </h4>

            <ol className="space-y-4 text-sm text-slate-500">
              <li className="flex gap-3">
                <span className="font-bold text-primary">1.</span>
                Pilih kendaraan sesuai kebutuhan perjalanan kamu.
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary">2.</span>
                Tentukan tanggal, durasi, dan lokasi penjemputan.
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary">3.</span>
                Isi data diri dan konfirmasi pesanan.
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary">4.</span>
                Lakukan pembayaran untuk mengamankan booking kamu.
              </li>
            </ol>
          </FadeInScroll>

          {/* DOKUMEN */}
          <FadeInScroll delay={0.4} direction="up" className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 space-y-6">
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">
              Dokumen yang Diperlukan
            </h4>

            <ul className="space-y-3 text-sm text-slate-500">
              <li>• KTP / Identitas resmi</li>
              <li>• SIM A atau SIM C (sesuai jenis kendaraan)</li>
              <li>• Deposit jaminan (opsional sesuai kendaraan)</li>
              <li>• Nomor kontak aktif untuk verifikasi</li>
            </ul>
          </FadeInScroll>

          {/* PEMBAYARAN */}
          <FadeInScroll delay={0.6} direction="up" className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 space-y-6">
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">
              Cara Pembayaran
            </h4>

            <div className="space-y-4 text-sm text-slate-500">
              <p>
                Pembayaran bisa dilakukan melalui transfer bank, e-wallet, atau QRIS.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  Transfer Bank
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  QRIS
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  E-Wallet
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  Cash (tertentu)
                </div>
              </div>
            </div>
          </FadeInScroll>

          {/* FAQ */}
          <FadeInScroll delay={0.8} direction="up" className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 space-y-6">
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">
              FAQ
            </h4>

            <div className="space-y-4 text-sm text-slate-500">
              <details className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                <summary className="cursor-pointer font-semibold text-slate-900 dark:text-white">
                  Apakah bisa cancel booking?
                </summary>
                <p className="mt-2">
                  Bisa, dengan ketentuan waktu tertentu sebelum jadwal pemakaian.
                </p>
              </details>

              <details className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                <summary className="cursor-pointer font-semibold text-slate-900 dark:text-white">
                  Apakah bisa lepas kunci?
                </summary>
                <p className="mt-2">
                  Bisa, selama memenuhi syarat dokumen dan verifikasi.
                </p>
              </details>

              <details className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                <summary className="cursor-pointer font-semibold text-slate-900 dark:text-white">
                  Apakah tersedia driver?
                </summary>
                <p className="mt-2">
                  Ya, kami menyediakan driver profesional sesuai permintaan.
                </p>
              </details>
            </div>
          </FadeInScroll>

        </div>
      </div>
    </section>
  );
}