import { DocsPage } from "fumadocs-ui/page";

import { LazyImage } from "@/components/client";
import { SITE } from "@/misc/contants";

import catDance from "./cat-dance.gif";
import DocsLayout from "./docs-layout";
import nav from "./nav";

export default ({ children }) => (
  <DocsLayout
    githubUrl="https://github.com/tt-ph4t/pokedex"
    nav={{
      title: <LazyImage src={catDance} title={SITE.TITLE} width={30} />,
      url: "/random/pokemon",
    }}
    tree={{
      children: [
        {
          name: "Home",
          url: "/",
        },
        {
          children: [
            {
              name: "Random",
              url: "/random",
            },
            {
              children: [
                {
                  name: "Page",
                  url: "/api-page",
                },
                {
                  name: "names.js",
                  url: "/api/names",
                },
                {
                  name: "Feed",
                  type: "separator",
                },
                {
                  name: "rss2.xml",
                  url: "/api/feed/rss2",
                },
                {
                  name: "atom1.xml",
                  url: "/api/feed/atom1",
                },
                {
                  name: "json1.json",
                  url: "/api/feed/json1",
                },
              ],
              name: "API",
              type: "folder",
            },
            {
              name: "sitemap.xml",
              url: "/sitemap.xml",
            },
            {
              name: "robots.txt",
              url: "/robots.txt",
            },
          ],
          name: "More",
          type: "folder",
        },
        ...nav,
      ],
    }}
  >
    <div className="prose" style={{ width: "100%" }}>
      <DocsPage>{children}</DocsPage>
    </div>
  </DocsLayout>
);
