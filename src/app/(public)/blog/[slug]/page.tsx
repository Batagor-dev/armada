import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOGS_DATABASE, getBlogBySlug } from "@/data/blogs";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return BLOGS_DATABASE.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;

  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="bg-white dark:bg-slate-900 min-h-screen">
      {/* HERO */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-primary font-semibold mb-10 hover:opacity-75 transition-opacity"
          >
            ← Kembali ke Blog
          </Link>

          <span className="inline-flex px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase">
            {blog.tag}
          </span>

          <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.15] tracking-tight">
            {blog.title}
          </h1>

          <p className="mt-5 text-base md:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
            {blog.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-400">
            <span className="font-medium text-slate-600 dark:text-slate-300">{blog.author}</span>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <span>{blog.authorRole}</span>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <span>{blog.date}</span>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <span>{blog.readTime}</span>
          </div>
        </div>
      </section>

      {/* COVER */}
      <section>
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <div className="overflow-hidden rounded-2xl md:rounded-3xl shadow-md">
            <img
              src={blog.img}
              alt={blog.title}
              className="w-full h-[220px] sm:h-[340px] md:h-[480px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-14 md:py-20">
        <div className="max-w-2xl mx-auto px-5 md:px-8">
          <article className="space-y-10">
            {blog.content.map((section, index) => (
              <div key={index}>
                {section.heading && (
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3 leading-snug">
                    {section.heading}
                  </h2>
                )}
                <p className="text-slate-600 dark:text-slate-300 leading-[1.85] text-base md:text-[17px]">
                  {section.body}
                </p>
              </div>
            ))}
          </article>
        </div>
      </section>

      {/* RELATED POSTS */}
      {blog.relatedIds && blog.relatedIds.length > 0 && (
        <section className="pb-20 md:pb-28">
          <div className="max-w-5xl mx-auto px-5 md:px-8">
            <div className="border-t border-slate-100 dark:border-slate-800 pt-12 mb-10">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
                Artikel Terkait
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {BLOGS_DATABASE.filter((item) =>
                blog.relatedIds?.includes(item.id)
              ).map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="overflow-hidden">
                    <img
                      src={related.img}
                      alt={related.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5">
                    <span className="text-[11px] font-bold text-primary uppercase tracking-wide">
                      {related.tag}
                    </span>

                    <h3 className="mt-2.5 font-bold text-slate-900 dark:text-white leading-snug text-[15px]">
                      {related.title}
                    </h3>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {related.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}