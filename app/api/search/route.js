import { createSearchAPI } from "fumadocs-core/search/server";

import names from "@/app/api/names/data.json";
import { titleCase } from "@/misc/title-case";

const options = {
  indexes: Object.entries(names).flatMap(([a, b]) => {
    const breadcrumbs = [titleCase(a)];

    return b.map((b) => ({
      breadcrumbs,
      title: titleCase(b),
      url: `/${a}/${b}`,
    }));
  }),
};

// https://github.com/fuma-nama/fumadocs/blob/304204a38455f103b430bd8ea6fbdcc64ac4ad2f/packages/core/src/search/server.ts#L101
export const { GET } = createSearchAPI("simple", options);
