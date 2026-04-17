import { NextResponse } from "next/server";

import { Pokedex } from "@/misc/pokedex-promise-v2";

export const GET = () => NextResponse.json(Pokedex.api.route.names);
