import React from "react";
import { FadeInScroll } from "@/../components/ui/animations/fade-in-scroll";
import { SplitText } from "@/../components/ui/animations/split-text";

export default function About() {
  return (
    <section className="py-24 md:py-36 bg-white dark:bg-slate-900" id="about">
      <div className="max-w-[1280px] w-full mx-auto px-4 md:px-8 lg:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* LEFT: STORY */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xs font-black text-primary uppercase tracking-widest">
              Tentang Kami
            </h2>

            <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
              <SplitText text="Bukan sekadar sewa kendaraan, tapi pengalaman perjalanan yang lebih tenang" />
            </h3>

            <FadeInScroll delay={0.4}>
              <p className="text-slate-500 text-sm leading-relaxed">
                ArmadaKita dibangun untuk bikin perjalanan kamu nggak ribet. Dari kendaraan yang selalu siap jalan sampai layanan yang responsif, semuanya dirancang biar kamu tinggal duduk, nyalain mesin, dan fokus ke tujuan.
              </p>
            </FadeInScroll>

            {/* highlight box */}
            <FadeInScroll delay={0.6} direction="up" className="p-6 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-start gap-4 hover:scale-[1.02] transition">
              <span className="material-symbols-outlined text-primary text-3xl bg-blue-500/10 p-3 rounded-2xl">
                workspace_premium
              </span>

              <div>
                <h4 className="font-bold text-slate-950 dark:text-white text-sm mb-1">
                  Standar Premium Tanpa Kompromi
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Semua unit, semua layanan, dan semua proses kami jaga biar tetap konsisten di level tertinggi.
                </p>
              </div>
            </FadeInScroll>
          </div>

          {/* RIGHT: CARDS */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">

            {[
              {
                icon: "health_and_safety",
                title: "Armada Selalu Siap Jalan",
                desc: "Pemeriksaan rutin, kebersihan maksimal, dan kondisi mesin yang selalu optimal sebelum diserahkan ke kamu.",
                color: "text-primary"
              },
              {
                icon: "sell",
                title: "Harga Jelas dari Awal",
                desc: "Nggak ada biaya tersembunyi. Semua detail transparan biar kamu bisa ambil keputusan tanpa ragu.",
                color: "text-accent"
              },
              {
                icon: "support_agent",
                title: "Respons Cepat 24/7",
                desc: "Masalah di jalan bukan drama. Tim kami standby setiap saat buat bantu kamu kapan pun dibutuhkan.",
                color: "text-emerald-500"
              },
              {
                icon: "vpn_key",
                title: "Fleksibel: Lepas Kunci / Driver",
                desc: "Kamu bebas pilih: nyetir sendiri atau santai dengan driver profesional yang udah paham rute.",
                color: "text-purple-500"
              }
            ].map((item, i) => (
              <FadeInScroll
                key={i}
                delay={0.2 + (i % 4) * 0.1}
                direction="up"
              >
                <div className="group h-full bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-8 hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <span className={`material-symbols-outlined ${item.color} text-4xl mb-6 group-hover:scale-110 transition`}>
                    {item.icon}
                  </span>

                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h4>

                  <p className="text-slate-500 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </FadeInScroll>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}