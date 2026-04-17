import { SITE } from "@/misc/contants";

export default () => ({
  host: SITE.URL,
  rules: {
    allow: "/",
    userAgent: "*",
  },
  sitemap: `${SITE.URL}/sitemap.xml`,
});
