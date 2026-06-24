"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log({
      email,
      password,
    });
  }

  return (
    <div className="w-full max-w-2xl">

      {/* Top */}
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Selamat Datang Kembali
          </h1>

          <p className="mt-2 text-slate-500">
            Masuk untuk melanjutkan ke ArmadaKita
          </p>
        </div>

        <Link
          href="/register"
          className="hidden rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium transition hover:bg-slate-50 sm:block"
        >
          Buat Akun
        </Link>
      </div>

      {/* Google Login */}
      <button
        type="button"
        className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white font-medium text-slate-700 transition hover:border-primary/20 hover:bg-slate-50"
      >
        <img
          src="https://www.google.com/favicon.ico"
          alt="Google"
          className="h-5 w-5"
        />

        Lanjutkan dengan Google
      </button>

      {/* Divider */}
      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-200" />

        <span className="text-xs uppercase tracking-wider text-slate-400">
          atau
        </span>

        <div className="h-px flex-1 bg-slate-200" />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Email
          </label>

          <input
            type="email"
            placeholder="nama@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
              h-14
              w-full
              rounded-2xl
              border
              border-slate-200
              px-4
              outline-none
              transition
              focus:border-primary
              focus:ring-4
              focus:ring-primary/10
            "
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Password
          </label>

          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="
              h-14
              w-full
              rounded-2xl
              border
              border-slate-200
              px-4
              outline-none
              transition
              focus:border-primary
              focus:ring-4
              focus:ring-primary/10
            "
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-3 text-sm text-slate-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300"
            />

            Ingat Saya
          </label>

          <Link
            href="/forgot-password"
            className="text-sm font-medium text-primary hover:underline"
          >
            Lupa Password?
          </Link>
        </div>

        <button
          type="submit"
          className="
            h-14
            w-full
            rounded-2xl
            bg-gradient-to-r
            from-primary
            to-[#2A4F7A]
            font-semibold
            text-white
            shadow-lg
            transition
            hover:scale-[1.01]
            hover:shadow-xl
          "
        >
          Masuk
        </button>
      </form>

      {/* Bottom */}
      <div className="mt-8 text-center text-sm text-slate-500 sm:hidden">
        Belum punya akun?

        <Link
          href="/register"
          className="ml-1 font-semibold text-primary"
        >
          Daftar Sekarang
        </Link>
      </div>

      <p className="mt-10 text-center text-xs text-slate-400">
        Dengan masuk, Anda menyetujui syarat & ketentuan ArmadaKita.
      </p>

    </div>
  );
}