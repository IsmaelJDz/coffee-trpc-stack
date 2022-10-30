import "../styles/globals.css";

import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { withTRPC } from "@trpc/next";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";
import superjson from "superjson";

import { url } from "@/constants/common";
import { AuthProvider } from "@/context/Auth";
import { MainProvider } from "@/context/Main/index";
import { AppRouter } from "@/server/route/app.route";
// import { trpc } from "@/utils/trpc";

function MyApp({ Component, pageProps }: AppProps) {
  // const { data, error, isLoading } = trpc.useQuery(["users.me"]);

  // if (isLoading) {
  //   return <div>Loading user...</div>;
  // }

  return (
    <SessionProvider>
      <AuthProvider>
        <MainProvider>
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
