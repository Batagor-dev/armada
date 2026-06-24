import { notFound } from "next/navigation";
import { getVehicleById } from "@/data/vehicles";
import Link from "next/link";
import VehicleGallery from "@/../components/shared/vehicle-gallery";
import SpecItem from "@/../components/shared/spec-item";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export default async function VehicleDetailPage({
  params,
}: Props) {
  const { id } = await params;

  const vehicle = getVehicleById(Number(id));

  if (!vehicle) {
    notFound();
  }

  return (

    <div className="min-h-screen py-32 px-4 md:px-8 lg:px-16">
    
      <Link
        href="/vehicles"
        className="group inline-flex items-center gap-2 mb-8 text-sm font-bold text-slate-600 hover:text-primary"
      >
        <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">
          arrow_back
        </span>

        Kembali
      </Link>
        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-10">

          {/* Gallery */}
          <div>
            <VehicleGallery
              images={
                Array.isArray(vehicle.img)
                  ? vehicle.img
                  : [vehicle.img]
              }
            />

            <div className="mt-8">
              <h2 className="text-xl font-black">
                Tentang Kendaraan
              </h2>

              <p className="mt-3 text-slate-600 leading-relaxed">
                {vehicle.description}
              </p>
            </div>
          </div>

          {/* Detail */}
          <div className="space-y-6">

            {/* CARD UTAMA */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                {vehicle.name}
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                {vehicle.model} • {vehicle.year}
              </p>

              <div className="mt-5">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Harga Sewa
                </p>

                <div className="mt-1 flex items-end gap-1">
                  <span className="text-2xl font-bold text-primary">
                    {formatRupiah(vehicle.daily_price)}
                  </span>
                  <span className="pb-1 text-sm text-slate-500">/hari</span>
                </div>
              </div>

              {/* CTA BUTTON */}
              <Link
                href={`/vehicles/${id}/booking`}
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-[#2A4F7A] text-white font-semibold shadow-md transition hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-lg">edit_note</span>
                Pesan Sekarang
              </Link>
            </div>

            {/* SPESIFIKASI */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

              <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">
                Spesifikasi Kendaraan
              </h3>

              <div className="grid grid-cols-2 gap-3">

                <SpecItem icon="settings" title="Transmisi" value={vehicle.transmission} />

                <SpecItem icon="airline_seat_recline_normal" title="Kapasitas" value={`${vehicle.seats} Orang`} />

                <SpecItem icon="local_gas_station" title="Bahan Bakar" value={vehicle.fuel} />

                <SpecItem icon="palette" title="Warna" value={vehicle.color} />

                <SpecItem icon="speed" title="Kilometer" value={vehicle.mileage.toLocaleString("id-ID")} />

                <SpecItem icon="directions_car" title="Tipe" value={vehicle.type} />

              </div>
            </div>

          </div>

        </div>
    </div>
  );
}