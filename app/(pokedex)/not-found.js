import { Callout } from "fumadocs-ui/components/callout";

import { Pokedex } from "@/misc/pokedex-promise-v2";

export default () => (
  <Pokedex.Page>
    <Callout title="404" type="error">
      This page could not be found.
    </Callout>
  </Pokedex.Page>
);
