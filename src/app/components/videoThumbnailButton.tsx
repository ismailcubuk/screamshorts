import Image from 'next/image';

interface VideoThumbnailButtonProps {
  videoThumbnails: string; 
  videoDurationText: string; 
  videoTitle: string;
}

const VideoThumbnailButton: React.FC<VideoThumbnailButtonProps> = ({
  videoThumbnails,
  videoDurationText,
  videoTitle,
}) => {
  return (
    <button className="relative group">
      <Image
        src={videoThumbnails}
        alt={videoTitle}
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
    </button>
  );
};

export default VideoThumbnailButton;
