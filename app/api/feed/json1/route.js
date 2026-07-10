import { NextResponse } from "next/server";

import { Pokedex } from "@/misc/pokedex-promise-v2";

const json1 = JSON.parse(Pokedex.feed.json1());

export const GET = () => NextResponse.json(json1);
