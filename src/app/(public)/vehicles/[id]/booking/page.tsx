import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getVehicleById } from "@/data/vehicles";
import BookingFormSection from "@/../components/sections/booking-form";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */
type Props = {
  params: Promise<{ id: string }>;
};

/* ------------------------------------------------------------------ */
/*  Dynamic SEO metadata                                                */
/* ------------------------------------------------------------------ */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const vehicle = getVehicleById(Number(id));

  if (!vehicle) {
    return { title: "Kendaraan Tidak Ditemukan — ArmadaKita" };
  }

  return {
    title: `Pesan ${vehicle.name} — ArmadaKita`,
    description: `Isi formulir pemesanan untuk menyewa ${vehicle.name}. Konfirmasi cepat via WhatsApp, armada premium terpercaya.`,
    keywords: [
      "sewa mobil",
      "booking kendaraan",
      vehicle.name,
      "rental mobil",
      "ArmadaKita",
    ],
    openGraph: {
      title: `Pesan ${vehicle.name} — ArmadaKita`,
      description: `Isi formulir pemesanan untuk menyewa ${vehicle.name}. Konfirmasi cepat via WhatsApp.`,
      type: "website",
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */
export default async function BookingPage({ params }: Props) {
  const { id } = await params;
  const vehicle = getVehicleById(Number(id));

  if (!vehicle) notFound();

  const vehicleImage = Array.isArray(vehicle.img) ? vehicle.img[0] : vehicle.img;

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="min-h-screen bg-[#F8F5F0] dark:bg-[#030712]">

      {/* ============================================================
          HERO STRIP
      ============================================================ */}
      <section
        aria-label="Header pemesanan"
        className="relative overflow-hidden pt-28 pb-16 px-4 md:px-8 lg:px-16"
        >
        {/* Background Image */}
        <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
            backgroundImage: `url('/assets/images/banner/AuthBanner.jpeg')`,
            }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Gold Accent Glow */}
        <div className="absolute -top-24 right-1/3 w-96 h-96 rounded-full bg-[#B48F5A]/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-[1280px] mx-auto">
          {/* Breadcrumb / back navigation */}
          <nav aria-label="Navigasi balik" className="mb-8">
            <Link
              href={`/vehicles/${id}`}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-lg transition-transform duration-200 group-hover:-translate-x-1">
                arrow_back
              </span>
              Kembali ke Detail Kendaraan
            </Link>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <span className="inline-block mb-3 text-[11px] font-bold tracking-widest uppercase text-[#D9B77A] border border-[#D9B77A]/30 px-3 py-1 rounded-full">
                Formulir Pemesanan
              </span>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
                Pesan{" "}
                <span className="premium-gradient-text">{vehicle.name}</span>
              </h1>
              <p className="mt-2 text-white/60 text-sm max-w-lg">
                Isi formulir di bawah ini. Setelah dikirim, tim kami akan menghubungi
                Anda melalui WhatsApp untuk konfirmasi.
              </p>
            </div>

            {/* Price badge */}
            <div className="text-right">
                <span className="inline-block mb-3 text-[11px] font-bold tracking-widest uppercase text-[#D9B77A] border border-[#D9B77A]/30 px-3 py-1 rounded-full">
                    Harga Sewa
                </span>

                <h2 className="text-4xl md:text-5xl font-black leading-none">
                    <span className="premium-gradient-text">
                    {formatRupiah(vehicle.daily_price)}
                    </span>
                </h2>

                <p className="mt-2 text-white/60 text-sm">
                    Mulai dari / hari
                </p>
                </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          MAIN CONTENT
      ============================================================ */}
      <section
        aria-label="Konten utama pemesanan"
        className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-16 py-10"
      >
        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">

          {/* =================== FORM CARD =================== */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6 md:p-8 shadow-[var(--shadow-card)] animate-fade-in-up">

            <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Data Penyewa
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Pastikan semua data yang Anda isi sudah benar.
              </p>
            </div>

            <BookingFormSection
              vehicleName={vehicle.name}
              vehicleId={vehicle.id}
              dailyPrice={vehicle.daily_price}
            />
          </div>

          {/* =================== SIDEBAR =================== */}
          <aside aria-label="Ringkasan kendaraan" className="space-y-5 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>

            {/* Vehicle summary card */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] overflow-hidden shadow-[var(--shadow-card)]">
              {/* Image */}
              <div className="relative h-44 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <img
                  src={vehicleImage}
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-3 left-3 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                  Tersedia
                </span>
              </div>

              {/* Info */}
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{vehicle.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    {vehicle.model} · {vehicle.year}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: "settings", label: "Transmisi", value: vehicle.transmission },
                    { icon: "airline_seat_recline_normal", label: "Kapasitas", value: `${vehicle.seats} Orang` },
                    { icon: "local_gas_station", label: "BBM", value: vehicle.fuel },
                    { icon: "speed", label: "KM", value: vehicle.mileage.toLocaleString("id-ID") },
                  ].map((spec) => (
                    <div
                      key={spec.label}
                      className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3"
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#1E3A5F] dark:text-[#B48F5A]">
                        {spec.icon}
                      </span>
                      <p className="mt-1 text-[10px] text-slate-400 uppercase tracking-wide">{spec.label}</p>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-0.5 truncate">{spec.value}</p>
                    </div>
                  ))}
                </div>

                {/* Price row */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide">Harga / Hari</p>
                    <p className="text-xl font-black text-[#1E3A5F] dark:text-white mt-0.5">
                      {formatRupiah(vehicle.daily_price)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== Dokumen yang Harus Dibawa ===== */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-5 shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[16px] text-amber-500">folder_open</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Dokumen yang Harus Dibawa</h4>
              </div>
              <ul className="space-y-2">
                {[
                  { icon: "badge", text: "KTP / SIM A yang masih berlaku" },
                  { icon: "credit_card", text: "Kartu keluarga (KK) asli" },
                  { icon: "phone_android", text: "Nomor WhatsApp aktif" },
                  { icon: "payments", text: "DP / uang muka sesuai kesepakatan" },
                  { icon: "description", text: "Surat keterangan domisili (jika perlu)" },
                ].map((doc) => (
                  <li key={doc.text} className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[15px] text-[#1E3A5F] dark:text-[#B48F5A] mt-0.5 flex-shrink-0">{doc.icon}</span>
                    <span className="text-sm text-slate-600 dark:text-slate-300 leading-snug">{doc.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ===== Syarat & Aturan Sewa ===== */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-5 shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[16px] text-red-500">gavel</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Syarat &amp; Aturan Sewa</h4>
              </div>
              <ul className="space-y-2">
                {[
                  { icon: "check_circle", text: "Usia penyewa minimal 21 tahun", ok: true },
                  { icon: "check_circle", text: "SIM A aktif wajib dimiliki penyewa", ok: true },
                  { icon: "check_circle", text: "Kendaraan tidak untuk disewakan kembali", ok: true },
                  { icon: "check_circle", text: "Dilarang membawa kendaraan ke luar kota tanpa izin", ok: true },
                  { icon: "cancel", text: "Dilarang merokok di dalam kendaraan", ok: false },
                  { icon: "cancel", text: "Dilarang membawa hewan peliharaan", ok: false },
                  { icon: "cancel", text: "Kerusakan akibat kelalaian ditanggung penyewa", ok: false },
                ].map((rule) => (
                  <li key={rule.text} className="flex items-start gap-2.5">
                    <span
                      className={[
                        "material-symbols-outlined text-[15px] mt-0.5 flex-shrink-0",
                        rule.ok
                          ? "text-emerald-500"
                          : "text-red-400",
                      ].join(" ")}
                    >
                      {rule.icon}
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-300 leading-snug">{rule.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/628123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/25"
              aria-label="Hubungi via WhatsApp"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Tanya via WhatsApp
            </a>
          </aside>
        </div>
      </section>
    </div>
  );
}
