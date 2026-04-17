import { noop } from "es-toolkit";
import { DocsBody, DocsDescription, DocsTitle } from "fumadocs-ui/page";

import { getOgUrl } from "@/misc";
import { titleCase } from "@/misc/title-case";

import { SITE } from "../contants";
import api from "./api";

export const Pokedex = Object.assign(
  ({
    canonical,
    children,
    descriptions,
    favicon,
    ogUrl,
    renderTitle = noop,
    title,
  }) => {
    children = <DocsBody>{children}</DocsBody>;

    if (canonical) {
      ogUrl ??= getOgUrl({ title });

      return (
        <>
          <title>{title}</title>
          <link href={favicon} rel="icon" />
          <link href={`${SITE.URL}${canonical}`} rel="canonical" />
          <meta content="article" property="og:type" />
          <meta content="summary_large_image" property="twitter:card" />
          <meta
            content={SITE.DATE.toISOString()}
            property="article:modified_time"
          />
          <meta content={ogUrl} property="og:image" />
          <meta content={ogUrl} property="twitter:image" />
          <meta content={title} property="og:title" />
          <meta content={title} property="twitter:title" />
          <div
            style={{
              position: "relative",
            }}
          >
            <div
              style={{
                "--letter-spacing": "-.1ch",

                position: "sticky",
              }}
            >
              <DocsTitle
                style={{
                  letterSpacing: "var(--letter-spacing)",
                }}
              >
                {renderTitle() ?? title}
              </DocsTitle>
              <DocsDescription
                style={{
                  display: "flex",
                  fontSize: "var(--text-sm)",
                  gap: "calc(var(--spacing) * 3)",
                  letterSpacing: "var(--letter-spacing)",
                  overflowX: "auto",
                }}
              >
                {Object.entries({
                  ...descriptions,
                  at: (
                    <time
                      dateTime={SITE.DATE.toISOString()}
                      title={SITE.DATE.toISOString()}
                    >
                      {SITE.DATE.toDateString()}
                    </time>
                  ),
                }).map((description, index) => (
                  <span key={index}>
                    {titleCase(description[0])}
                    <span
                      style={{
                        color: "var(--color-fd-foreground)",
                        display: "block",
                        textWrap: "nowrap",
                      }}
                    >
                      {description[1]}
                    </span>
                  </span>
                ))}
              </DocsDescription>
            </div>
            {children}
          </div>
        </>
      );
    }

    return children;
  },
  {
    api,
  },
);
