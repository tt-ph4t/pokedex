import { sum } from "es-toolkit";
import { size } from "es-toolkit/compat";

import { Chart } from "@/components/chart";
import { tabs } from "@/components/tabs";
import { Pokedex } from "@/misc/pokedex-promise-v2";

import search from "./search";

export default async () => (
  <Pokedex
    canonical="/"
    descriptions={{
      groups: size(Pokedex.api.route.groups),
      routes: Pokedex.api.route.names.length,
      // eslint-disable-next-line perfectionist/sort-objects
      pages: sum(
        await Promise.all(
          Pokedex.api.route.names.map(
            async (route) =>
              (await Pokedex.api.route(route, "rootEndpoint")()).data.count,
          ),
        ),
      ),
    }}
    title="Home"
  >
    {tabs({
      search,
      // eslint-disable-next-line perfectionist/sort-objects
      chart: (
        <Chart
          series={[
            {
              data: await Promise.all(
                Pokedex.api.route.names.map(async (route) => ({
                  name: route,
                  y: (await Pokedex.api.route(route, "rootEndpoint")()).data
                    .count,
                })),
              ),
              options: { name: "Page" },
              type: "pie",
            },
          ]}
        />
      ),
    })}
  </Pokedex>
);
