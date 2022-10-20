// import { useTranslation } from "react-i18next";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Layout } from "@/components/layout";
// import { Home } from "@/components/ui/Home";
// import { useAppContext } from "@/hooks/HomeContext";

/**
 *
 * @param {*} props initial props
 * @returns Component -> Principal
 */

export default function Main() {
  // const { t } = useTranslation("common");

  // const { loading, data } = useAppContext();
  return (
    <Layout title="Coffee Shop">
      {/* <p>{`${t("ourCoffee")}!`}</p> */}
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
