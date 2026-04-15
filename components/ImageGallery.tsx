"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  images: string[];
}

const ImageGallery = ({ images }: Props) => {
  const [bigImage, setBigImage] = useState(images[0]);

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      {/* thumbnails */}
      <div className="order-last flex gap-4 lg:order-0 lg:flex-col">
        {images.map((image, index) => (
          <div
            key={index}
            className="overflow-hidden max-sm:size-30 rounded-lg bg-gray-100"
          >
            <Image
              src={image}
              width={200}
              height={200}
              alt="product image"
              className="h-full w-full object-cover cursor-pointer"
              onClick={() => setBigImage(image)}
            />
          </div>
        ))}
      </div>

      {/* big image */}
      <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
        <Image
          src={bigImage}
          width={500}
          height={500}
          alt="product image"
          className="h-full w-full object-cover"
        />

        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase text-white">
          Sale
        </span>
      </div>
    </div>
  );
};

export default ImageGallery;
