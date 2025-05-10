"use client";

import Image from "next/image";
import Link from "next/link";
import { useVideoContext } from "@/app/context/VideoContext";

export default function Home() {
    const { videoData } = useVideoContext();

  return (
    <div>
      <div>
        {videoData.videoId}
        {videoData.videoThumbnails}
        {videoData.videoUrl}
      </div>
      <div className=" flex flex-col">
        <Link href="/admin">
          <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            admin
          </button>
        </Link>
        {/* Üst Kısım: 5/8 Oranı */}
        <div className="h-[calc(5/8*100vh)] relative">
          {/* ScreamShort Görseli */}
          <Image
            src="/images/logo/ScreamShort.png"
            alt="ScreamShort Logo"
            width={100}
            height={100}
            className="absolute left-10 top-5 z-10"
          />
          {/* movie1 Görseli Full Genişlikte */}
          <div className="w-full h-full relative">
            {/* Arka plan görseli */}
            <Image
              src="/images/logo/movie1.jpg"
              alt="movie1"
              layout="fill"
              objectFit="cover"
            />
            {/* Soldan siyah başlayıp sağa doğru şeffaflaşan overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/50 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/100" />
          </div>
        </div>
        {/* Alt Kısım: 3/8 Oranı */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          <div className="relative w-full aspect-[16/9] bg-blue-600 rounded overflow-hidden">
            <div className="absolute bottom-1 right-1 text-xs bg-black/70 text-white px-1 py-0.5 rounded">
              12:34
            </div>
          </div>
          <div className="relative w-full aspect-[16/9] bg-blue-600 rounded overflow-hidden">
            <div className="absolute bottom-1 right-1 text-xs bg-black/70 text-white px-1 py-0.5 rounded">
              12:34
            </div>
          </div>
          <div className="relative w-full aspect-[16/9] bg-blue-600 rounded overflow-hidden">
            <div className="absolute bottom-1 right-1 text-xs bg-black/70 text-white px-1 py-0.5 rounded">
              12:34
            </div>
          </div>
          <div className="relative w-full aspect-[16/9] bg-blue-600 rounded overflow-hidden">
            <div className="absolute bottom-1 right-1 text-xs bg-black/70 text-white px-1 py-0.5 rounded">
              12:34
            </div>
          </div>
          <div className="relative w-full aspect-[16/9] bg-blue-600 rounded overflow-hidden">
            <div className="absolute bottom-1 right-1 text-xs bg-black/70 text-white px-1 py-0.5 rounded">
              12:34
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
