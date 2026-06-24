import React from "react";

export const metadata = {
  title: "Auth - ArmadaKita",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-[0.9fr_1.1fr]">

      {/* Left Side */}
      <div
        className="relative hidden lg:block"
        style={{
          backgroundImage:
            "url('/assets/images/banner/AuthBanner.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/40 to-slate-900/10" />

        {/* Logo */}
        <div className="absolute left-8 top-8 z-10">
          <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
            <a href="/" className="text-sm font-semibold tracking-wide text-white">
              ARMADAKITA
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-16 left-12 z-10 max-w-xl text-white">
          <h1 className="text-5xl font-black leading-tight">
            Rental Mobil
            <br />
            Premium &
            <br />
            Terpercaya
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-white/80">
            Temukan kendaraan terbaik untuk perjalanan bisnis,
            liburan keluarga, hingga kebutuhan operasional perusahaan.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="bg-white lg:rounded-l-[40px]">
        <div className="mx-auto w-full max-w-2xl px-8 py-12">
          {children}
        </div>
      </div>

    </div>
  );
}