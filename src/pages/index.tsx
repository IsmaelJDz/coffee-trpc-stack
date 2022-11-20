// import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Layout } from "@/components/layout/index";
// import { Home } from "@/components/ui/Home";

/**
 *
 * @param {*} props initial props
 * @returns Component -> Principal
 */

export default function Main() {
  // const { t } = useTranslation("common");

  return (
    <Layout title="Coffee Shop">
      {/* <p>{`${t("ourCoffee")}!`}</p> */}
      <h1>OurCoffee</h1>
      {/* <Carousel />
      <Info />
      <About />
      <AdCookie /> */}
    </Layout>
  );
}

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  };
};
