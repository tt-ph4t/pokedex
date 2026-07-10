import { isPlainObject } from "es-toolkit";
import { isEmpty } from "es-toolkit/compat";

import { Link } from "@/components/client";
import { SITE } from "@/misc/contants";

const displayNames = new Intl.DisplayNames([SITE.LOCALE], {
  type: "language",
});

export const languageLink = (language) => {
  let label;
  let name = language;

  if (isPlainObject(language)) name = language.name;

  try {
    if (!isEmpty(name)) label = displayNames.of(name);
  } catch {
    return;
  }

  return (
    <Link href={`/language/${name}`} title={name}>
      {label}
    </Link>
  );
};
