"use client";

import { useEffect, useState } from "react";

interface Brand {
  name: string;
  image: string | null;
}

interface Category {
  id: number;
  uuid: string;
  name: string;
  description: string;
}

interface VehicleImage {
  id: number;
  image: string;
  is_primary: number | boolean;
}

interface Vehicle {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  model: string | null;
  year: number | null;
  license_plate: string;
  color: string | null;
  seat_capacity: number | null;
  transmission: string | null;
  fuel_type: string | null;
  mileage: number | null;
  daily_price: number;
  description: string | null;
  featured: number;
  brand: Brand | null;
  vehiclecategories: Category | null;
  images: VehicleImage[];
}

export default function Home() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Search/Filter widget state
  const [location, setLocation] = useState<string>("");
  const [pickupDate, setPickupDate] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch brands
        const brandsRes = await fetch("http://127.0.0.1:8000/api/brand");
        const brandsData = await brandsRes.json();

        // Fetch vehicles
        const vehiclesRes = await fetch("http://127.0.0.1:8000/api/vehicle");
        const vehiclesData = await vehiclesRes.json();

        if (brandsData.success) {
          setBrands(brandsData.data.brands || []);
        }
        if (vehiclesData.success) {
          setVehicles(vehiclesData.data.vehicles || []);
        }
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError("Gagal memuat data dari server. Pastikan API backend berjalan.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getVehicleImageUrl = (vehicle: Vehicle) => {
    if (vehicle.images && vehicle.images.length > 0) {
      const primary = vehicle.images.find((img) => img.is_primary);
      return primary ? primary.image : vehicle.images[0].image;
    }
    // Fallback premium image if no image available in database
    return "https://lh3.googleusercontent.com/aida-public/AB6AXuCCmq0PuenP4D9-F5GiOR_UhoGN2XkrB1fA754tEsna0ARzdhc2mYfJULbQWtTpkqyQMZxeeA64OdioARD0uWUDBYQ4PTvZdClvsLP1r5PQ0fzJ9eLRqPZwMkDqaMwq7UBoa81xl1CZIQCJ4Jucwpj4FBi6gPskFJwWa82ORtALTI36hL3ejDaPRarrdtK0EfyDrCTkcYdEZ-ZVIltoKRyweW57hk8rX83p1cJvL9GFm2f1UFE1XQGdP_QVg1E-dMjUNv8kWAiJWcM";
  };

  const getBrandImageUrl = (imagePath: string | null) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http")) return imagePath;
    return `http://127.0.0.1:8000/storage/${imagePath}`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Filter vehicles by category
  const filteredVehicles = vehicles.filter((vehicle) => {
    if (selectedCategory === "All") return true;
    return (
      vehicle.vehiclecategories?.name.toLowerCase() ===
      selectedCategory.toLowerCase()
    );
  });

  // Unique categories list from vehicles
  const categories = ["All", "Mobil", "Motor"];

  // WhatsApp helper
  const handleWhatsAppRedirect = (vehicleName?: string) => {
    const text = vehicleName
      ? `Halo Grand Touring, saya tertarik untuk menyewa kendaraan ${vehicleName}. Apakah unit ini tersedia?`
      : "Halo Grand Touring, saya ingin berkonsultasi mengenai penyewaan kendaraan mewah.";
    const url = `https://wa.me/628123456789?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col w-full min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCmq0PuenP4D9-F5GiOR_UhoGN2XkrB1fA754tEsna0ARzdhc2mYfJULbQWtTpkqyQMZxeeA64OdioARD0uWUDBYQ4PTvZdClvsLP1r5PQ0fzJ9eLRqPZwMkDqaMwq7UBoa81xl1CZIQCJ4Jucwpj4FBi6gPskFJwWa82ORtALTI36hL3ejDaPRarrdtK0EfyDrCTkcYdEZ-ZVIltoKRyweW57hk8rX83p1cJvL9GFm2f1UFE1XQGdP_QVg1E-dMjUNv8kWAiJWcM"
            alt="Porsche 911 GT3"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-16 w-full">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Sewa Mobil Mewah &amp; Eksklusif untuk Perjalanan Anda
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant mb-10 max-w-lg leading-relaxed">
              Nikmati pengalaman berkendara kelas dunia dengan armada pilihan terbaik kami yang selalu terawat sempurna.
            </p>

            {/* Booking Widget */}
            <div className="glass-panel p-6 rounded-2xl max-w-3xl flex flex-col md:flex-row gap-4 items-end shadow-2xl">
              <div className="flex-1 w-full space-y-2">
                <label className="text-xs font-semibold text-primary uppercase tracking-wider">
                  Lokasi
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary">
                    location_on
                  </span>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Pilih Kota"
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-lg pl-10 pr-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="flex-1 w-full space-y-2">
                <label className="text-xs font-semibold text-primary uppercase tracking-wider">
                  Tanggal Ambil
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary">
                    calendar_today
                  </span>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-lg pl-10 pr-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </div>
              </div>

              <button
                onClick={() => handleWhatsAppRedirect()}
                className="w-full md:w-auto bg-primary text-on-primary px-8 py-3.5 rounded-xl font-bold hover:bg-accent transition-all active:scale-95 glow-hover text-sm"
              >
                Cari Mobil
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-background">
        <div className="max-w-[1280px] mx-auto px-4 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="glass-panel p-8 rounded-2xl hover:bg-surface-container-high transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <span className="material-symbols-outlined text-primary group-hover:text-on-primary">
                  directions_car
                </span>
              </div>
              <h3 className="text-xl font-bold mb-4 font-display text-foreground">
                Armada Eksklusif
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Koleksi mobil sport dan luxury terbaik yang selalu terawat dengan standar pabrikan tertinggi.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="glass-panel p-8 rounded-2xl hover:bg-surface-container-high transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <span className="material-symbols-outlined text-primary group-hover:text-on-primary">
                  support_agent
                </span>
              </div>
              <h3 className="text-xl font-bold mb-4 font-display text-foreground">
                Dukungan 24/7
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Layanan concierge pribadi kami siap membantu kebutuhan perjalanan Anda kapan saja, di mana saja.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="glass-panel p-8 rounded-2xl hover:bg-surface-container-high transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <span className="material-symbols-outlined text-primary group-hover:text-on-primary">
                  verified_user
                </span>
              </div>
              <h3 className="text-xl font-bold mb-4 font-display text-foreground">
                Pemesanan Fleksibel
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Proses penyewaan yang mudah dan cepat dengan berbagai pilihan paket asuransi premium terlengkap.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Logos Grid Section */}
      <section className="py-16 bg-background border-t border-outline-variant/10">
        <div className="max-w-[1280px] mx-auto px-4 md:px-16">
          {brands.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center mb-16 opacity-60 hover:opacity-100 transition-opacity duration-500">
              {brands.map((brand, idx) => {
                const imgUrl = getBrandImageUrl(brand.image);
                return (
                  <div
                    key={idx}
                    className="h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
                    title={brand.name}
                  >
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt={brand.name}
                        className="h-full object-contain max-w-[120px]"
                        onError={(e) => {
                          // If image fails to load, replace with styled text badge
                          (e.target as HTMLElement).style.display = "none";
                          const container = (e.target as HTMLElement).parentElement;
                          if (container) {
                            const badge = document.createElement("span");
                            badge.className = "text-primary tracking-[0.2em] uppercase text-sm font-bold";
                            badge.innerText = brand.name;
                            container.appendChild(badge);
                          }
                        }}
                      />
                    ) : (
                      <span className="text-primary tracking-[0.2em] uppercase text-sm font-bold">
                        {brand.name}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full border text-sm font-semibold transition-all duration-300 active:scale-95 ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? "border-primary bg-primary text-on-primary shadow-[0_0_15px_rgba(242,202,80,0.2)]"
                    : "border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Showcase Grid */}
      <section id="fleet" className="py-24 bg-surface-container-low">
        <div className="max-w-[1280px] mx-auto px-4 md:px-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Pilih Kendaraan Impian Anda
              </h2>
              <p className="text-on-surface-variant text-sm mt-2">
                Temukan mobil sport performa tinggi dan skuter otomatis premium untuk kebutuhan mobilitas Anda.
              </p>
            </div>
            <button
              onClick={() => handleWhatsAppRedirect()}
              className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all duration-300"
            >
              Lihat Semua <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-on-surface-variant text-sm">Memuat armada pilihan...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 glass-panel rounded-2xl max-w-lg mx-auto">
              <span className="material-symbols-outlined text-error text-5xl mb-4">error</span>
              <p className="text-foreground font-semibold mb-2">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 bg-primary text-on-primary px-6 py-2 rounded-xl text-sm font-semibold hover:bg-accent transition-all"
              >
                Coba Lagi
              </button>
            </div>
          ) : filteredVehicles.length === 0 ? (
            <div className="text-center py-20 text-on-surface-variant">
              Belum ada kendaraan dalam kategori ini.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredVehicles.map((vehicle) => {
                const imgUrl = getVehicleImageUrl(vehicle);
                return (
                  <div
                    key={vehicle.uuid}
                    onClick={() => handleWhatsAppRedirect(vehicle.name)}
                    className="glass-panel group cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:bg-surface-container-high hover:shadow-2xl"
                  >
                    {/* Image Box */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-surface-container-lowest">
                      <img
                        src={imgUrl}
                        alt={vehicle.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-4 py-1 rounded-full text-primary font-bold text-xs uppercase tracking-wider border border-primary/20">
                        {vehicle.vehiclecategories?.name || "KENDARAAN"}
                      </div>
                    </div>

                    {/* Metadata & Title */}
                    <div className="p-6">
                      <span className="text-xs font-bold text-primary uppercase tracking-widest">
                        {vehicle.brand?.name || "MEREK"}
                      </span>
                      <h4 className="text-xl font-bold font-display text-foreground mt-1 mb-2 group-hover:text-primary transition-colors">
                        {vehicle.name} {vehicle.model && `(${vehicle.model})`}
                      </h4>
                      <p className="text-on-surface-variant text-sm mb-4 line-clamp-2 min-h-[40px]">
                        {vehicle.description || "Tidak ada deskripsi tersedia."}
                      </p>

                      {/* Specs Tags */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-on-surface-variant mb-6 uppercase tracking-wider font-semibold border-t border-outline-variant/10 pt-4">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-base text-primary">
                            settings
                          </span>
                          {vehicle.transmission || "Manual"}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-base text-primary">
                            airline_seat_recline_extra
                          </span>
                          {vehicle.seat_capacity || 2} Kursi
                        </span>
                        {vehicle.fuel_type && (
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-base text-primary">
                              local_gas_station
                            </span>
                            {vehicle.fuel_type}
                          </span>
                        )}
                      </div>

                      {/* Pricing Tag */}
                      <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
                        <div>
                          <p className="text-xs text-on-surface-variant">Harga Sewa</p>
                          <p className="text-primary font-bold text-xl mt-1">
                            {formatPrice(vehicle.daily_price)}
                            <span className="text-on-surface-variant text-xs font-normal">
                              /hari
                            </span>
                          </p>
                        </div>
                        <span className="bg-primary/10 group-hover:bg-primary text-primary group-hover:text-on-primary p-3 rounded-xl transition-all duration-300">
                          <span className="material-symbols-outlined font-bold">
                            arrow_forward
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="max-w-[1280px] mx-auto px-4 md:px-16">
          <div className="relative overflow-hidden rounded-[2rem] bg-surface-container-highest p-12 md:p-20 text-center shadow-2xl">
            {/* Ambient Glows */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"></div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-8">
                Siap Menyewa Kendaraan Hari Ini?
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button
                  onClick={() => handleWhatsAppRedirect()}
                  className="w-full sm:w-auto bg-primary text-on-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-accent transition-all active:scale-95 glow-hover"
                >
                  Pesan Sekarang
                </button>
                <button
                  onClick={() => handleWhatsAppRedirect()}
                  className="w-full sm:w-auto glass-panel text-foreground px-10 py-4 rounded-xl font-bold text-lg border border-outline-variant/30 hover:bg-surface-container-high transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-primary">chat</span>{" "}
                  Hubungi via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
