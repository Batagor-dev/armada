import React from "react";

export default function Blog() {
 const posts = [
  {
    title: "Tips Memilih Mobil Rental yang Tepat untuk Perjalanan Jauh",
    desc: "Biar perjalanan kamu aman dan nyaman, ini hal-hal yang wajib kamu perhatiin sebelum sewa mobil.",
    tag: "Tips",
    date: "12 Jun 2026",
    img: "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=600&h=400&q=80", // Tema: Mobil & Perjalanan jauh (Roadtrip)
  },
  {
    title: "Kenapa Rental Mobil Lepas Kunci Lebih Fleksibel?",
    desc: "Bebas atur waktu, rute, dan privasi. Tapi tetap ada hal penting yang harus kamu tahu.",
    tag: "Insight",
    date: "10 Jun 2026",
    img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=600&h=400&q=80", // Tema: Kunci mobil / Menyetir sendiri
  },
  {
    title: "Perbedaan Sewa Harian vs Mingguan, Mana Lebih Hemat?",
    desc: "Jangan salah pilih paket. Kadang lebih lama justru lebih murah.",
    tag: "Panduan",
    date: "8 Jun 2026",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&h=400&q=80", // Tema: Perencanaan / Pilihan mobil
  },
  {
    title: "Cara Aman Sewa Mobil untuk Pemula",
    desc: "Buat kamu yang baru pertama kali, ini checklist biar gak kena masalah di jalan.",
    tag: "Guide",
    date: "5 Jun 2026",
    img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&h=400&q=80", // Tema: Keselamatan berkendara / Driver pemula
  },
];

  return (
    <section className="py-24 md:py-36 bg-white dark:bg-slate-900" id="blog">
      <div className="max-w-[1280px] w-full mx-auto px-4 md:px-8 lg:px-16 space-y-16">

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-xs font-black text-primary uppercase tracking-widest">
            Blog & Insight
          </h2>
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
            Cerita, tips, dan insight sebelum kamu jalan
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Biar kamu gak cuma sewa, tapi juga paham cara ambil keputusan yang tepat.
          </p>
        </div>

        {/* GRID BLOG */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {posts.map((post, i) => (
            <article
              key={i}
              className="group bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* IMAGE */}
              <div className="h-40 overflow-hidden">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="p-6">
                {/* TAG + DATE */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-primary/10 text-primary">
                    {post.tag}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {post.date}
                  </span>
                </div>

                {/* TITLE */}
                <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug mb-2 group-hover:text-primary transition">
                  {post.title}
                </h4>

                {/* DESC */}
                <p className="text-xs text-slate-500 leading-relaxed">
                  {post.desc}
                </p>

                {/* READ MORE */}
                <div className="mt-6 text-xs font-semibold text-primary opacity-80 group-hover:opacity-100 transition">
                  Baca selengkapnya →
                </div>
              </div>
            </article>
          ))}

        </div>
      </div>
    </section>
  );
}