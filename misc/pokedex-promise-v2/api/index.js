import { uniqBy } from "es-toolkit";
import { get, isArray } from "es-toolkit/compat";
import { notFound } from "next/navigation";
import PokeAPI from "pokedex-promise-v2";
import React from "react";

import { API_VERSION_PATH } from "@/misc/contants";

import routeGroups from "./route-groups";

const pokeAPI = new PokeAPI({
  versionPath: API_VERSION_PATH,
});

const routes = Object.fromEntries(
  Object.values(routeGroups).flatMap(Object.entries),
);

const routeNames = Object.keys(routes);
const api = {};

for (const [route, endpoints] of Object.entries({
  ...routes,
  resource: {
    rootEndpoint: "getResource",
  },
}))
  for (const endpoint of Object.values(endpoints))
    api[endpoint] = React.cache(async (...args) => {
      try {
        const data = await pokeAPI[endpoint](...args);

        if (endpoint.endsWith("List") && isArray(data.results))
          if (["name", "url"].some((value) => value in data.results[0]))
            data.count = (data.results = uniqBy(
              data.results.map(({ name, ...rest }, index) => ({
                name: name ?? `${route}-${++index}`,
                ...rest,
              })),
              (item) => item.name,
            )).length;

        return {
          data,
        };
      } catch (error) {
        console.error(error);
        notFound();
      }
    });

export default {
  ...api,
  route: Object.assign(
    (...path) =>
      api[get(routes, path.length === 1 ? [...path, "rootEndpoint"] : path)],
    {
      configs: {
        dynamicParams: false,
        generateStaticParams: React.cache(() =>
          routeNames.map((route) => ({
            route,
          })),
        ),
      },
      groups: routeGroups,
      names: routeNames,
    },
  ),
};
