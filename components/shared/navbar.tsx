"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Daftar Kendaraan", href: "/vehicles" },
    { name: "Tentang Kami", href: "/about" },
    { name: "Panduan", href: "/tutorial" },
    { name: "Berita", href: "/blog" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${
          scrolled
            ? "py-3 bg-white/90 dark:bg-[#030712]/90 backdrop-blur-2xl border-slate-200/50 dark:border-slate-800/50 shadow-sm"
            : "py-4 bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-16 flex items-center justify-between">

          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-2 font-extrabold tracking-tight"
          >
            <img
              src="/assets/images/logo/logo.png"
              alt="Armada Kita"
              className="h-6 w-6 sm:h-7 sm:w-7 object-contain"
            />

            <span className="text-xl sm:text-2xl">
              <span className="text-primary dark:text-white">Armada</span>
              <span className="premium-gradient-text">Kita</span>
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold px-4 py-2 rounded-xl transition ${
                  pathname === item.href
                    ? "text-primary bg-primary/5 dark:bg-accent/10"
                    : "text-slate-500 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2">

            {/* MASUK (desktop only) */}
            <a href="/login" className="hidden sm:block text-slate-500 hover:text-primary text-sm font-semibold px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition">
              Masuk
            </a>

            {/* SEWA SEKARANG (desktop) */}
            <a
              href="#fleet"
              className="hidden sm:inline-flex bg-gradient-to-r from-primary to-[#2A4F7A] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
            >
              Sewa Sekarang
            </a>

            {/* HAMBURGER */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <span className="material-symbols-outlined text-2xl">
                menu
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE SIDEBAR ================= */}
      <div
        className={`fixed inset-0 z-50 transition ${
          mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* OVERLAY BLUR */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* SIDEBAR */}
        <div
          className={`absolute right-0 top-0 h-full w-[75%] max-w-sm bg-white dark:bg-[#030712] shadow-2xl transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* HEADER */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
            <span className="font-bold text-lg">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* MENU */}
          <div className="flex flex-col p-4 gap-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl font-semibold transition ${
                  pathname === item.href
                    ? "text-primary bg-primary/5 dark:bg-accent/10"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA BOTTOM */}
          <div className="absolute bottom-0 w-full p-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col gap-2">

              <button className="w-full text-center text-slate-600 dark:text-slate-300 hover:text-primary py-2 font-semibold rounded-xl">
                Masuk
              </button>

              <a
                href="#fleet"
                className="w-full text-center bg-gradient-to-r from-primary to-[#2A4F7A] text-white py-3 rounded-xl font-bold"
              >
                Sewa Sekarang
              </a>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}