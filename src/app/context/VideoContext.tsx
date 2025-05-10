// context/videoContext.tsx
import { createContext, useState, useContext, ReactNode } from "react";

// Video verisinin tipi
interface VideoData {
  videoUrl: string;
  videoTitle: string;
  videoThumbnails: string;
  videoDurationText: string;
  viewCount: string;
  error: string;
  loading: boolean;
}

// Context tipi
interface VideoContextType {
  videoData: VideoData;
  setVideoState: (newState: Partial<VideoData>) => void;
}

// Varsayılan değer
const defaultVideoData: VideoData = {
  videoUrl: "",
  videoTitle: "",
  videoThumbnails: "",
  videoDurationText: "",
  viewCount: "",
  error: "",
  loading: false,
};

// Context oluştur
const VideoContext = createContext<VideoContextType>({
  videoData: defaultVideoData,
  setVideoState: () => {},
});

// Hook
export const useVideoContext = () => useContext(VideoContext);

// Provider tipi
interface VideoProviderProps {
  children: ReactNode;
}

// Provider bileşeni
export const VideoProvider = ({ children }: VideoProviderProps) => {
  const [videoData, setVideoData] = useState<VideoData>(defaultVideoData);

  const setVideoState = (newState: Partial<VideoData>) => {
    setVideoData((prevState) => ({ ...prevState, ...newState }));
  };

  return (
    <VideoContext.Provider value={{ videoData, setVideoState }}>
      {children}
    </VideoContext.Provider>
  );
};
