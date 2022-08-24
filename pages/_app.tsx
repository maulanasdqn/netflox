import "../styles/globals.css";
import ApiService from "../services/api/index.services";
ApiService.init("https://api.themoviedb.org/3/");
ApiService.setHeader();
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
