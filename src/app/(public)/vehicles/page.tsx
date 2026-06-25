"use client";

import { useMemo, useState } from "react";
import VehicleCard from "../../../../components/shared/vehicle-card";
import { VEHICLES_DATABASE } from "@/data/vehicles";
import { Vehicle } from "@/types/vehicle";
import { FadeInScroll } from "../../../../components/ui/animations/fade-in-scroll";
import { SplitText } from "../../../../components/ui/animations/split-text";

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

const priceLimit = Math.max(...VEHICLES_DATABASE.map((vehicle) => vehicle.daily_price));

export default function VehiclesPage() {
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState("Semua");
  const [selectedTransmission, setSelectedTransmission] = useState("Semua");
  const [selectedSeats, setSelectedSeats] = useState("Semua");
  const [maxPrice, setMaxPrice] = useState(priceLimit);
  const [sortBy, setSortBy] = useState("popular");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const filteredVehicles = useMemo(() => {
    return VEHICLES_DATABASE.filter((vehicle) => {
      const keyword = `${vehicle.name} ${vehicle.model} ${vehicle.type} ${vehicle.transmission}`.toLowerCase();
      const matchesSearch = keyword.includes(query.toLowerCase());
      const matchesType = selectedType === "Semua" || vehicle.type === selectedType;
      const matchesTransmission =
        selectedTransmission === "Semua" || vehicle.transmission === selectedTransmission;
      const matchesSeats = selectedSeats === "Semua" || vehicle.seats >= Number(selectedSeats);
      const matchesPrice = vehicle.daily_price <= maxPrice;

      return matchesSearch && matchesType && matchesTransmission && matchesSeats && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.daily_price - b.daily_price;
      if (sortBy === "price-high") return b.daily_price - a.daily_price;
      return b.year - a.year || a.mileage - b.mileage;
    });
  }, [maxPrice, query, selectedSeats, selectedTransmission, selectedType, sortBy]);

  const resetFilters = () => {
    setQuery("");
    setSelectedType("Semua");
    setSelectedTransmission("Semua");
    setSelectedSeats("Semua");
    setMaxPrice(priceLimit);
    setSortBy("popular");
  };

const sorting = [
  {
    value: "popular",
    label: "Popularitas",
  },
  {
    value: "price-low",
    label: "Harga Termurah",
  },
  {
    value: "price-high",
    label: "Harga Tertinggi",
  },
] as const;

  return (
    <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-16">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-widest text-primary dark:text-accent">
              Daftar Kendaraan
            </p>
            <h1 className="mt-3 text-4xl md:text-6xl font-black font-display leading-tight tracking-tight">
              <SplitText text="Pilih armada yang pas untuk perjalanan Anda" />
            </h1>
            <FadeInScroll delay={0.4}>
              <p className="mt-5 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                Temukan mobil dan motor yang tersedia, bandingkan harga harian, lalu lihat detail
                kendaraan sebelum melakukan pemesanan.
              </p>
            </FadeInScroll>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
            <FadeInScroll direction="right" className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-bold text-lg">Filter</h2>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="min-h-11 px-3 text-sm font-bold text-primary hover:text-secondary dark:text-accent"
                >
                  Reset
                </button>
              </div>

              <div className="mt-5 space-y-5">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Search Kendaraan
                  </span>
                  <div className="mt-2 flex min-h-12 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-primary dark:border-slate-800 dark:bg-slate-950">
                    <span className="material-symbols-outlined text-slate-400">search</span>
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Cari Nissan, Vario, Fortuner..."
                      className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                      type="search"
                    />
                  </div>
                </label>

                <div>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Tipe Kendaraan
                  </span>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {["Semua", "Mobil", "Motor"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSelectedType(type)}
                        className={`min-h-11 rounded-xl border px-3 text-sm font-bold transition ${
                          selectedType === type
                            ? "border-primary bg-primary text-white"
                            : "border-slate-200 bg-white text-slate-600 hover:border-secondary dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Harga Maksimal
                  </span>
                  <input
                    type="range"
                    min={175000}
                    max={priceLimit}
                    step={25000}
                    value={maxPrice}
                    onChange={(event) => setMaxPrice(Number(event.target.value))}
                    className="mt-3 w-full accent-primary"
                  />
                  <div className="mt-2 text-sm font-black text-slate-950 dark:text-white">
                    {formatRupiah(maxPrice)} / hari
                  </div>
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Transmisi
                  </span>
                  <select
                    value={selectedTransmission}
                    onChange={(event) => setSelectedTransmission(event.target.value)}
                    className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold outline-none focus:border-primary dark:border-slate-800 dark:bg-slate-950"
                  >
                    <option>Semua</option>
                    <option>Manual</option>
                    <option>Automatic</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Kapasitas Penumpang
                  </span>
                  <select
                    value={selectedSeats}
                    onChange={(event) => setSelectedSeats(event.target.value)}
                    className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold outline-none focus:border-primary dark:border-slate-800 dark:bg-slate-950"
                  >
                    <option>Semua</option>
                    <option value="2">Minimal 2 kursi</option>
                    <option value="4">Minimal 4 kursi</option>
                    <option value="5">Minimal 5 kursi</option>
                    <option value="7">Minimal 7 kursi</option>
                  </select>
                </label>
              </div>
            </FadeInScroll>

            <div>
              <FadeInScroll delay={0.2} direction="down" className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Menampilkan{" "}
                  <span className="font-black text-slate-950 dark:text-white">
                    {filteredVehicles.length}
                  </span>{" "}
                  kendaraan tersedia
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Urutkan berdasarkan
                  </span>
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                    className="min-h-12 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold outline-none focus:border-primary dark:border-slate-800 dark:bg-slate-950"
                  >
                    {sorting.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </FadeInScroll>

              {filteredVehicles.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredVehicles.map((vehicle, index) => (
                    <FadeInScroll key={vehicle.id} delay={0.2 + (index % 10) * 0.1}>
                      <VehicleCard
                        vehicle={vehicle}
                        formatPrice={formatRupiah}
                        onDetail={setSelectedVehicle}
                        showStatus
                      />
                    </FadeInScroll>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center dark:border-slate-700 dark:bg-slate-900">
                  <span className="material-symbols-outlined text-5xl text-slate-300">search_off</span>
                  <h3 className="mt-4 text-xl font-black">Kendaraan tidak ditemukan</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Coba ubah kata kunci, harga, atau pilihan filter kendaraan.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-5 min-h-11 rounded-xl bg-primary px-5 text-sm font-black text-white"
                  >
                    Lihat Semua Kendaraan
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {selectedVehicle && (
        <div
          className="fixed inset-0 z-60 flex items-end justify-center bg-black/50 px-4 py-6 backdrop-blur-sm md:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="vehicle-detail-title"
        >
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900">
            <div className="relative aspect-[16/9] bg-slate-100 dark:bg-slate-800">
              <img
                src={selectedVehicle.img[0]}
                alt={`${selectedVehicle.name} ${selectedVehicle.model}`}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedVehicle(null)}
                aria-label="Tutup detail kendaraan"
                className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-md"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-5 md:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-emerald-600">
                    Status tersedia
                  </p>
                  <h2 id="vehicle-detail-title" className="mt-1 text-2xl font-black">
                    {selectedVehicle.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {selectedVehicle.model} - {selectedVehicle.type} - {selectedVehicle.year}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs font-semibold uppercase text-slate-400">Per hari</p>
                  <p className="text-2xl font-black">{formatRupiah(selectedVehicle.daily_price)}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                {[
                  ["Transmisi", selectedVehicle.transmission],
                  ["Kapasitas", `${selectedVehicle.seats} kursi`],
                  ["Bahan bakar", selectedVehicle.fuel],
                  ["Warna", selectedVehicle.color],
                  ["Kilometer", selectedVehicle.mileage.toLocaleString("id-ID")],
                  ["Tahun", selectedVehicle.year],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-slate-50 p-3 dark:bg-slate-950">
                    <p className="text-xs text-slate-400">{label}</p>
                    <p className="mt-1 font-bold">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`https://wa.me/628123456789?text=Halo%20ArmadaKita,%20saya%20ingin%20cek%20ketersediaan%20${encodeURIComponent(selectedVehicle.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 flex-1 items-center justify-center rounded-xl bg-primary px-5 text-sm font-black text-white"
                >
                  Booking via WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedVehicle(null)}
                  className="min-h-12 rounded-xl border border-slate-200 px-5 text-sm font-black text-slate-700 dark:border-slate-700 dark:text-slate-200"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
