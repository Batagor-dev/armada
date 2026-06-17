"use client";

import { useState, useMemo } from "react";

// Mock data for our exclusive fleet
const VEHICLES_DATABASE = [
  {
    id: 1,
    name: "Toyota Alphard VIP",
    type: "Luxury",
    imageText: "👑 ALPHARD",
    imageBg: "from-slate-700 to-slate-900",
    price: 2400000,
    seats: 7,
    transmission: "Otomatis",
    fuel: "Bensin",
    locations: ["Jakarta", "Bali", "Surabaya"],
    popular: true,
    rating: 4.9,
    description: "Kenyamanan kelas satu dengan kabin super mewah dan suspensi lembut, sangat cocok untuk perjalanan bisnis maupun keluarga terhormat.",
  },
  {
    id: 2,
    name: "Mitsubishi Pajero Sport",
    type: "SUV",
    imageText: "🏔️ PAJERO",
    imageBg: "from-blue-800 to-slate-950",
    price: 1100000,
    seats: 7,
    transmission: "Otomatis",
    fuel: "Diesel",
    locations: ["Jakarta", "Bandung", "Surabaya", "Malang"],
    popular: true,
    rating: 4.8,
    description: "SUV tangguh yang siap melibas segala medan dengan kenyamanan premium dan kabin lapang untuk petualangan Anda.",
  },
  {
    id: 3,
    name: "Honda Civic Turbo RS",
    type: "Sedan",
    imageText: "⚡ CIVIC",
    imageBg: "from-red-800 to-slate-900",
    price: 1400000,
    seats: 5,
    transmission: "Otomatis",
    fuel: "Bensin",
    locations: ["Jakarta", "Bandung"],
    popular: false,
    rating: 4.7,
    description: "Tampilan sporty dan performa mesin turbo bertenaga tinggi untuk Anda yang menyukai sensasi berkendara dinamis di perkotaan.",
  },
  {
    id: 4,
    name: "Toyota Innova Zenix Hybrid",
    type: "MPV",
    imageText: "🔋 ZENIX",
    imageBg: "from-emerald-800 to-slate-900",
    price: 850000,
    seats: 7,
    transmission: "Otomatis",
    fuel: "Hybrid",
    locations: ["Jakarta", "Bandung", "Surabaya", "Bali", "Malang"],
    popular: true,
    rating: 4.9,
    description: "Teknologi hybrid modern yang super hemat bahan bakar namun tetap bertenaga dengan ruang kabin luas dan teknologi mutakhir.",
  },
  {
    id: 5,
    name: "Hyundai Ioniq 5 Electric",
    type: "Luxury",
    imageText: "⚡ IONIQ 5",
    imageBg: "from-cyan-700 to-slate-900",
    price: 1800000,
    seats: 5,
    transmission: "Otomatis",
    fuel: "Listrik",
    locations: ["Jakarta", "Bali"],
    popular: false,
    rating: 4.8,
    description: "Kendaraan listrik futuristik dengan desain ikonik dan akselerasi instan. Bersih lingkungan tanpa kompromi pada kemewahan.",
  },
  {
    id: 6,
    name: "Daihatsu Rocky Turbo",
    type: "SUV",
    imageText: "⛰️ ROCKY",
    imageBg: "from-amber-700 to-slate-900",
    price: 550000,
    seats: 5,
    transmission: "Manual",
    fuel: "Bensin",
    locations: ["Surabaya", "Malang", "Bandung"],
    popular: false,
    rating: 4.6,
    description: "Crossover kompak yang gesit dengan mesin turbo efisien. Sangat lincah menembus kemacetan kota atau jalanan menanjak.",
  },
  {
    id: 7,
    name: "Toyota Avanza Veloz",
    type: "MPV",
    imageText: "🚗 VELOZ",
    imageBg: "from-indigo-800 to-slate-900",
    price: 450000,
    seats: 7,
    transmission: "Otomatis",
    fuel: "Bensin",
    locations: ["Jakarta", "Bandung", "Surabaya", "Malang", "Bali"],
    popular: false,
    rating: 4.7,
    description: "Mobil keluarga sejuta umat berdesain modern dengan fitur keselamatan terintegrasi lengkap dan suspensi yang nyaman.",
  },
  {
    id: 8,
    name: "Mercedes Benz C-Class",
    type: "Sedan",
    imageText: "⭐ C-CLASS",
    imageBg: "from-neutral-700 to-slate-950",
    price: 3200000,
    seats: 5,
    transmission: "Otomatis",
    fuel: "Bensin",
    locations: ["Jakarta", "Bali"],
    popular: true,
    rating: 4.9,
    description: "Definisi kemewahan berkendara dengan kemudi presisi, fitur asisten mengemudi modern, dan prestise tak tertandingi.",
  }
];

const LOCATIONS = ["Jakarta", "Bandung", "Surabaya", "Bali", "Malang"];
const VEHICLE_TYPES = ["Semua Tipe", "SUV", "MPV", "Sedan", "Luxury"];

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

  // Reset filter search
  const handleResetSearch = () => {
    setSelectedLocation("");
    setPickupDate("");
    setReturnDate("");
    setSelectedType("Semua Tipe");
    setSearchApplied(false);
    setActiveTab("Semua Tipe");
  };

  // Filter vehicles based on active tab and search query
  const filteredVehicles = useMemo(() => {
    return VEHICLES_DATABASE.filter((car) => {
      // 1. Check tab filter
      const matchesTab = activeTab === "Semua Tipe" || car.type === activeTab;
      
      // 2. Check search filter (only if search button was clicked)
      if (searchApplied) {
        const matchesLocation = !searchQuery.location || car.locations.includes(searchQuery.location);
        const matchesSearchType = searchQuery.type === "Semua Tipe" || car.type === searchQuery.type;
        return matchesTab && matchesLocation && matchesSearchType;
      }

      return matchesTab;
    });
  }, [activeTab, searchApplied, searchQuery]);

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

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight text-gray-900">
              Booking Kendaraan
              <span className="block premium-gradient-text">
                Mudah, Cepat & Terpercaya
              </span>
            </h1>

            <p className="mt-6 text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
              Sewa mobil harian, mingguan hingga bulanan dengan armada terbaik.
              Tersedia layanan lepas kunci maupun dengan sopir profesional untuk
              kebutuhan pribadi, bisnis, maupun perjalanan keluarga.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button className="bg-gradient-to-br from-[var(--secondary)] via-[var(--accent)] to-[#E8D5A8] hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition">
                Booking Sekarang
              </button>

              <button className="border border-gray-300 hover:border-orange-500 hover:premium-gradient-text px-8 py-4 rounded-xl font-semibold transition">
                Lihat Armada
              </button>
            </div>
          </div>

          {/* Car Showcase */}
          <div className="relative flex justify-center items-center">

            {/* Shadow */}
            <div className="absolute bottom-0 w-[80%] h-20 bg-black/10 blur-3xl rounded-full"></div>

            {/* Background Glow */}
            <div className="absolute w-[600px] h-[600px] bg-orange-400/10 rounded-full blur-[150px]"></div>

            <img
              src="/assets/images/banner/HeroBanner.png"
              alt="Armada Kendaraan"
              className="relative z-10 w-full max-w-6xl object-contain"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">

            <div className="bg-gray-50 rounded-2xl p-6 text-center border">
              <h3 className="text-3xl font-bold premium-gradient-text">500+</h3>
              <p className="text-gray-600 mt-2">Unit Kendaraan</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 text-center border">
              <h3 className="text-3xl font-bold premium-gradient-text">10.000+</h3>
              <p className="text-gray-600 mt-2">Pelanggan Puas</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 text-center border">
              <h3 className="text-3xl font-bold premium-gradient-text">24/7</h3>
              <p className="text-gray-600 mt-2">Layanan Customer Service</p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. KENDARAAN UNGGULAN (FLEET SECTION) */}
      <section className="py-24 md:py-36 bg-slate-50 dark:bg-slate-950/20" id="fleet">
        <div className="max-w-[1280px] w-full mx-auto px-4 md:px-8 lg:px-16">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-black text-primary uppercase tracking-widest mb-3">Katalog Kendaraan</h2>
            <p className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              Kendaraan Unggulan Kami
            </p>
            <p className="text-slate-500 text-sm">
              Temukan pilihan kendaraan terbaik yang siap menemani perjalanan Anda. Dari kendaraan mewah, keluarga, hingga petualangan tangguh.
            </p>
          </div>

          {/* Tabs Filter */}
          <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
            {VEHICLE_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setActiveTab(type)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                  activeTab === type
                    ? "bg-primary text-white shadow-md shadow-blue-500/20"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-350 dark:hover:border-slate-700"
                }`}
              >
                {type}
              </button>
            ))}

            {searchApplied && (
              <button
                onClick={handleResetSearch}
                className="px-4 py-2.5 rounded-full text-xs font-bold text-red-500 hover:text-red-700 border border-red-500/20 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs">close</span>
                Reset Cari: &quot;{searchQuery.location || "Semua Kota"}&quot;
              </button>
            )}
          </div>

          {/* Cards Grid */}
          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredVehicles.map((car) => (
                <div
                  key={car.id}
                  className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                >
                  {/* Visual Image Area (using nice CSS with gradient and branding instead of placeholder links) */}
                  <div className={`h-48 bg-gradient-to-br ${car.imageBg} relative flex items-center justify-center select-none overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="text-white font-black text-2xl tracking-widest drop-shadow-md transform group-hover:scale-110 transition-transform duration-500">
                      {car.imageText}
                    </span>
                    
                    {/* Tags */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {car.type}
                      </span>
                      {car.popular && (
                        <span className="bg-accent text-slate-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[10px]">local_fire_department</span>
                          Terlaris
                        </span>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="absolute top-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-900 dark:text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-accent text-xs">star</span>
                      {car.rating}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                      {car.name}
                    </h3>
                    
                    {/* Location Badge */}
                    <div className="mt-2 flex flex-wrap gap-1">
                      {car.locations.map((loc) => (
                        <span key={loc} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold px-2 py-0.5 rounded">
                          📍 {loc}
                        </span>
                      ))}
                    </div>

                    <p className="text-slate-500 text-xs mt-3 line-clamp-2 h-8 leading-relaxed">
                      {car.description}
                    </p>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-3 gap-2 border-t border-b border-slate-100 dark:border-slate-800/80 my-4 py-3 text-slate-500 dark:text-slate-400">
                      <div className="flex flex-col items-center justify-center text-center">
                        <span className="material-symbols-outlined text-slate-400 text-lg mb-1">group</span>
                        <span className="text-[10px] font-bold">{car.seats} Kursi</span>
                      </div>
                      <div className="flex flex-col items-center justify-center text-center border-l border-r border-slate-100 dark:border-slate-800/80">
                        <span className="material-symbols-outlined text-slate-400 text-lg mb-1">settings_input_hdmi</span>
                        <span className="text-[10px] font-bold">{car.transmission}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center text-center">
                        <span className="material-symbols-outlined text-slate-400 text-lg mb-1">local_gas_station</span>
                        <span className="text-[10px] font-bold">{car.fuel}</span>
                      </div>
                    </div>

                    {/* Pricing & CTA */}
                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <span className="text-slate-400 text-[10px] block font-semibold uppercase tracking-wider">Mulai Dari</span>
                        <span className="text-base font-black text-slate-900 dark:text-white">
                          {formatRupiah(car.price)}
                          <span className="text-slate-500 text-[10px] font-medium">/hari</span>
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedCar(car)}
                        className="bg-primary hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all active:scale-95 cursor-pointer shadow-md shadow-blue-500/10"
                      >
                        Sewa Sekarang
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center max-w-xl mx-auto">
              <span className="material-symbols-outlined text-slate-300 text-6xl mb-4">search_off</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Armada Tidak Ditemukan</h3>
              <p className="text-slate-500 text-sm mb-6">
                Maaf, tidak ada armada tipe &quot;{activeTab}&quot; yang tersedia untuk lokasi yang Anda cari saat ini. Silakan coba pilih kota atau tipe kendaraan yang lain.
              </p>
              <button
                onClick={handleResetSearch}
                className="bg-primary hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all cursor-pointer"
              >
                Lihat Semua Armada
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 4. WHY CHOOSE US (KENAPA MEMILIH KAMI) */}
      <section className="py-24 md:py-36 bg-white dark:bg-slate-900" id="about">
        <div className="max-w-[1280px] w-full mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Header Content */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-xs font-black text-primary uppercase tracking-widest">Kenapa Memilih Kami</h2>
              <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                Mengutamakan Kenyamanan dan Keselamatan Perjalanan Anda
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
            </div>

            {/* Benefit Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
              
              {/* Card 1 */}
              <div className="bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-8 hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <span className="material-symbols-outlined text-primary text-4xl mb-6">health_and_safety</span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Armada Selalu Prima</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Semua kendaraan menjalani pemeriksaan teknis rutin lengkap di bengkel resmi serta pembersihan interior & eksterior mendalam sebelum diserahkan kepada Anda.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-8 hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <span className="material-symbols-outlined text-accent text-4xl mb-6">sell</span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Harga Jujur & Transparan</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Tidak ada biaya siluman. Seluruh detail harga sewa per hari, opsi asuransi, maupun biaya supir tertera dengan sangat transparan di awal transaksi.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-8 hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <span className="material-symbols-outlined text-emerald-500 text-4xl mb-6">support_agent</span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Layanan Darurat 24 Jam</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Jika terjadi kendala teknis atau kecelakaan di jalan raya, tim tanggap darurat kami siap dikirim ke lokasi Anda kapan saja, 24 jam sehari, 7 hari seminggu.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-8 hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <span className="material-symbols-outlined text-purple-500 text-4xl mb-6">vpn_key</span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Supir & Lepas Kunci</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Nikmati kebebasan menyetir sendiri dengan layanan lepas kunci, atau sewa bersama supir profesional kami yang ramah, berpengalaman, dan menguasai rute kota.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5. CARA BOOKING (TUTORIAL SECTION) */}
      <section className="py-24 md:py-36 bg-slate-50 dark:bg-slate-950/20" id="tutorial">
        <div className="max-w-[1280px] w-full mx-auto px-4 md:px-8 lg:px-16">
          
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-xs font-black text-primary uppercase tracking-widest mb-3">Cara Sewa</h2>
            <p className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              Langkah Pemesanan Sangat Mudah
            </p>
            <p className="text-slate-500 text-sm">
              Kami menyederhanakan proses penyewaan kendaraan agar Anda dapat segera memulai perjalanan tanpa hambatan administrasi yang rumit.
            </p>
          </div>

          {/* Interactive Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            
            {/* Horizontal progress line for desktop */}
            <div className="hidden md:block absolute top-16 left-1/8 right-1/8 h-0.5 bg-slate-200 dark:bg-slate-800 z-0"></div>

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-primary font-black text-xl mb-6 shadow-md group-hover:bg-primary group-hover:text-white transition-all duration-300">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">Pilih Kendaraan</h3>
              <p className="text-slate-500 text-xs max-w-[200px] leading-relaxed">
                Tentukan tipe mobil yang sesuai dengan kebutuhan kapasitas dan estetika perjalanan Anda dari katalog kami.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-primary font-black text-xl mb-6 shadow-md group-hover:bg-primary group-hover:text-white transition-all duration-300">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">Tentukan Tanggal & Lokasi</h3>
              <p className="text-slate-500 text-xs max-w-[200px] leading-relaxed">
                Pilih tanggal mulai, tanggal berakhir, dan di mana Anda ingin kendaraan diserahterimakan.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-primary font-black text-xl mb-6 shadow-md group-hover:bg-primary group-hover:text-white transition-all duration-300">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">Isi Data & Verifikasi</h3>
              <p className="text-slate-500 text-xs max-w-[200px] leading-relaxed">
                Isi formulir identitas singkat, lampirkan dokumen pendukung (KTP/SIM) dan tunggu verifikasi cepat admin kami.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-primary font-black text-xl mb-6 shadow-md group-hover:bg-primary group-hover:text-white transition-all duration-300">
                4
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">Mulai Perjalanan</h3>
              <p className="text-slate-500 text-xs max-w-[200px] leading-relaxed">
                Lakukan pembayaran aman, serah terima kunci di lokasi yang disepakati, dan mulailah perjalanan Anda dengan riang gembira!
              </p>
            </div>

          </div>

          {/* Quick FAQ/Tip Callout */}
          <div className="mt-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-4 justify-between max-w-4xl mx-auto shadow-sm">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-accent text-3xl">lightbulb</span>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                <strong>Tips Tambahan:</strong> Persiapkan foto KTP dan SIM A Anda untuk mempercepat proses persetujuan verifikasi rental Anda.
              </p>
            </div>
            <a href="#fleet" className="text-primary hover:text-blue-700 font-bold text-xs flex items-center gap-1 shrink-0">
              Lihat Armada Sekarang
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
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
              Apa Kata Mereka Tentang Kami
            </p>
            <p className="text-slate-500 text-sm">
              Ulasan asli dan tepercaya dari ratusan pelanggan setia yang telah merasakan pelayanan terbaik dari ArmadaKita.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Testimonial 1 */}
            <div className="bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-8 relative flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
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
            </div>

            {/* Testimonial 2 */}
            <div className="bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-8 relative flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
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
            </div>

            {/* Testimonial 3 */}
            <div className="bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-8 relative flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
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
            </div>

          </div>

        </div>
      </section>

      {/* 7. CTA BOOKING (CTA BANNER) */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 max-w-[1280px] w-full mx-auto px-4 md:px-8 lg:px-16 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight max-w-3xl mx-auto">
            Siap Memulai Perjalanan Indah Anda Bersama Kami?
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Dapatkan diskon promo khusus pelanggan baru hingga 15% untuk penyewaan di atas 3 hari. Hubungi CS kami atau pesan langsung sekarang juga.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
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
          </div>
        </div>
      </section>

      {/* 8. INTERACTIVE BOOKING MODAL */}
      {selectedCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div 
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-scale-up"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className={`p-6 bg-gradient-to-br ${selectedCar.imageBg} text-white relative`}>
              <button
                onClick={() => setSelectedCar(null)}
                className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Tutup"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
              <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded">
                {selectedCar.type}
              </span>
              <h3 className="text-2xl font-black mt-2">{selectedCar.name}</h3>
              <p className="text-white/80 text-xs mt-1">Sewa Premium Terjamin</p>
            </div>

            {/* Form */}
            <form onSubmit={handleConfirmBooking} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                  <span className="material-symbols-outlined text-primary text-base">group</span>
                  {selectedCar.seats} Kursi
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                  <span className="material-symbols-outlined text-primary text-base">settings_input_hdmi</span>
                  {selectedCar.transmission}
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 col-span-2">
                  <span className="material-symbols-outlined text-primary text-base">local_gas_station</span>
                  Bahan Bakar: {selectedCar.fuel}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Metode Layanan</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDriverOption("lepas-kunci")}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      driverOption === "lepas-kunci"
                        ? "bg-primary/10 border-primary text-primary"
                        : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    🔑 Lepas Kunci
                  </button>
                  <button
                    type="button"
                    onClick={() => setDriverOption("dengan-sopir")}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      driverOption === "dengan-sopir"
                        ? "bg-primary/10 border-primary text-primary"
                        : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    👤 Dengan Sopir
                  </button>
                </div>
              </div>

              {/* Input Nama */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan nama lengkap Anda"
                  value={bookingName}
                  onChange={(e) => setBookingName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              {/* Input Nomor Handphone */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">No. WhatsApp</label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 08123456789"
                  value={bookingPhone}
                  onChange={(e) => setBookingPhone(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              {/* Price Breakdown */}
              <div className="bg-slate-50 dark:bg-slate-800/30 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Sewa Harian ({selectedCar.name})</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{formatRupiah(selectedCar.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Supir &amp; Bensin</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {driverOption === "dengan-sopir" ? "Hubungi CS (Ada Biaya)" : "Rp 0 (Lepas Kunci)"}
                  </span>
                </div>
                <hr className="border-slate-100 dark:border-slate-800 my-1.5" />
                <div className="flex justify-between font-bold text-sm text-slate-950 dark:text-white">
                  <span>Total Harga Sewa</span>
                  <span className="text-primary">{formatRupiah(selectedCar.price)} /hari</span>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedCar(null)}
                  className="w-full border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-350 font-bold py-3 rounded-xl text-xs transition-all active:scale-95 cursor-pointer"
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  disabled={bookingSuccess}
                  className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs transition-all active:scale-95 cursor-pointer shadow-lg shadow-blue-500/10 flex items-center justify-center gap-1.5"
                >
                  {bookingSuccess ? (
                    <>
                      <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                      Mengalihkan...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-sm">send</span>
                      Kirim Ke WA
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}