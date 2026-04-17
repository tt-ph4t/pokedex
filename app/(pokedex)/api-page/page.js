import { mapValues } from "es-toolkit";

import { table } from "@/components";
import { Link } from "@/components/link";
import { tabs } from "@/components/tabs";
import { API_VERSION_PATH } from "@/misc/contants";
import { Pokedex } from "@/misc/pokedex-promise-v2";

export const revalidate = 0;

export default () => (
  <Pokedex
    canonical="/api-page"
    descriptions={{
      revalidate,
      versionPath: API_VERSION_PATH,
    }}
    title="API"
  >
    {tabs(
      mapValues(Pokedex.api.route.groups, (routes) =>
        tabs(
          mapValues(routes, async ({ rootEndpoint }, route) =>
            table.pagination((await Pokedex.api[rootEndpoint]()).data.results, {
              renderRows: ({ context }) => {
                const href = `/api/${route}?name=${encodeURIComponent(
                  context.name,
                )}`;

                return [<Link href={href}>{href}</Link>];
              },
            }),
          ),
        ),
      ),
    )}
  </Pokedex>
);
