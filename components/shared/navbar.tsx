"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active link detection
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
    { name: "Home", href: "#home", id: "home" },
    { name: "Daftar Armada", href: "#fleet", id: "fleet" },
    { name: "Tentang Kami", href: "/about", id: "about" },
    { name: "Cara Sewa", href: "#tutorial", id: "tutorial" },
    { name: "Blog", href: "#blog", id: "blog" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${
        scrolled
          ? "py-3 bg-background/90 backdrop-blur-xl border-slate-200/50 shadow-md"
          : "py-5 bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-16 flex items-center justify-between">
        <a
          href="#home"
          className="font-sans text-2xl font-black text-primary tracking-tight cursor-pointer active:scale-95 transition-transform flex items-center gap-1"
        >
          Armada<span className="text-secondary">Kita</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold transition-all duration-200 hover:text-primary relative py-1 ${
                activeSection === item.id
                  ? "text-primary"
                  : "text-slate-600 hover:text-primary"
              }`}
            >
              {item.name}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-fade-in" />
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-slate-600 hover:text-primary transition-colors cursor-pointer text-sm font-semibold">
            Masuk
          </button>
          <a
            href="#fleet"
            className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all duration-300 active:scale-95 shadow-md shadow-blue-500/10"
          >
            Sewa Sekarang
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-primary transition-colors flex items-center justify-center"
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full bg-background/95 backdrop-blur-xl border-b border-slate-200 px-4 py-6 flex flex-col gap-4 shadow-lg animate-fade-in">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`font-semibold text-lg ${
                activeSection === item.id ? "text-primary" : "text-slate-600"
              }`}
            >
              {item.name}
            </a>
          ))}
          <hr className="border-slate-200/60 my-2" />
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center text-slate-600 hover:text-primary transition-colors py-2 font-semibold"
            >
              Masuk
            </button>
            <a
              href="#fleet"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-primary text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
            >
              Sewa Sekarang
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
