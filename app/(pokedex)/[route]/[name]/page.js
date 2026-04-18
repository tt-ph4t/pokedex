import Cycled from "cycled";
import { pick } from "es-toolkit";
import { Callout } from "fumadocs-ui/components/callout";
import { notFound } from "next/navigation";
import React from "react";

import { list } from "@/components";
import { Link } from "@/components/link";
import { getOgUrl } from "@/misc";
import { Pokedex } from "@/misc/pokedex-promise-v2";
import { titleCase } from "@/misc/title-case";

import HotkeysLink from "./hotkeys-link";
import pages from "./pages";
import { Avatar } from "./pages/misc";

export const generateStaticParams = async ({ params }) =>
  Iterator.from(
    (await Pokedex.api.route(params.route, "rootEndpoint")()).data.results,
  )
    .map((item) => ({ name: item.name }))
    .take(pages[params.route].limit);

export default async ({ params }) => {
  params = await params;

  params.name =
    // /move-category/damage%2Braise > /move-category/damage+raise
    decodeURIComponent(params.name);

  const { data } = await Pokedex.api.route(params.route, "rootEndpoint")();
  const names = data.results.map((item) => item.name);

  if (names.includes(params.name)) {
    const page = pages[params.route];
    const cycled = new Cycled(names);
    const index = names.findIndex((name) => name === params.name);
    const item = data.results[index];

    cycled.index = index;

    const context = {
      data: (await Pokedex.api.getResource(item.url)).data,
      index,
    };

    const avatarSrc = page.getAvatarSrc({ context });
    const [nextName, previousName] = [cycled.peek(1), cycled.peek(-1)];

    return (
      <>
        {avatarSrc && (
          <Avatar
            src={avatarSrc}
            style={{
              alignSelf: "center",
              margin: "unset",
              position: "fixed",
            }}
          />
        )}
        <Pokedex
          canonical={`/${params.route}/${params.name}`}
          descriptions={{
            index: (
              <>
                {index + 1}
                <span style={{ color: "var(--color-fd-muted-foreground)" }}>
                  /{data.count}
                </span>
              </>
            ),
            ...pick(context.data, ["game_index", "id", "order"]),
            previous: (
              <HotkeysLink
                href={`/${params.route}/${previousName}`}
                keys="left"
              >
                {titleCase(previousName)}
              </HotkeysLink>
            ),
            // eslint-disable-next-line perfectionist/sort-objects
            next: (
              <HotkeysLink href={`/${params.route}/${nextName}`} keys="right">
                {titleCase(nextName)}
              </HotkeysLink>
            ),
            // eslint-disable-next-line perfectionist/sort-objects
            links: list.inline(
              <Link href={`/${params.route}`}>List</Link>,
              <Link href={`/random/${params.route}`}>Random</Link>,
              <Link href={item.url}>API</Link>,
            ),
          }}
          favicon={page.getFavicon({ context })}
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
                {titleCase(params.route)}
                {")"}
              </span>
            </>
          )}
          title={`${titleCase(params.name)} (${titleCase(params.route)})`}
        >
          {(await generateStaticParams({ params })).some(
            (param) => param.name === params.name,
          ) || (
            <Callout
              title={`Static limit exceeded (${page.limit})`}
              type="warn"
            >
              This page wasn’t pre-generated because it exceeds the static
              limit.
            </Callout>
          )}
          <React.Activity>{await page.render({ context })}</React.Activity>
        </Pokedex>
      </>
    );
  } else notFound();
};
