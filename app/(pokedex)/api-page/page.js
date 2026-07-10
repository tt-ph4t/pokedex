import { mapValues } from "es-toolkit";

import { table } from "@/components";
import { Link } from "@/components/client";
import { tabs } from "@/components/tabs";
import { API_VERSION_PATH } from "@/misc/contants";
import { Pokedex } from "@/misc/pokedex-promise-v2";

export default () => (
  <Pokedex.Page
    canonical="/api-page"
    descriptions={{
      versionPath: API_VERSION_PATH,
    }}
    title="API"
  >
    {tabs(
      mapValues(Pokedex.api.route.groups, (routes) =>
        tabs(
          mapValues(routes, async ({ rootEndpoint }, route) =>
            table.pagination((await Pokedex.api[rootEndpoint]()).data.results, {
              renderCells: ({ context }) => {
                const href = `/api/${route}?name=${encodeURIComponent(
                  context.name,
                )}`;

                return <Link href={href}>{href}</Link>;
              },
            }),
          ),
        ),
      ),
    )}
  </Pokedex.Page>
);
