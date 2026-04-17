import { Callout } from "fumadocs-ui/components/callout";

import { Pathname, RouterActions } from "@/components/client";
import { HORIZONTAL_ELLIPSIS_SYMBOL } from "@/misc/contants";
import { Pokedex } from "@/misc/pokedex-promise-v2";

export default () => (
  <Pokedex>
    <Callout title={`Loading${HORIZONTAL_ELLIPSIS_SYMBOL}`}>
      <Pathname />
      <RouterActions />
    </Callout>
  </Pokedex>
);
