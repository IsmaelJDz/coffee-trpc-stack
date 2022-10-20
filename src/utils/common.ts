export const setCookie = (locale: string) => {
  window.document.cookie = `NEXT_LOCALE=${locale}; max-age=31536000; path=/`;
};
