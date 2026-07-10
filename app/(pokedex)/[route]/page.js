import { notFound } from "next/navigation";

import { table } from "@/components";
import { Link } from "@/components/client";
import { getOgUrl } from "@/misc";
import { Pokedex } from "@/misc/pokedex-promise-v2";
import { titleCase } from "@/misc/title-case";

import Search from "./search";

export default async ({ params }) => {
  params = await params;

  if (Pokedex.api.route.names.includes(params.route)) {
    const title = `${titleCase(`${params.route} list`)}`;
    const { data } = await Pokedex.api.route(params.route)();
    const names = data.results.map((item) => item.name);

    return (
      <Pokedex.Page
        canonical={`/${params.route}`}
        descriptions={{
          count: data.count,
          links: <Link href={`/random/${params.route}`}>Random</Link>,
        }}
        ogUrl={getOgUrl({
          title,
          topic: data.count,
        })}
        renderTitle={() => (
          <>
            {titleCase(params.route)}{" "}
            <span
              style={{
                color: "var(--color-fd-muted-foreground)",
              }}
            >
              List
            </span>
          </>
        )}
        title={title}
      >
        <Search
          docs={names}
          fallback={table.pagination(names, {
            renderCells: ({ context }) => (
              <Link href={`/${params.route}/${context}`}>
                {titleCase(context)}
              </Link>
            ),
          })}
        />
      </Pokedex.Page>
    );
  } else notFound();
};
