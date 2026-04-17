import { NextResponse } from "next/server";

import { GET as fallback } from "@/app/api/route";
import { Pokedex } from "@/misc/pokedex-promise-v2";

export const dynamic = "force-dynamic";

export const GET = async (request, { params }) => {
  params = await params;

  if (Pokedex.api.route.names.includes(params.route)) {
    const { data } = await Pokedex.api.route(params.route, "rootEndpoint")();

    const item =
      data.results.find(
        (item) => item.name === request.nextUrl.searchParams.get("name"),
      ) ?? {};

    return NextResponse.json(
      "url" in item ? (await Pokedex.api.getResource(item.url)).data : data,
    );
  }

  return fallback();
};
