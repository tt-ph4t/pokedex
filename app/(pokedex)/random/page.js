import { mapValues } from "es-toolkit";

import { table } from "@/components";
import { Link } from "@/components/client";
import { tabs } from "@/components/tabs";
import { Pokedex } from "@/misc/pokedex-promise-v2";

export default () => (
  <Pokedex.Page canonical="/random" title="Random">
    {tabs(
      mapValues(Pokedex.api.route.groups, (routes) =>
        table.pagination(Object.keys(routes), {
          renderCells: ({ context }) => {
            const href = `/random/${context}`;

            return <Link href={href}>{href}</Link>;
          },
        }),
      ),
    )}
  </Pokedex.Page>
);
