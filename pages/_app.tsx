import "../styles/globals.css";
import ApiService from "../services/api/index.services";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { Auth0Provider } from "@auth0/auth0-react";
ApiService.init("https://api.themoviedb.org/3/");
ApiService.setHeader();

const queryClient = new QueryClient();
const domain = process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL
const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Auth0Provider
          domain={`${domain}`}
          clientId={`${clientId}`}
          redirectUri={"/"}
        >
          <Component {...pageProps} />;
        </Auth0Provider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp;
