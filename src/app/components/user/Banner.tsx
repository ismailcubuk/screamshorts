import React from "react";
import Image from "next/image";

export default function Banner() {
  return (
    <div className="h-[calc(5/8*100vh)] relative">
      {/* ScreamShort Logo */}
      <Image
        src="/images/logo/ScreamShort.png"
        alt="ScreamShort Logo"
        width={100}
        height={100}
        className="absolute left-10 top-5 z-10"
      />
      {/* movie Görseli Full Genişlikte */}
      <div className="w-full h-full relative">
        <Image
          src="/images/logo/movie1.jpg"
          alt="movie1"
          layout="fill"
          objectFit="cover"
            objectPosition="top"
        />
        {/*Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/50 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/100" />
      </div>
    </div>
  );
}
