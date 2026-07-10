import { SITE } from "@/misc/contants";

export const getOgUrl = (searchParams) => {
  const url = new URL(`${SITE.URL}/api/og`);

  for (const [name, value] of Object.entries(searchParams))
    url.searchParams.set(name, value);

  return url.toString();
};
