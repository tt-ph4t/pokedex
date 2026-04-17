import { Feed } from "feed";

import names from "@/app/api/names/data.json";
import { getOgUrl } from "@/misc";
import { titleCase } from "@/misc/title-case";

import { SITE } from "../contants";

export const feed = new Feed({
  id: SITE.URL,
  language: SITE.LOCALE,
  link: SITE.URL,
  title: SITE.TITLE,
  updated: SITE.DATE,
});

for (const [a, b] of Object.entries(names)) {
  const categoryName = titleCase(a);

  for (const c of b) {
    const link = `${SITE.URL}/${a}/${c}`;
    const title = titleCase(c);

    feed.addItem({
      category: [{ name: categoryName }],
      date: SITE.DATE,
      id: link,
      image: {
        title: `${title} (${categoryName})`,
        type: "image/png",
        url: getOgUrl({
          title,
          topic: categoryName,
        }),
      },
      link,
      title,
    });
  }
}
