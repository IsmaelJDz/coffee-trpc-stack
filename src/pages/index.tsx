// import { useTranslation } from "react-i18next";
import { useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Layout } from "@/components/layout/index";
// import { Home } from "@/components/ui/Home";
import { useAuthContext } from "@/context/index";

/**
 *
 * @param {*} props initial props
 * @returns Component -> Principal
 */

// TODO: Register/Login page layout, Button component
// TODO: Auth / Login --> Models, DB, Roles, HOC form
// TODO: checks context with trpc, validate password secure

export default function Main() {
  const { data } = useSession();
  console.log("data session", data);
  // const { t } = useTranslation("common");

  const { logoutUser } = useAuthContext();
  return (
    <Layout title="Coffee Shop">
      {/* <p>{`${t("ourCoffee")}!`}</p> */}
      <h1>OurCoffee</h1>
      <button onClick={logoutUser}>Logout</button>
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
