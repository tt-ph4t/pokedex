import { notFound } from "next/navigation";

import { Pokedex } from "@/misc/pokedex-promise-v2";

import RandomRedirect from "./random-redirect";

export default async ({ params }) => {
  params = await params;

  if (Pokedex.api.route.names.includes(params.route))
    return (
      <Pokedex>
        <RandomRedirect
          hrefs={(
            await Pokedex.api.route(params.route, "rootEndpoint")()
          ).data.results.map((item) => `/${params.route}/${item.name}`)}
        />
      </Pokedex>
    );
  else notFound();
};
