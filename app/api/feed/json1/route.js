import { NextResponse } from "next/server";

import { feed } from "@/misc/pokedex-promise-v2/feed";

export const GET = () => NextResponse.json(JSON.parse(feed.json1()));
