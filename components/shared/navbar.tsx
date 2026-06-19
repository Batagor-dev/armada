"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Navbar() {

  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["home", "fleet", "about", "tutorial", "blog"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", href: "/",},
    { name: "Daftar Kendaraan", href: "/vehicles", },
    { name: "Tentang Kami", href: "/about"  },
    { name: "Panduan", href: "/tutorial" },
    { name: "Berita", href: "/blog"},
  ];

  /* Bottom Nav items for mobile - limited to 4 for best UX */
  const bottomNavItems = [
    { name: "Home", href: "/", icon: "home" },
    { name: "Armada", href: "/vehicles", icon: "directions_car" },
    { name: "Booking", href: "/tutorial", icon: "event_available" },
    { name: "Ulasan", href: "/blog", id: "blog", icon: "forum" },
  ];

  return (
    <>
      {/* ===== TOP NAVBAR (Desktop + Mobile Header) ===== */}
      <nav
        className={`fixed top-0 w-full z-40 border-b transition-all duration-500 ${
          scrolled
            ? "py-3 bg-white/90 dark:bg-[#030712]/90 backdrop-blur-2xl border-slate-200/50 dark:border-slate-800/50 shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
            : "py-5 bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-2xl font-extrabold tracking-tight cursor-pointer active:scale-95 transition-transform flex items-center gap-0.5"
          >
            <span className="text-primary dark:text-white">Armada</span>
            <span className="premium-gradient-text">Kita</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-semibold transition-all duration-200 px-4 py-2 rounded-xl ${
                    pathname === item.href
                      ? "text-primary dark:text-accent bg-primary/5 dark:bg-accent/5"
                      : "text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-accent hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:block text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-accent transition-colors cursor-pointer text-sm font-semibold px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50">
              Masuk
            </button>
            <a
              href="#fleet"
              className="bg-gradient-to-r from-primary to-[#2A4F7A] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 active:scale-95"
            >
              Sewa Sekarang
            </a>

            {/* Mobile hamburger (shown on md but hidden when bottom nav exists on mobile) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors flex items-center justify-center rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 tap-highlight"
              aria-label="Toggle Menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown (Hamburger Panel) */}
        {mobileMenuOpen && (
          <div className="md:hidden w-full bg-white/95 dark:bg-[#030712]/95 backdrop-blur-2xl border-b border-slate-200 dark:border-slate-800 px-4 py-6 flex flex-col gap-2 shadow-lg animate-fade-in">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`font-semibold text-base px-4 py-3 rounded-xl transition-all tap-highlight ${
                  pathname === item.href
                    ? "text-primary dark:text-accent bg-primary/5 dark:bg-accent/10"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                }`}
              >
                {item.name}
              </a>
            ))}
            <hr className="border-slate-200/60 dark:border-slate-800 my-2" />
            <div className="flex flex-col gap-3 px-4">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center text-slate-600 dark:text-slate-300 hover:text-primary transition-colors py-2.5 font-semibold rounded-xl"
              >
                Masuk
              </button>
              <a
                href="#fleet"
                className="w-full text-center bg-gradient-to-r from-primary to-[#2A4F7A] text-white py-3 rounded-xl font-bold transition-all active:scale-95"
              >
                Sewa Sekarang
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
