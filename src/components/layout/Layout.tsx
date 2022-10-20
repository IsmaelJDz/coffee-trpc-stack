import { FC } from "react";
import Head from "next/head";
import { Header } from "@/components/website";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  imageFullUrl?: string;
  pageDescription?: string;
  title: string;
}

export const Layout: FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
  return (
    <>
      <Head>
        <title> {title} </title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={pageDescription} />
        {imageFullUrl && <meta property="og:image" content={imageFullUrl} />}
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>

      {/* <LanguageBar /> */}
      <Header />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
};
