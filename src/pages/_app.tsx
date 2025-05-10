import { AppProps } from "next/app";
import { VideoProvider } from "@/app/context/VideoContext"; 

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <VideoProvider>
      <Component {...pageProps} />
    </VideoProvider>
  );
}

export default MyApp;
