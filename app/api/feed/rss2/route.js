import { NextResponse } from "next/server";

import { Pokedex } from "@/misc/pokedex-promise-v2";

const rss2 = Pokedex.feed.rss2();

export const GET = () =>
  new NextResponse(rss2, {
    headers: new Headers({
      "content-type": "application/xml",
    }),
  });
