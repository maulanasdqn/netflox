import "../styles/globals.css";
import ApiService from "../services/api/index.services";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
ApiService.init("https://api.themoviedb.org/3/");
ApiService.setHeader();

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Component {...pageProps} />;
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp;
