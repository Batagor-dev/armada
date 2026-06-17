import React from "react";

export default function About() {
  return (
    <section className="py-24 md:py-36 bg-white dark:bg-slate-900" id="about">
      <div className="max-w-[1280px] w-full mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Header Content */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xs font-black text-primary uppercase tracking-widest">Kenapa Memilih Kami</h2>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
              Mengutamakan Kenyamanan dan Keselamatan Perjalanan Anda
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              ArmadaKita hadir sebagai solusi andalan sewa kendaraan Anda. Kami memiliki standar operasional ketat untuk memastikan Anda selalu berkendara dengan rasa aman, nyaman, dan puas.
            </p>
            <div className="p-6 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-start gap-4">
              <span className="material-symbols-outlined text-primary text-3xl bg-blue-500/10 p-3 rounded-2xl">workspace_premium</span>
              <div>
                <h4 className="font-bold text-slate-950 dark:text-white text-sm mb-1">Jaminan Layanan Premium</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Setiap pemesanan dikawal oleh tim customer service profesional untuk membantu kebutuhan perjalanan Anda secara lancar.
                </p>
              </div>
            </div>
          </div>

          {/* Benefit Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-8 hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <span className="material-symbols-outlined text-primary text-4xl mb-6">health_and_safety</span>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Armada Selalu Prima</h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                Semua kendaraan menjalani pemeriksaan teknis rutin lengkap di bengkel resmi serta pembersihan interior &amp; eksterior mendalam sebelum diserahkan kepada Anda.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-8 hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <span className="material-symbols-outlined text-accent text-4xl mb-6">sell</span>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Harga Jujur &amp; Transparan</h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                Tidak ada biaya siluman. Seluruh detail harga sewa per hari, opsi asuransi, maupun biaya supir tertera dengan sangat transparan di awal transaksi.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-8 hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <span className="material-symbols-outlined text-emerald-500 text-4xl mb-6">support_agent</span>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Layanan Darurat 24 Jam</h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                Jika terjadi kendala teknis atau kecelakaan di jalan raya, tim tanggap darurat kami siap dikirim ke lokasi Anda kapan saja, 24 jam sehari, 7 hari seminggu.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-8 hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <span className="material-symbols-outlined text-purple-500 text-4xl mb-6">vpn_key</span>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Supir &amp; Lepas Kunci</h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                Nikmati kebebasan menyetir sendiri dengan layanan lepas kunci, atau sewa bersama supir profesional kami yang ramah, berpengalaman, dan menguasai rute kota.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
