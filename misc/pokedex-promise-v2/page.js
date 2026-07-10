import { noop } from "es-toolkit";
import { DocsBody, DocsDescription, DocsTitle } from "fumadocs-ui/page";

import { getOgUrl } from "@/misc";
import { SITE } from "@/misc/contants";
import { titleCase } from "@/misc/title-case";

const defaultDescriptions = {
  at: (
    <time dateTime={SITE.DATE.toISOString()} title={SITE.DATE.toISOString()}>
      {SITE.DATE.toDateString()}
    </time>
  ),
};

const renderDescriptions = (descriptions = {}) => (
  <span
    style={{
      display: "flex",
      gap: "calc(var(--spacing) * 3)",
    }}
  >
    {Object.entries(descriptions).map(([a, b], c) => (
      <span key={c}>
        {titleCase(a)}
        <span
          style={{
            color: "var(--color-fd-foreground)",
            display: "block",
            textWrap: "nowrap",
          }}
        >
          {b}
        </span>
      </span>
    ))}
  </span>
);

export default ({
  canonical,
  children,
  descriptions,
  favicon,
  leftDescriptions,
  ogUrl,
  renderTitle = noop,
  rightDescriptions,
  title,
}) => {
  children = <DocsBody>{children}</DocsBody>;

  if (canonical) {
    ogUrl ??= getOgUrl({
      title,
    });

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
                justifyContent: "space-between",
                letterSpacing: "var(--letter-spacing)",
                overflowX: "auto",
              }}
            >
              {renderDescriptions({
                ...(descriptions ?? leftDescriptions),
                ...defaultDescriptions,
              })}
              {renderDescriptions(rightDescriptions)}
            </DocsDescription>
          </div>
          {children}
        </div>
      </>
    );
  }

  return children;
};
