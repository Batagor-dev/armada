"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 border-b border-outline-variant/10 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-background/90 backdrop-blur-xl shadow-lg"
          : "py-5 bg-background/50 backdrop-blur-md"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-16 flex items-center justify-between">
        <a
          href="#"
          className="font-display text-2xl font-bold text-primary tracking-tight cursor-pointer active:scale-95 transition-transform"
        >
          Grand Touring
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#fleet"
            className="text-primary font-semibold border-b-2 border-primary pb-1 text-sm cursor-pointer transition-all"
          >
            Cars
          </a>
          <a
            href="#features"
            className="text-on-surface-variant hover:text-primary transition-colors text-sm cursor-pointer"
          >
            Features
          </a>
          <a
            href="#footer"
            className="text-on-surface-variant hover:text-primary transition-colors text-sm cursor-pointer"
          >
            Contact
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-on-surface-variant hover:text-primary transition-colors cursor-pointer text-sm font-semibold">
            Login
          </button>
          <button className="bg-primary text-on-primary px-6 py-2 rounded-xl text-sm font-bold hover:bg-primary-fixed-dim transition-all duration-300 active:scale-95 shadow-[0_0_15px_rgba(242,202,80,0.15)]">
            Register
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-on-surface hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full bg-background/95 backdrop-blur-xl border-b border-outline-variant/10 px-4 py-6 flex flex-col gap-4">
          <a
            href="#fleet"
            onClick={() => setMobileMenuOpen(false)}
            className="text-primary font-semibold text-lg"
          >
            Cars
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="text-on-surface-variant hover:text-primary transition-colors text-lg"
          >
            Features
          </a>
          <a
            href="#footer"
            onClick={() => setMobileMenuOpen(false)}
            className="text-on-surface-variant hover:text-primary transition-colors text-lg"
          >
            Contact
          </a>
          <hr className="border-outline-variant/10 my-2" />
          <div className="flex flex-col gap-3">
            <button className="w-full text-center text-on-surface-variant hover:text-primary transition-colors py-2 font-semibold">
              Login
            </button>
            <button className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold hover:bg-primary-fixed-dim transition-all">
              Register
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
