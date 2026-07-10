import Cycled from "cycled";
import { pick } from "es-toolkit";
import { Callout } from "fumadocs-ui/components/callout";
import { notFound } from "next/navigation";

import { list } from "@/components";
import { Link } from "@/components/client";
import { getOgUrl } from "@/misc";
import { Pokedex } from "@/misc/pokedex-promise-v2";
import { titleCase } from "@/misc/title-case";

import pageMap from "./page-map";
import { Avatar } from "./page-map/misc";

export const generateStaticParams = async ({ params }) =>
  Iterator.from((await Pokedex.api.route(params.route)()).data.results)
    .map((item) => ({
      name: item.name,
    }))
    .take(pageMap[params.route].limit)
    .toArray();

export default async ({ params }) => {
  params = await params;

  params.name =
    // /move-category/damage%2Braise > /move-category/damage+raise
    decodeURIComponent(params.name);

  const { data } = await Pokedex.api.route(params.route)();
  const names = data.results.map((item) => item.name);

  if (names.includes(params.name)) {
    const page = pageMap[params.route];
    const cycled = new Cycled(names);
    const index = names.findIndex((name) => name === params.name);
    const item = data.results[index];

    cycled.index = index;

    const context = {
      data: (await Pokedex.api.getResource(item.url)).data,
      index,
      ...item,
    };

    const avatarSrc = page.getAvatarSrc({
      context,
    });

    const [nextName, previousName] = [cycled.peek(1), cycled.peek(-1)];

    return (
      <>
        {avatarSrc && (
          <Avatar
            src={avatarSrc}
            style={{
              alignSelf: "center",
              margin: "unset",
              paddingTop: "var(--fd-nav-height)",
              position: "fixed",
            }}
          />
        )}
        <Pokedex.Page
          canonical={`/${params.route}/${params.name}`}
          favicon={page.getFavicon({
            context,
          })}
          leftDescriptions={{
            index: (
              <>
                {index + 1}
                <span
                  style={{
                    color: "var(--color-fd-muted-foreground)",
                  }}
                >
                  /{data.count}
                </span>
              </>
            ),
            ...pick(context.data, ["game_index", "id", "order"]),
            links: list.inline(
              <Link href={`/${params.route}`}>List</Link>,
              <Link href={`/random/${params.route}`}>Random</Link>,
              <Link href={item.url}>API</Link>,
            ),
          }}
          ogUrl={getOgUrl({
            title: titleCase(params.name),
            topic: titleCase(params.route),
          })}
          renderTitle={() => (
            <>
              {titleCase(params.name)}
              <span
                style={{
                  color: "var(--color-fd-muted-foreground)",
                }}
              >
                {" ("}
                {titleCase(params.route)})
              </span>
            </>
          )}
          rightDescriptions={{
            previous: (
              <Link href={`/${params.route}/${previousName}`}>
                {titleCase(previousName)}
              </Link>
            ),
            // eslint-disable-next-line perfectionist/sort-objects
            next: (
              <Link href={`/${params.route}/${nextName}`}>
                {titleCase(nextName)}
              </Link>
            ),
          }}
          title={`${titleCase(params.name)} (${titleCase(params.route)})`}
        >
          {(
            await generateStaticParams({
              params,
            })
          ).some((param) => param.name === params.name) || (
            <Callout
              title={`This page is not pre-rendered (limit: ${page.limit})`}
              type="warn"
            />
          )}
          {await page.render({
            context,
          })}
        </Pokedex.Page>
      </>
    );
  } else notFound();
};
