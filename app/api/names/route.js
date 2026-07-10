import { NextResponse } from "next/server";
import fs from "node:fs";

import { Pokedex } from "@/misc/pokedex-promise-v2";

export const GET = async () => {
  const data = await Pokedex.api.route.names.reduce(async (a, b) => {
    (a = await a)[b] = (await Pokedex.api.route(b)()).data.results.map(
      (item) => item.name,
    );

    return a;
  }, {});

  fs.writeFileSync("app/api/names/data.json", JSON.stringify(data));

  return NextResponse.json(data);
};
