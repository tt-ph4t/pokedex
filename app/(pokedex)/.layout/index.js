import { DocsPage } from "fumadocs-ui/page";

import { API_VERSION_PATH, SITE } from "@/misc/contants";

import DocsLayout from "./docs-layout";
import nav from "./nav";

export default ({ children }) => (
  <DocsLayout
    githubUrl="https://github.com/tt-ph4t/pokedex"
    nav={{
      title: <span title={API_VERSION_PATH}>{SITE.TITLE}</span>,
    }}
    tree={{
      children: [
        {
          children: [
            {
              name: "Random",
              url: "/random",
            },
            {
              children: [
                {
                  name: API_VERSION_PATH,
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
          defaultOpen: true,
          name: "Misc",
          type: "folder",
        },
        ...nav,
      ],
    }}
  >
    <div
      className="prose"
      style={{
        "--size": "100%",

        height: "var(--size)",
        width: "var(--size)",
      }}
    >
      <DocsPage>{children}</DocsPage>
    </div>
  </DocsLayout>
);
