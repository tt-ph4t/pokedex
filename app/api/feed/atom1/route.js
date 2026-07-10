import { NextResponse } from "next/server";

import { Pokedex } from "@/misc/pokedex-promise-v2";

const atom1 = Pokedex.feed.atom1();

export const GET = () =>
  new NextResponse(atom1, {
    headers: new Headers({
      "content-type": "application/xml",
    }),
  });
