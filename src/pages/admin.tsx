"use client";

import "@/app/globals.css";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { iso8601ToSeconds, formatDuration } from "@/app/utils/time";
import { formatViewCount } from "@/app/utils/formatters";
import { getVideoId, fetchVideoData } from "@/app/lib/youtube";

export default function Test() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoThumbnails, setThumbnails] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoDurationText, setVideoDurationText] = useState("");
  const [viewCount, setViewCount] = useState<string>("");
  const [error, setError] = useState("");

const apiKey = process.env.NEXT_PUBLIC_API_KEY;


  const handleInputChange = (event) => {
    setVideoUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const videoId = getVideoId(videoUrl);
    console.log(process.env.NEXT_PUBLIC_API_KEY)
    if (videoId) {
      setLoading(true);
      setError("");
      try {
        const data = await fetchVideoData(videoId, apiKey);
        if (data.items && data.items.length > 0) {
          const videoDuration = data.items[0].contentDetails.duration;
          const rawViewCount = data.items[0].statistics.viewCount;
          const formattedViewCount = formatViewCount(parseInt(rawViewCount));
          setViewCount(formattedViewCount);

          const durationInSeconds = iso8601ToSeconds(videoDuration);
          const formattedDuration = formatDuration(durationInSeconds);
          setVideoDurationText(formattedDuration);

          setVideoTitle(data.items[0].snippet.title);
          setThumbnails(data.items[0].snippet.thumbnails.medium.url);
        } else {
          setError("Video bulunamadı.");
        }
      } catch (err) {
        setError("API hatası oluştu.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Geçerli bir YouTube URL’si girin.");
    }
  };

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
          value={videoUrl}
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
      {loading && <p>Yükleniyor...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {videoTitle && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          <div className="relative w-full h-auto sm:h-full sm:w-full md:h-[180px]">
            <div className="relative group">
              <Image
                src={videoThumbnails}
                alt="ScreamShort Logo"
                width={320}
                height={180}
                className="object-cover w-full h-full transition-all duration-300 ease-in-out"
              />

              {/* Hover efekti: Hafif beyaz transparan örtü */}
              <div className="absolute inset-0 bg-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Video Süresi */}
              <div className="absolute bottom-0 right-0 m-2 text-white font-semibold bg-black bg-opacity-50 p-1 rounded">
                {videoDurationText}
              </div>

              {/* Hoverda + işareti */}
              <button className="absolute inset-0 flex items-center justify-center text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                +
              </button>
            </div>

            {/* Video Süresi */}
          </div>

          <div className="relative w-full h-auto sm:h-full sm:w-full md:h-[180px]">
            <Link href={videoThumbnails}>
              <Image
                src={videoThumbnails}
                alt="ScreamShort Logo"
                width={320}
                height={180}
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 right-0 m-2 text-white font-semibold bg-black bg-opacity-50 p-1 rounded">
                {videoDurationText}
              </div>
            </Link>
            {/* Video Süresi */}
          </div>

          <div className="relative w-full h-auto sm:h-full sm:w-full md:h-[180px]">
            <Link href={videoThumbnails}>
              <Image
                src={videoThumbnails}
                alt="ScreamShort Logo"
                width={320}
                height={180}
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 right-0 m-2 text-white font-semibold bg-black bg-opacity-50 p-1 rounded">
                {videoDurationText}
              </div>
            </Link>
            {/* Video Süresi */}
          </div>

          <div className="relative w-full h-auto sm:h-full sm:w-full md:h-[180px]">
            <Link href={videoThumbnails}>
              <Image
                src={videoThumbnails}
                alt="ScreamShort Logo"
                width={320}
                height={180}
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 right-0 m-2 text-white font-semibold bg-black bg-opacity-50 p-1 rounded">
                {videoDurationText}
              </div>
            </Link>
            {/* Video Süresi */}
          </div>

          <div className="relative w-full h-auto sm:h-full sm:w-full md:h-[180px]">
            <Link href={videoThumbnails}>
              <Image
                src={videoThumbnails}
                alt="ScreamShort Logo"
                width={320}
                height={180}
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 right-0 m-2 text-white font-semibold bg-black bg-opacity-50 p-1 rounded">
                {videoDurationText}
              </div>
            </Link>
            {/* Video Süresi */}
          </div>

          <div>
            <h2 className="text-xl font-semibold">Video Başlığı:</h2>
            <p>{videoTitle}</p>
            <p>{videoDurationText}</p>
            <p>{viewCount}</p>
          </div>
        </div>
      )}
      <div></div>
    </div>
  );
}
