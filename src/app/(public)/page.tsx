"use client";

import { useState } from "react";
import VehicleCard from "../../../components/shared/vehicle-card";
import { VEHICLES_DATABASE } from "../../data/vehicles";
import { FadeInScroll } from "../../../components/ui/animations/fade-in-scroll";
import { SplitText } from "../../../components/ui/animations/split-text";
import { CountUp } from "../../../components/ui/animations/count-up";

const VEHICLE_TYPES = ["Semua Tipe", "Mobil", "Motor"];

export default function Home() {
  // Search state
  const [selectedLocation, setSelectedLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [selectedType, setSelectedType] = useState("Semua Tipe");
  
  // Filter active tab state (for Fleet section)
  const [activeTab, setActiveTab] = useState("Semua Tipe");

  // Search filter results state
  const [searchApplied, setSearchApplied] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    location: "",
    type: "Semua Tipe"
  });

  // Booking Modal state
  const [selectedCar, setSelectedCar] = useState<typeof VEHICLES_DATABASE[0] | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [driverOption, setDriverOption] = useState("lepas-kunci");

  // Handle main search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchApplied(true);
    setSearchQuery({
      location: selectedLocation,
      type: selectedType
    });
    // Sync fleet section active tab with search selection
    setActiveTab(selectedType);

    // Smooth scroll to the fleet section
    const fleetSection = document.getElementById("fleet");
    if (fleetSection) {
      fleetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredVehicles = VEHICLES_DATABASE.filter((vehicle) => {
    if (activeTab === "Semua Tipe") return true;
    return vehicle.type === activeTab;
  });

  // Reset filter search
  const handleResetSearch = () => {
    setSelectedLocation("");
    setPickupDate("");
    setReturnDate("");
    setSelectedType("Semua Tipe");
    setSearchApplied(false);
    setActiveTab("Semua Tipe");
  };


  // Format currency helper
  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(number);
  };

  // Handle booking form submission
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingPhone) return;

    setBookingSuccess(true);
    setTimeout(() => {
      // Create WhatsApp Link with pre-filled message
      const message = `Halo ArmadaKita, saya ingin melakukan pemesanan kendaraan:%0A%0A` +
        `🚗 *Mobil:* ${selectedCar?.name}%0A` +
        `📍 *Lokasi:* ${selectedLocation || "Jakarta"}%0A` +
        `📅 *Tanggal Pinjam:* ${pickupDate || "Segera"}%0A` +
        `📅 *Tanggal Kembali:* ${returnDate || "-"}%0A` +
        `👤 *Nama:* ${bookingName}%0A` +
        `📞 *No. WhatsApp:* ${bookingPhone}%0A` +
        `🔑 *Layanan:* ${driverOption === "dengan-sopir" ? "Dengan Sopir" : "Lepas Kunci"}%0A%0A` +
        `Mohon konfirmasi ketersediaan armada. Terima kasih!`;
      
      const whatsappUrl = `https://wa.me/628123456789?text=${message}`;
      window.open(whatsappUrl, "_blank");

      // Reset states
      setBookingSuccess(false);
      setSelectedCar(null);
      setBookingName("");
      setBookingPhone("");
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground overflow-x-hidden" id="home">
      
      {/* 1. HERO BANNER */}
      <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 py-20">

          {/* Heading */}
          <div className="text-center max-w-5xl mx-auto mb-12">

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight text-gray-900 text-center">
              <SplitText text="Booking Kendaraan" className="justify-center" />
              <span className="block premium-gradient-text text-center mt-2">
                <SplitText text="Mudah, Cepat & Terpercaya" className="justify-center" />
              </span>
            </h1>

            <FadeInScroll delay={0.8} distance={20}>
              <p className="mt-6 text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
                Sewa mobil harian, mingguan hingga bulanan dengan armada terbaik.
                Tersedia layanan lepas kunci maupun dengan sopir profesional untuk
                kebutuhan pribadi, bisnis, maupun perjalanan keluarga.
              </p>
            </FadeInScroll>

            {/* CTA */}
            <FadeInScroll delay={1} distance={20} className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a href="/vehicles" className="bg-gradient-to-br from-[var(--secondary)] via-[var(--accent)] to-[#E8D5A8] hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition">
                Booking Sekarang
              </a>

              <a href="#fleet" className="border border-gray-300 hover:border-orange-500 hover:premium-gradient-text px-8 py-4 rounded-xl font-semibold transition">
                Lihat Armada
              </a>
            </FadeInScroll>
          </div>

          {/* Car Showcase */}
          <FadeInScroll delay={0.2} direction="up" distance={50} className="relative flex justify-center items-center">

            {/* Shadow */}
            <div className="absolute bottom-0 w-[80%] h-20 bg-black/10 blur-3xl rounded-full"></div>

            {/* Background Glow */}
            <div className="absolute w-[600px] h-[600px] bg-orange-400/10 rounded-full blur-[150px]"></div>

            <img
              src="/assets/images/banner/HeroBanner.png"
              alt="Armada Kendaraan"
              className="relative z-10 w-full max-w-6xl object-contain"
            />
          </FadeInScroll>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">

            <FadeInScroll delay={0.2} className="bg-gray-50 rounded-2xl p-6 text-center border">
              <h3 className="text-3xl font-bold premium-gradient-text"><CountUp to={500} />+</h3>
              <p className="text-gray-600 mt-2">Unit Kendaraan</p>
            </FadeInScroll>

            <FadeInScroll delay={0.4} className="bg-gray-50 rounded-2xl p-6 text-center border">
              <h3 className="text-3xl font-bold premium-gradient-text"><CountUp to={10000} />+</h3>
              <p className="text-gray-600 mt-2">Pelanggan Puas</p>
            </FadeInScroll>

            <FadeInScroll delay={0.6} className="bg-gray-50 rounded-2xl p-6 text-center border">
              <h3 className="text-3xl font-bold premium-gradient-text"><CountUp to={24} duration={1} />/7</h3>
              <p className="text-gray-600 mt-2">Layanan Customer Service</p>
            </FadeInScroll>

          </div>

        </div>
      </section>

      {/* 2. KENDARAAN UNGGULAN (FLEET SECTION) */}
      <section className="bg-white dark:bg-slate-950" id="fleet">
        <div className="max-w-[1280px] w-full mx-auto px-4 ">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-center gap-5 mb-10 text-center">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                <SplitText text="Kendaraan" className="justify-center" />
                <span className="block premium-gradient-text"><SplitText text="Terlaris Minggu Ini" className="justify-center" /></span>
              </h2>
              
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-4 py-4 mb-8">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {VEHICLE_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveTab(type)}
                  className={`px-4 py-2 rounded-md text-[10px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    activeTab === type
                      ? "bg-[var(--primary)] text-white shadow-md shadow-[rgba(30,58,95,0.18)]"
                      : "bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-600 dark:text-slate-400 hover:border-[var(--secondary)] hover:text-[var(--primary)] dark:hover:text-white"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {filteredVehicles.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {filteredVehicles.slice(0, 4).map((car, index) => (
          <FadeInScroll key={car.id} delay={index * 0.1}>
            <VehicleCard
              vehicle={car}
              formatPrice={formatRupiah}
              onDetail={setSelectedCar}
            />
          </FadeInScroll>
        ))}
      </div>
      ) : (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center max-w-xl mx-auto">
        <span className="material-symbols-outlined text-slate-300 text-6xl mb-4">
          search_off
        </span>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          Armada Tidak Ditemukan
        </h3>

        <p className="text-slate-500 text-sm mb-6">
          Maaf, tidak ada armada tipe &quot;{activeTab}&quot; yang tersedia untuk lokasi yang
          Anda cari saat ini.
        </p>

        <a
          href="/vehicles"
          className="bg-primary hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all cursor-pointer"
        >
          Lihat Semua Armada
        </a>
      </div>
    )}

      <div className="flex justify-center mt-12">
            <a
              href="/vehicles"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[var(--primary)] text-white font-bold text-sm tracking-wide hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Lihat Semua Armada
              <span className="material-symbols-outlined text-lg transition-transform duration-300 group-hover:translate-x-1">
                arrow_forward
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US (KENAPA MEMILIH KAMI) */}
      <section className="py-24 md:py-36 bg-white dark:bg-slate-900" id="about">
        <div className="max-w-[1280px] w-full mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Header Content */}
            <FadeInScroll direction="right" className="lg:col-span-5 space-y-6">
              <h2 className="text-xs font-black text-primary uppercase tracking-widest">Kenapa Memilih Kami</h2>
              <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                <SplitText text="Mengutamakan Kenyamanan dan Keselamatan Perjalanan Anda" />
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                ArmadaKita hadir sebagai solusi andalan sewa kendaraan Anda. Kami memiliki standar operasional ketat untuk memastikan Anda selalu berkendara dengan rasa aman, nyaman, dan puas.
              </p>
              <div className="p-6 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-3xl bg-blue-500/10 p-3 rounded-2xl">workspace_premium</span>
                <div>
                  <h4 className="font-bold text-slate-950 dark:text-white text-sm mb-1">Jaminan Layanan Premium</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Setiap pemesanan dikawal oleh tim customer service profesional untuk membantu kebutuhan perjalanan Anda secara lancar.
                  </p>
                </div>
              </div>
            </FadeInScroll>

            {/* Benefit Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
              
              {/* Card 1 */}
              <FadeInScroll delay={0.2} className="bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-8 hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <span className="material-symbols-outlined text-primary text-4xl mb-6">health_and_safety</span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Armada Selalu Prima</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Semua kendaraan menjalani pemeriksaan teknis rutin lengkap di bengkel resmi serta pembersihan interior & eksterior mendalam sebelum diserahkan kepada Anda.
                </p>
              </FadeInScroll>

              {/* Card 2 */}
              <FadeInScroll delay={0.3} className="bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-8 hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <span className="material-symbols-outlined text-accent text-4xl mb-6">sell</span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Harga Jujur & Transparan</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Tidak ada biaya siluman. Seluruh detail harga sewa per hari, opsi asuransi, maupun biaya supir tertera dengan sangat transparan di awal transaksi.
                </p>
              </FadeInScroll>

              {/* Card 3 */}
              <FadeInScroll delay={0.4} className="bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-8 hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <span className="material-symbols-outlined text-emerald-500 text-4xl mb-6">support_agent</span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Layanan Darurat 24 Jam</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Jika terjadi kendala teknis atau kecelakaan di jalan raya, tim tanggap darurat kami siap dikirim ke lokasi Anda kapan saja, 24 jam sehari, 7 hari seminggu.
                </p>
              </FadeInScroll>

              {/* Card 4 */}
              <FadeInScroll delay={0.5} className="bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-8 hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <span className="material-symbols-outlined text-purple-500 text-4xl mb-6">vpn_key</span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Supir & Lepas Kunci</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Nikmati kebebasan menyetir sendiri dengan layanan lepas kunci, atau sewa bersama supir profesional kami yang ramah, berpengalaman, dan menguasai rute kota.
                </p>
              </FadeInScroll>

            </div>
          </div>
        </div>
      </section>

      {/* 5. CARA BOOKING (TUTORIAL SECTION) */}
      <section className=" bg-slate-50 dark:bg-slate-950/20" id="tutorial">
        <div className="max-w-[1280px] w-full mx-auto px-4 md:px-8 lg:px-16">
          
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-xs font-black text-primary uppercase tracking-widest mb-3">Cara Sewa</h2>
            <p className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              <SplitText text="Langkah Pemesanan Sangat Mudah" className="justify-center" />
            </p>
            <FadeInScroll delay={0.4}>
              <p className="text-slate-500 text-sm">
                Kami menyederhanakan proses penyewaan kendaraan agar Anda dapat segera memulai perjalanan tanpa hambatan administrasi yang rumit.
              </p>
            </FadeInScroll>
          </div>

          {/* Interactive Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            
            {/* Horizontal progress line for desktop */}
            <div className="hidden md:block absolute top-10 left-1/8 right-1/8 h-0.5 bg-slate-200 dark:bg-slate-800 z-0"></div>

            {/* Step 1 */}
            <FadeInScroll delay={0.2} direction="up" className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-primary font-black text-xl mb-6 shadow-md group-hover:bg-primary group-hover:text-white transition-all duration-300">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">Pilih Kendaraan</h3>
              <p className="text-slate-500 text-xs max-w-[200px] leading-relaxed">
                Tentukan tipe mobil yang sesuai dengan kebutuhan kapasitas dan estetika perjalanan Anda dari katalog kami.
              </p>
            </FadeInScroll>

            {/* Step 2 */}
            <FadeInScroll delay={0.4} direction="up" className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-primary font-black text-xl mb-6 shadow-md group-hover:bg-primary group-hover:text-white transition-all duration-300">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">Tentukan Tanggal & Lokasi</h3>
              <p className="text-slate-500 text-xs max-w-[200px] leading-relaxed">
                Pilih tanggal mulai, tanggal berakhir, dan di mana Anda ingin kendaraan diserahterimakan.
              </p>
            </FadeInScroll>

            {/* Step 3 */}
            <FadeInScroll delay={0.6} direction="up" className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-primary font-black text-xl mb-6 shadow-md group-hover:bg-primary group-hover:text-white transition-all duration-300">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">Isi Data & Verifikasi</h3>
              <p className="text-slate-500 text-xs max-w-[200px] leading-relaxed">
                Isi formulir identitas singkat, lampirkan dokumen pendukung (KTP/SIM) dan tunggu verifikasi cepat admin kami.
              </p>
            </FadeInScroll>

            {/* Step 4 */}
            <FadeInScroll delay={0.8} direction="up" className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-primary font-black text-xl mb-6 shadow-md group-hover:bg-primary group-hover:text-white transition-all duration-300">
                4
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">Mulai Perjalanan</h3>
              <p className="text-slate-500 text-xs max-w-[200px] leading-relaxed">
                Lakukan pembayaran aman, serah terima kunci di lokasi yang disepakati, dan mulailah perjalanan Anda dengan riang gembira!
              </p>
            </FadeInScroll>

          </div>

          {/* Quick FAQ/Tip Callout */}
          <div className="mt-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-4 justify-between max-w-4xl mx-auto shadow-sm">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-accent text-3xl">lightbulb</span>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                <strong>Tips Tambahan:</strong> Persiapkan foto KTP dan SIM A Anda untuk mempercepat proses persetujuan verifikasi rental Anda.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. TESTIMONI (TESTIMONIALS SECTION) */}
      <section className="py-24 md:py-36 bg-white dark:bg-slate-900" id="blog">
        {/* We reuse this section to satisfy "blog" link or showcase community updates + testimonials */}
        <div className="max-w-[1280px] w-full mx-auto px-4 md:px-8 lg:px-16">
          
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-xs font-black text-primary uppercase tracking-widest mb-3">Testimoni</h2>
            <p className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              <SplitText text="Apa Kata Mereka Tentang Kami" className="justify-center" />
            </p>
            <FadeInScroll delay={0.4}>
              <p className="text-slate-500 text-sm">
                Ulasan asli dan tepercaya dari ratusan pelanggan setia yang telah merasakan pelayanan terbaik dari ArmadaKita.
              </p>
            </FadeInScroll>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Testimonial 1 */}
            <FadeInScroll delay={0.2} direction="up" className="bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-8 relative flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <span className="material-symbols-outlined text-slate-200 dark:text-slate-850 text-6xl absolute top-6 right-6 pointer-events-none select-none">format_quote</span>
              <div className="space-y-4">
                {/* Rating */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-accent text-sm">star</span>
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-xs italic leading-relaxed relative z-10">
                  &quot;Sewa Toyota Alphard di ArmadaKita untuk keperluan penjemputan tamu VIP kantor. Mobil bersih berkilau, interior wangi, dan supirnya sangat sopan serta hafal jalan alternatif menghindari kemacetan. Pelayanan bintang 5!&quot;
                </p>
              </div>
              <div className="flex items-center gap-3 mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">
                  AH
                </div>
                <div>
                  <h4 className="font-bold text-slate-950 dark:text-white text-xs">Aditya Hermawan</h4>
                  <p className="text-slate-500 text-[10px]">Manager Operasional, Jakarta</p>
                </div>
              </div>
            </FadeInScroll>

            {/* Testimonial 2 */}
            <FadeInScroll delay={0.4} direction="up" className="bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-8 relative flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <span className="material-symbols-outlined text-slate-200 dark:text-slate-850 text-6xl absolute top-6 right-6 pointer-events-none select-none">format_quote</span>
              <div className="space-y-4">
                {/* Rating */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-accent text-sm">star</span>
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-xs italic leading-relaxed relative z-10">
                  &quot;Saya memilih rental lepas kunci Innova Zenix untuk liburan keluarga di Bali selama 4 hari. Proses verifikasinya sangat cepat dan praktis via WA. Mobil diantar tepat waktu ke Bandara Ngurah Rai. Sangat recommended!&quot;
                </p>
              </div>
              <div className="flex items-center gap-3 mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center font-bold text-accent text-xs">
                  SP
                </div>
                <div>
                  <h4 className="font-bold text-slate-950 dark:text-white text-xs">Siti Pertiwi</h4>
                  <p className="text-slate-500 text-[10px]">Ibu Rumah Tangga, Surabaya</p>
                </div>
              </div>
            </FadeInScroll>

            {/* Testimonial 3 */}
            <FadeInScroll delay={0.6} direction="up" className="bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-8 relative flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <span className="material-symbols-outlined text-slate-200 dark:text-slate-850 text-6xl absolute top-6 right-6 pointer-events-none select-none">format_quote</span>
              <div className="space-y-4">
                {/* Rating */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-accent text-sm">star</span>
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-xs italic leading-relaxed relative z-10">
                  &quot;Sangat puas dengan layanan tanggap darurat 24/7-nya. Saat ban Pajero kami terkena paku di tol Cipularang tengah malam, tim teknis langsung datang membantu dalam waktu 30 menit saja. Luar biasa tanggap!&quot;
                </p>
              </div>
              <div className="flex items-center gap-3 mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center font-bold text-purple-600 text-xs">
                  BN
                </div>
                <div>
                  <h4 className="font-bold text-slate-950 dark:text-white text-xs">Bambang Nugroho</h4>
                  <p className="text-slate-500 text-[10px]">Wiraswasta, Bandung</p>
                </div>
              </div>
            </FadeInScroll>

          </div>

        </div>
      </section>

      {/* 7. CTA BOOKING (CTA BANNER) */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 max-w-[1280px] w-full mx-auto px-4 md:px-8 lg:px-16 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight max-w-3xl mx-auto">
            <SplitText text="Siap Memulai Perjalanan Indah Anda Bersama Kami?" className="justify-center" />
          </h2>
          <FadeInScroll delay={0.4}>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Dapatkan diskon promo khusus pelanggan baru hingga 15% untuk penyewaan di atas 3 hari. Hubungi CS kami atau pesan langsung sekarang juga.
            </p>
          </FadeInScroll>
          <FadeInScroll delay={0.6} className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <a
              href="#fleet"
              className="bg-primary hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-all active:scale-95 shadow-lg shadow-blue-500/10"
            >
              Pesan Sekarang
            </a>
            <a
              href="https://wa.me/628123456789?text=Halo%20ArmadaKita,%20saya%20tertarik%20untuk%20sewa%20mobil%20di%20sini."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900 hover:bg-slate-850 text-white border border-slate-800 font-bold px-8 py-3.5 rounded-xl text-sm transition-all active:scale-95 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-green-500 text-lg">chat</span>
              Hubungi CS WhatsApp
            </a>
          </FadeInScroll>
        </div>
      </section>
    </div>
  );
}
