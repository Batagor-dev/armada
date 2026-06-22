"use client";

import { useState } from "react";

export default function VehicleGallery({
  images,
}: {
  images: string[];
}) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div>
      {/* Gambar Utama */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
        <img
          src={images[activeImage]}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* Thumbnail */}
      <div className="mt-3 flex gap-2 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            className={`overflow-hidden rounded-lg border-2 ${
              activeImage === index
                ? "border-primary"
                : "border-transparent"
            }`}
          >
            <img
              src={image}
              alt=""
              className="h-20 w-20 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}