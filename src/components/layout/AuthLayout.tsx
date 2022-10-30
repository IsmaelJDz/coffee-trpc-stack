import Head from "next/head";
import React from "react";

type Props = {
  title: string;
  children: React.ReactNode | React.ReactNode[];
};

export function AuthLayout({ title, children }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main>
        <div className="flex justify-center items-center md:h-[calc(100vh - 200px)]">{children}</div>
      </main>
    </>
  );
}
