import { notFound } from "next/navigation";

import { Pokedex } from "@/misc/pokedex-promise-v2";

// Breadcrumbs
// https://nextjs.org/docs/app/api-reference/functions/use-selected-layout-segments

export const { generateStaticParams } = Pokedex.api.route.configs;

export default async ({ children, params }) => {
  if (Pokedex.api.route.names.includes((await params).route)) return children;
  else notFound();
};
