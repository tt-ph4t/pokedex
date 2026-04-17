import { notFound } from "next/navigation";

import { Pokedex } from "@/misc/pokedex-promise-v2";

export const generateStaticParams = () =>
  Pokedex.api.route.names.map((route) => ({ route }));

export default async ({ children, params }) => {
  if (Pokedex.api.route.names.includes((await params).route)) return children;
  else notFound();
};
