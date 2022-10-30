import { useRouter } from "next/router";
import React from "react";

import { setCookie } from "@/utils/index";

export function LanguageBar() {
  const router = useRouter();

  return (
    <div>
      <h3>Change Language</h3>
      <button
        onClick={() => {
          const locale = router.locale === "en" ? "es" : "en";
          setCookie(locale);
          router.push(router.asPath, undefined, { locale });
          // router.replace(router.pathname, router.pathname, { locale });
        }}
      >
        {router.locale === "en" ? "espanol" : "english"}
      </button>
    </div>
  );
}
