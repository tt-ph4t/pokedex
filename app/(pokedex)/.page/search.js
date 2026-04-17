"use client";

import { mapValues } from "es-toolkit";

import { table } from "@/components";
import { FuzzySearch } from "@/components/fuzzy-search";
import { Link } from "@/components/link";
import { tabs } from "@/components/tabs";
import { Pokedex } from "@/misc/pokedex-promise-v2";
import { titleCase } from "@/misc/title-case";

const docs = [];

for (const [routeGroup, routes] of Object.entries(Pokedex.api.route.groups))
  for (const [route, { rootEndpoint }] of Object.entries(routes))
    for (const item of (await Pokedex.api[rootEndpoint]()).data.results)
      docs.push({
        name: item.name,
        route: {
          group: routeGroup,
          name: route,
        },
      });

const fuse = FuzzySearch.createFuse(docs, {
  keys: [
    {
      name: "name",
      weight: 0.4,
    },
    {
      name: "route.name",
      weight: 0.3,
    },
    {
      name: "route.group",
      weight: 0.3,
    },
  ],
});

const fallback = tabs(
  mapValues(Pokedex.api.route.groups, (routes) =>
    tabs(
      mapValues(routes, async ({ rootEndpoint }, route) =>
        table.pagination((await Pokedex.api[rootEndpoint]()).data.results, {
          renderRows: ({ context }) => [
            <Link href={`/${route}/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        }),
      ),
    ),
  ),
);

const render = ({ fuseResult }) =>
  tabs(
    mapValues(fuseResult, (a) =>
      tabs(
        mapValues(a, (a, b) =>
          table.pagination(a, {
            renderRows: ({ context }) => [
              <Link href={`/${b}/${context}`}>{titleCase(context)}</Link>,
            ],
          }),
        ),
      ),
    ),
  );

const select = ({ fuseResult }) =>
  fuseResult.reduce((a, b) => {
    ((a[b.item.route.group] ??= {})[b.item.route.name] ??= []).push(
      b.item.name,
    );

    return a;
  }, {});

export default (
  <FuzzySearch
    fallback={fallback}
    fuse={fuse}
    render={render}
    select={select}
  />
);
