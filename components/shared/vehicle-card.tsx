"use client";

import Link from "next/link";

export type VehicleCardData = {
  id: number;
  name: string;
  model: string;
  type: string;
  year: number;
  mileage: number;
  transmission: string;
  daily_price: number;
  img: string [] | string;
};

type VehicleCardProps<TVehicle extends VehicleCardData> = {
  vehicle: TVehicle;
  formatPrice: (price: number) => string;
  onDetail: (vehicle: TVehicle) => void;
  showStatus?: boolean;
};

export default function VehicleCard<TVehicle extends VehicleCardData>({
  vehicle,
  formatPrice,
  onDetail,
  showStatus = false,
}: VehicleCardProps<TVehicle>) {
  return (
    <div className="group overflow-hidden bg-white dark:bg-slate-900 transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-32 md:h-48 bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <img
          src={vehicle.img[0]}
          alt={vehicle.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {showStatus && (
          <span className="absolute left-3 top-3 bg-emerald-500 text-white text-[9px] md:text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
            Tersedia
          </span>
        )}
      </div>

      <div className="p-3 md:p-5">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="bg-primary text-white text-[9px] md:text-[10px] font-bold px-2 py-1 rounded-full">
            {vehicle.year}
          </span>

          <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[9px] md:text-[10px] font-bold px-2 py-1 rounded-full truncate">
            {vehicle.type}
          </span>
        </div>

        <h3 className="font-bold text-sm md:text-lg text-slate-900 dark:text-white line-clamp-2">
          {vehicle.name}
        </h3>

        <div className="grid grid-cols-2 gap-2 my-2 py-2">
          <div>
            <p className="text-[9px] text-slate-400 uppercase">KM</p>
            <p className="text-[10px] md:text-xs font-semibold text-slate-700 dark:text-slate-200">
              {vehicle.mileage.toLocaleString("id-ID")}
            </p>
          </div>

          <div>
            <p className="text-[9px] text-slate-400 uppercase">Trans</p>
            <p className="text-[10px] md:text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">
              {vehicle.transmission}
            </p>
          </div>
        </div>

        <div className="mb-5">
          <span className="text-[9px] text-slate-400 uppercase block">Mulai Dari</span>

          <div className="flex flex-wrap items-end gap-1">
            <span className="text-sm md:text-xl font-black text-slate-900 dark:text-white">
              {formatPrice(vehicle.daily_price)}
            </span>

            <span className="text-[10px] text-slate-500 mb-0.5">/hari</span>
          </div>
        </div>

        <Link
          href={`/vehicles/${vehicle.id}`}
          className="group/btn flex h-9 sm:h-9 xl:h-10 w-full items-center justify-center gap-2 rounded-xl text-sm bg-gradient-to-r from-primary to-[#2A4F7A] text-white font-semibold text-white transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
        >
          <span>Lihat Detail</span>

          <span className="material-symbols-outlined text-lg transition-transform duration-300 group-hover/btn:translate-x-1">
            arrow_forward
          </span>
        </Link>
      </div>
    </div>
  );
}
