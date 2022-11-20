import "../styles/globals.css";
import "../styles/custom-alert.css";

import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { withTRPC } from "@trpc/next";
import type { AppProps } from "next/app";
import Router from "next/router";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";
import NProgress from "nprogress";
import { Toaster } from "react-hot-toast";
import superjson from "superjson";

import { url } from "@/constants/common";
import { AuthProvider } from "@/context/Auth";
import { MainProvider } from "@/context/Main";
import { AppRouter } from "@/server/route/app.route";

// import { trpc } from "@/utils/trpc";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  // const { data, error, isLoading } = trpc.useQuery(["users.me"]);

  // if (isLoading) {
  //   return <div>Loading user...</div>;
  // }

  return (
    <SessionProvider>
      <AuthProvider>
        <MainProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              className: "bg-white rounded-md border border-gray-300 shadow-xl text-sm",
              duration: 5000,
              style: {
                marginTop: "80px"
              }
            }}
          />
          <Component {...pageProps} />
        </MainProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
export default withTRPC<AppRouter>({
  config({ ctx }) {
    const links = [
      loggerLink(),
      httpBatchLink({
        maxBatchSize: 10,
        url
      })
    ];

    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5 // 5 minutes
          }
        }
      },
      headers() {
        if (ctx?.req) {
          return {
            ...ctx.req.headers,
            "x-ssr": "1"
          };
        }
        return {};
      },
      links,
      transformer: superjson
    };
  },
  ssr: true
})(appWithTranslation(MyApp));
