import { NextResponse } from "next/server";

import { Pokedex } from "@/misc/pokedex-promise-v2";

export const { dynamicParams, generateStaticParams } =
  Pokedex.api.route.configs;

export const GET = async (request, { params }) => {
  params = await params;

  const { data } = await Pokedex.api.route(params.route)();

  const item =
    data.results.find(
      (item) => item.name === request.nextUrl.searchParams.get("name"),
    ) ?? {};

  return NextResponse.json(
    "url" in item ? (await Pokedex.api.getResource(item.url)).data : data,
  );
};
