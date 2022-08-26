import "../styles/globals.css";
import ApiService from "../services/api/index.services";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { Loading } from "../components/Common/Loading";
import { Suspense } from "react";
ApiService.init(process.env.NEXT_PUBLIC_API_URL);
ApiService.setHeader();

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Suspense fallback={<Loading />}>
          <Component {...pageProps} />;
        </Suspense>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp;
