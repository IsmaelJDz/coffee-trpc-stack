const path = require("path");

module.exports = {
  i18n: {
    /**
     * This is the default locale you want to be used when visiting
     * a non-locale prefixed path.
     */
    defaultLocale: "es",
    /**
     * Provide the locales you want to support in your application
     */
    locales: ["en", "es"],
    /**
     * Automatic detection
     */
    localeDetection: false,

    localePath: path.resolve("./public/locales")
  }
};
