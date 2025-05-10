// src/app/context/VideoContext.tsx
import { createContext, useState, useContext, ReactNode } from "react";
import { fetchVideoData, getVideoId } from "@/app/lib/youtube";
import { iso8601ToSeconds, formatDuration } from "@/app/utils/time";
import { formatViewCount } from "@/app/utils/formatters";

interface VideoContextProps {
  videoData: {
    videoId: ReactNode;
    videoUrl: string;
    videoTitle: string;
    videoThumbnails: string;
    videoDurationText: string;
    viewCount: string;
    error: string;
    loading: boolean;
  };
  setVideoData: React.Dispatch<React.SetStateAction<any>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const VideoContext = createContext<VideoContextProps | undefined>(undefined);

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideoContext must be used within a VideoProvider");
  }
  return context;
};

interface VideoProviderProps {
  children: ReactNode;
}

export const VideoProvider = ({ children }: VideoProviderProps) => {
  const [videoData, setVideoData] = useState({
    videoUrl: "",
    videoId:"",
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
        console.log(videoId);
          const videoDuration = data.items[0].contentDetails.duration;
          const rawViewCount = data.items[0].statistics.viewCount;
          const formattedViewCount = formatViewCount(parseInt(rawViewCount));
          const durationInSeconds = iso8601ToSeconds(videoDuration);
          const formattedDuration = formatDuration(durationInSeconds);

          setVideoData((prevState) => ({
            ...prevState,
            videoId,
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
    <VideoContext.Provider value={{ videoData, setVideoData, handleInputChange, handleSubmit }}>
      {children}
    </VideoContext.Provider>
  );
};
