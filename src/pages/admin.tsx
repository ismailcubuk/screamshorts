"use client";

import "@/app/globals.css";
import { useState } from "react";
import Link from "next/link";
import { iso8601ToSeconds, formatDuration } from "@/app/utils/time";
import { formatViewCount } from "@/app/utils/formatters";
import { getVideoId, fetchVideoData } from "@/app/lib/youtube";
import VideoThumbnailButton from "@/app/components/videoThumbnailButton";

export default function Test() {
  const [videoData, setVideoData] = useState({
    videoUrl: "",
    videoTitle: "",
    videoThumbnails: "",
    videoDurationText: "",
    viewCount: "",
    error: "",
    loading: false,
  });

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoData((prevState) => ({
      ...prevState,
      videoUrl: event.target.value,
    }));
  };

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const videoId = getVideoId(videoData.videoUrl);

    if (videoId) {
      setVideoData((prevState) => ({
        ...prevState,
        loading: true,
        error: "",
      }));

      try {
        const data = await fetchVideoData(videoId, apiKey!);
        if (data.items && data.items.length > 0) {
          const videoDuration = data.items[0].contentDetails.duration;
          const rawViewCount = data.items[0].statistics.viewCount;
          const formattedViewCount = formatViewCount(parseInt(rawViewCount));

          const durationInSeconds = iso8601ToSeconds(videoDuration);
          const formattedDuration = formatDuration(durationInSeconds);

          setVideoData((prevState) => ({
            ...prevState,
            videoTitle: data.items[0].snippet.title,
            videoThumbnails: data.items[0].snippet.thumbnails.medium.url,
            videoDurationText: formattedDuration,
            viewCount: formattedViewCount,
            loading: false,
          }));
        } else {
          setVideoData((prevState) => ({
            ...prevState,
            error: "Video bulunamadı.",
            loading: false,
          }));
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setVideoData((prevState) => ({
          ...prevState,
          error: "API hatası oluştu.",
          loading: false,
        }));
      }
    } else {
      setVideoData((prevState) => ({
        ...prevState,
        error: "Geçerli bir YouTube URL’si girin.",
      }));
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
