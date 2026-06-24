"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log({
      fullName,
      email,
      gender,
      password,
      confirmPassword,
    });
  }

  return (
    <div className="w-full max-w-2xl">

      {/* Header */}
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Buat Akun Baru
          </h1>

          <p className="mt-2 text-slate-500">
            Daftar dan mulai menggunakan ArmadaKita
          </p>
        </div>

        <Link
          href="/login"
          className="hidden rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium transition hover:bg-slate-50 sm:block"
        >
         Masuk Akun
        </Link>
      </div>

      {/* Google Register */}
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
    <div className="grid gap-5 md:grid-cols-2">

        {/* Nama */}
        <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
            Nama Lengkap
        </label>

        <input
            type="text"
            placeholder="Nama lengkap"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="h-14 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
        />
        </div>

        {/* Email */}
        <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
            Email
        </label>

        <input
            type="email"
            placeholder="nama@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
        />
        </div>

        {/* Gender */}
        <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
            Gender
        </label>

        <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
        >
            <option value="">Pilih Gender</option>
            <option value="male">Laki-laki</option>
            <option value="female">Perempuan</option>
        </select>
        </div>

        {/* Password */}
        <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
            Password
        </label>

        <input
            type="password"
            placeholder="Minimal 8 karakter"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-14 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
        />
        </div>

    </div>

    {/* Confirm Password */}
    <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
        Konfirmasi Password
        </label>

        <input
        type="password"
        placeholder="Ulangi password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="h-14 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
        />
    </div>

    <button
        type="submit"
        className="h-14 w-full rounded-2xl bg-gradient-to-r from-primary to-[#2A4F7A] font-semibold text-white shadow-lg transition hover:scale-[1.01]"
    >
        Daftar
    </button>
    </form>

      {/* Mobile Link */}
      <div className="mt-8 text-center text-sm text-slate-500 sm:hidden">
        Sudah punya akun?

        <Link
          href="/login"
          className="ml-1 font-semibold text-primary"
        >
          Masuk
        </Link>
      </div>

      <p className="mt-10 text-center text-xs text-slate-400">
        Dengan mendaftar, Anda menyetujui syarat & ketentuan ArmadaKita.
      </p>
    </div>
  );
}