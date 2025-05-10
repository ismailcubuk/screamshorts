// src/pages/test.tsx
"use client";

import "@/app/globals.css";
import Link from "next/link";
import { useVideoContext } from "@/app/context/VideoContext";
import VideoThumbnailButton from "@/app/components/videoThumbnailButton";

export default function Test() {
  const { videoData, handleInputChange, handleSubmit } = useVideoContext();

  return (
    <div className="container mx-auto p-4">
      <Link href="/">
        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Anasayfaya Git
        </button>
      </Link>
      <h1 className="text-2xl font-bold mb-4">YouTube Video Başlığı Çekme</h1>
      <div>https://www.youtube.com/watch?v=Pj-2QVYe8yQ</div>

      {/* Input alanı */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={videoData.videoUrl}
          onChange={handleInputChange}
          className="border p-2 w-full"
          placeholder="YouTube video linkini buraya yapıştırın"
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white p-2 w-full"
        >
          Başlık Al
        </button>
      </form>

      {/* Başlık gösterimi */}
      {videoData.loading && <p>Yükleniyor...</p>}
      {videoData.error && <p className="text-red-500">{videoData.error}</p>}
      {videoData.videoTitle && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          <VideoThumbnailButton
            videoThumbnails={videoData.videoThumbnails}
            videoDurationText={videoData.videoDurationText}
            videoTitle={videoData.videoTitle}
          />
          <div> {videoData.videoId} </div>
          {/* <iframe
            width="320"
            height="180"
            src={`https://www.youtube.com/embed/${videoData.videoId}`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-full"
          /> */}
          <div>
            <h2 className="text-xl font-semibold">Video Başlığı:</h2>
            <p>{videoData.videoTitle}</p>
            <p>{videoData.videoDurationText}</p>
            <p>{videoData.viewCount}</p>
          </div>
        </div>
      )}
    </div>
  );
}
