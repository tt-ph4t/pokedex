import { Pokedex } from "@/misc/pokedex-promise-v2";

import RandomRedirect from "./random-redirect";

export const { dynamicParams, generateStaticParams } =
  Pokedex.api.route.configs;

export default async ({ params }) => {
  params = await params;

  return (
    <Pokedex.Page>
      <RandomRedirect
        hrefs={(await Pokedex.api.route(params.route)()).data.results.map(
          (item) => `/${params.route}/${item.name}`,
        )}
      />
    </Pokedex.Page>
  );
};
