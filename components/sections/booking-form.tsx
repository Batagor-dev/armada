"use client";

import { useState, FormEvent } from "react";
import FormField from "@/../components/ui/form-field";
import Input from "@/../components/ui/input";
import DateInput from "@/../components/ui/date-input";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */
type BookingFormValues = {
  fullName: string;
  whatsapp: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
};

type BookingFormErrors = Partial<Record<keyof BookingFormValues, string>>;

type BookingFormSectionProps = {
  vehicleName?: string;
  vehicleId?: number;
  /** Harga sewa per hari (IDR) untuk kalkulasi estimasi biaya */
  dailyPrice?: number;
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */
function getTodayStr() {
  return new Date().toISOString().split("T")[0];
}

function validate(values: BookingFormValues): BookingFormErrors {
  const errors: BookingFormErrors = {};
  const today = getTodayStr();

  if (!values.fullName.trim()) {
    errors.fullName = "Nama lengkap wajib diisi.";
  } else if (values.fullName.trim().length < 3) {
    errors.fullName = "Nama minimal 3 karakter.";
  }

  if (!values.whatsapp.trim()) {
    errors.whatsapp = "Nomor WhatsApp wajib diisi.";
  } else if (!/^(\+62|62|0)8[0-9]{8,11}$/.test(values.whatsapp.replace(/\s/g, ""))) {
    errors.whatsapp = "Format nomor WhatsApp tidak valid. Contoh: 08123456789";
  }

  if (!values.startDate) {
    errors.startDate = "Tanggal mulai sewa wajib diisi.";
  } else if (values.startDate < today) {
    errors.startDate = "Tanggal mulai tidak boleh di masa lalu.";
  }

  if (!values.endDate) {
    errors.endDate = "Tanggal selesai sewa wajib diisi.";
  } else if (values.endDate <= values.startDate) {
    errors.endDate = "Tanggal selesai harus setelah tanggal mulai.";
  }

  if (!values.pickupLocation.trim()) {
    errors.pickupLocation = "Lokasi penjemputan wajib diisi.";
  }

  return errors;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */
const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export default function BookingFormSection({
  vehicleName = "Kendaraan",
  vehicleId,
  dailyPrice = 0,
}: BookingFormSectionProps) {
  const today = getTodayStr();

  const [values, setValues] = useState<BookingFormValues>({
    fullName: "",
    whatsapp: "",
    startDate: "",
    endDate: "",
    pickupLocation: "",
  });

  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof BookingFormValues, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /* ---------- event helpers ---------- */
  function handleChange(field: keyof BookingFormValues, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    // Re-run full validation so errors for fields that are now correct are cleared
    if (touched[field]) {
      setErrors(validate(next));
    }
  }

  function handleBlur(field: keyof BookingFormValues) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    // Replace full error state so previously-resolved errors are cleared
    setErrors(validate(values));
  }

  /* ---------- rental days ---------- */
  const rentalDays =
    values.startDate && values.endDate && values.endDate > values.startDate
      ? Math.round(
          (new Date(values.endDate).getTime() - new Date(values.startDate).getTime()) /
            86_400_000
        )
      : 0;

  /* ---------- submit ---------- */
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Touch all fields
    const allTouched = Object.fromEntries(
      Object.keys(values).map((k) => [k, true])
    ) as Record<keyof BookingFormValues, boolean>;
    setTouched(allTouched);

    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);

    // Build WhatsApp message
    const totalEstimasi = rentalDays * dailyPrice;
    const msg = [
      `*Permintaan Sewa Kendaraan*`,
      ``,
      `Kendaraan: *${vehicleName}*`,
      `Nama: ${values.fullName}`,
      `WhatsApp: ${values.whatsapp}`,
      `Mulai Sewa: ${new Date(values.startDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`,
      `Selesai Sewa: ${new Date(values.endDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`,
      `Durasi: ${rentalDays} hari`,
      `Lokasi Penjemputan: ${values.pickupLocation}`,
      ...(dailyPrice > 0 ? [`Estimasi Biaya: ${formatRupiah(totalEstimasi)} (${rentalDays} hari × ${formatRupiah(dailyPrice)})`] : []),
    ].join("\n");

    // Simulate a brief loading state then redirect to WhatsApp
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setSubmitted(true);

    setTimeout(() => {
      window.open(
        `https://wa.me/628123456789?text=${encodeURIComponent(msg)}`,
        "_blank"
      );
    }, 400);
  }

  /* ---------------------------------------------------------------- */
  /*  Success screen                                                    */
  /* ---------------------------------------------------------------- */
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-16 text-center animate-fade-in-up">
        {/* Success icon */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-emerald-500">
              check_circle
            </span>
          </div>
          <span className="absolute -right-1 -top-1 w-5 h-5 rounded-full bg-emerald-500 animate-pulse-glow" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Permintaan Terkirim!
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
            Kami akan segera menghubungi Anda melalui WhatsApp untuk konfirmasi
            pemesanan.
          </p>
        </div>

        <button
          onClick={() => {
            setSubmitted(false);
            setValues({ fullName: "", whatsapp: "", startDate: "", endDate: "", pickupLocation: "" });
            setErrors({});
            setTouched({});
          }}
          className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[#1E3A5F] dark:text-[#B48F5A] hover:underline underline-offset-4"
        >
          <span className="material-symbols-outlined text-[18px]">refresh</span>
          Buat Pemesanan Baru
        </button>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  Main form                                                         */
  /* ---------------------------------------------------------------- */
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label={`Form pemesanan ${vehicleName}`}
      className="flex flex-col gap-5"
    >
      {/* ---- Nama Lengkap ---- */}
      <FormField
        label="Nama Lengkap"
        required
        icon="person"
        error={touched.fullName ? errors.fullName : undefined}
        helperText="Sesuai KTP atau identitas yang berlaku."
      >
        {(id) => (
          <Input
            id={id}
            type="text"
            placeholder="Contoh: Budi Santoso"
            autoComplete="name"
            value={values.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            onBlur={() => handleBlur("fullName")}
            hasError={!!(touched.fullName && errors.fullName)}
            aria-required
          />
        )}
      </FormField>

      {/* ---- Nomor WhatsApp ---- */}
      <FormField
        label="Nomor WhatsApp"
        required
        icon="phone"
        error={touched.whatsapp ? errors.whatsapp : undefined}
        helperText="Digunakan untuk konfirmasi via WhatsApp."
      >
        {(id) => (
          <Input
            id={id}
            type="tel"
            placeholder="Contoh: 08123456789"
            autoComplete="tel"
            inputMode="tel"
            value={values.whatsapp}
            onChange={(e) => handleChange("whatsapp", e.target.value)}
            onBlur={() => handleBlur("whatsapp")}
            hasError={!!(touched.whatsapp && errors.whatsapp)}
            aria-required
          />
        )}
      </FormField>

      {/* ---- Tanggal (grid 2 col) ---- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Tanggal Mulai */}
        <FormField
          label="Tanggal Mulai Sewa"
          required
          icon="calendar_today"
          error={touched.startDate ? errors.startDate : undefined}
        >
          {(id) => (
            <DateInput
              id={id}
              min={today}
              value={values.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              onBlur={() => handleBlur("startDate")}
              hasError={!!(touched.startDate && errors.startDate)}
              aria-required
            />
          )}
        </FormField>

        {/* Tanggal Selesai */}
        <FormField
          label="Tanggal Selesai Sewa"
          required
          icon="event_available"
          error={touched.endDate ? errors.endDate : undefined}
        >
          {(id) => (
            <DateInput
              id={id}
              min={values.startDate || today}
              value={values.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
              onBlur={() => handleBlur("endDate")}
              hasError={!!(touched.endDate && errors.endDate)}
              aria-required
            />
          )}
        </FormField>
      </div>

      {/* ---- Kalkulasi Biaya Sewa ---- */}
      {rentalDays > 0 && (
        <div className="rounded-xl border border-[#1E3A5F]/15 dark:border-[#B48F5A]/20 bg-[#1E3A5F]/[0.04] dark:bg-[#B48F5A]/[0.05] overflow-hidden animate-fade-in-up">
          {/* Header strip */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1E3A5F] dark:bg-[#B48F5A]/20">
            <span className="material-symbols-outlined text-[16px] text-white dark:text-[#D9B77A]">calculate</span>
            <span className="text-xs font-bold text-white dark:text-[#D9B77A] uppercase tracking-wider">Estimasi Biaya Sewa</span>
          </div>

          {/* Breakdown */}
          <div className="px-4 py-3 space-y-2">
            {/* Harga per hari */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">Harga / hari</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {dailyPrice > 0 ? formatRupiah(dailyPrice) : "—"}
              </span>
            </div>

            {/* Durasi */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">Durasi sewa</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">{rentalDays} hari</span>
            </div>

            {/* Divider */}
            <div className="border-t border-dashed border-slate-200 dark:border-slate-700 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Total Estimasi</span>
                <span className="text-lg font-black text-[#1E3A5F] dark:text-[#D9B77A]">
                  {dailyPrice > 0 ? formatRupiah(rentalDays * dailyPrice) : `${rentalDays} hari`}
                </span>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="px-4 pb-3 text-[10px] text-slate-400 dark:text-slate-500">
            * Estimasi belum termasuk biaya driver, bensin, dan tol. Harga final dikonfirmasi via WhatsApp.
          </p>
        </div>
      )}

      {/* ---- Lokasi Penjemputan ---- */}
      <FormField
        label="Lokasi Penjemputan"
        required
        icon="location_on"
        error={touched.pickupLocation ? errors.pickupLocation : undefined}
        helperText="Alamat lengkap atau nama tempat yang mudah dijangkau."
      >
        {(id) => (
          <Input
            id={id}
            type="text"
            placeholder="Contoh: Bandara Soekarno-Hatta, Terminal 3"
            autoComplete="street-address"
            value={values.pickupLocation}
            onChange={(e) => handleChange("pickupLocation", e.target.value)}
            onBlur={() => handleBlur("pickupLocation")}
            hasError={!!(touched.pickupLocation && errors.pickupLocation)}
            aria-required
          />
        )}
      </FormField>

      {/* ---- Submit ---- */}
      <button
        type="submit"
        disabled={submitting}
        className={[
          "mt-2 w-full h-12 flex items-center justify-center gap-2",
          "rounded-xl text-sm font-bold text-white",
          "bg-gradient-to-r from-[#1E3A5F] to-[#2A4F7A]",
          "shadow-md transition-all duration-200",
          "hover:shadow-lg hover:shadow-[#1E3A5F]/25 hover:scale-[1.01]",
          "active:scale-[0.98]",
          "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F] focus-visible:ring-offset-2",
        ].join(" ")}
      >
        {submitting ? (
          <>
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Memproses...
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-lg">send</span>
            Kirim Permintaan Sewa
          </>
        )}
      </button>

      <p className="text-center text-xs text-slate-400 dark:text-slate-500">
        Dengan menekan tombol di atas, Anda akan diarahkan ke WhatsApp untuk
        konfirmasi pemesanan.
      </p>
    </form>
  );
}
