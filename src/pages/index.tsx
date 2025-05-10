import Link from "next/link";
import React from "react";
import "@/app/globals.css";
import { useVideoContext } from "@/app/context/VideoContext";
import ShortMovieList from "@/app/components/user/ShortMovieList";
import Banner from "@/app/components/user/Banner";

export default function index() {
  const { videoData } = useVideoContext();

  return (
    <div>
      <Link href="/admin">
        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          admin
        </button>
      </Link>
      <div>
        <div>{videoData.videoId}</div>
        <div>{videoData.videoThumbnails}</div>
        <div>{videoData.videoUrl}</div>
      </div>
      <Banner />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 border-2 border-blue-500">
        <ShortMovieList />
        <ShortMovieList />
        <ShortMovieList />
        <ShortMovieList />
        <ShortMovieList />
        <ShortMovieList />
        <ShortMovieList />
        <ShortMovieList />
      </div>
    </div>
  );
}
