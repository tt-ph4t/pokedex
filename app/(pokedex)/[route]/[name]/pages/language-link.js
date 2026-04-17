import { Link } from "@/components/link";
import { SITE } from "@/misc/contants";

const displayNames = new Intl.DisplayNames([SITE.LOCALE], {
  type: "language",
});

export default (language) => {
  let label;

  try {
    if ("name" in language) label = displayNames.of(language.name);
  } catch {
    return;
  }

  return (
    <Link href={`/language/${language.name}`} title={language.name}>
      {label}
    </Link>
  );
};
