import { encode } from "entities";

import { SITE } from "@/misc/contants";
import { Pokedex } from "@/misc/pokedex-promise-v2";

const withDefaultProps = ({ url, ...rest }) => ({
  changeFrequency: "yearly",
  lastModified: SITE.DATE,
  url: encode(url),
  ...rest,
});

export default async () => [
  ...Pokedex.api.route.names.map((route) =>
    withDefaultProps({
      url: `${SITE.URL}/${route}`,
    }),
  ),
  ...(
    await Promise.all(
      Pokedex.api.route.names.map(async (route) =>
        (await Pokedex.api.route(route, "rootEndpoint")()).data.results.map(
          (item) =>
            withDefaultProps({
              url: `${SITE.URL}/${route}/${item.name}`,
            }),
        ),
      ),
    )
  ).flat(),
];
