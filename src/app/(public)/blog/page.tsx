import React from "react";
import Link from "next/link";
import { BLOGS_DATABASE } from "@/data/blogs";
import { FadeInScroll } from "@/../components/ui/animations/fade-in-scroll";
import { SplitText } from "@/../components/ui/animations/split-text";

export default function Blog() {
  const posts = BLOGS_DATABASE.slice(0, 4);

  return (
    <section
      className="py-24 md:py-36 bg-white dark:bg-slate-900"
      id="blog"
    >
      <div className="max-w-[1280px] w-full mx-auto px-4 md:px-8 lg:px-16 space-y-16">
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-xs font-black text-primary uppercase tracking-widest">
            Blog & Insight
          </h2>

          <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
            <SplitText text="Cerita, tips, dan insight sebelum kamu jalan" className="justify-center" />
          </h3>

          <FadeInScroll delay={0.4}>
            <p className="text-slate-500 text-sm leading-relaxed">
              Biar kamu gak cuma sewa, tapi juga paham cara ambil keputusan yang
              tepat.
            </p>
          </FadeInScroll>
        </div>

        {/* GRID BLOG */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {posts.map((post, index) => (
            <FadeInScroll key={post.id} delay={0.2 + (index % 4) * 0.1}>
              <Link
                href={`/blog/${post.slug}`}
                className="group bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block h-full"
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

                {/* DESCRIPTION */}
                <p className="text-xs text-slate-500 leading-relaxed">
                  {post.description}
                </p>

                {/* READ MORE */}
                <div className="mt-6 text-xs font-semibold text-primary opacity-80 group-hover:opacity-100 transition">
                  Baca selengkapnya →
                </div>
              </div>
              </Link>
            </FadeInScroll>
          ))}
        </div>
      </div>
    </section>
  );
}