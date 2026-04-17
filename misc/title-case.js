import { noCase, split } from "change-case";
import deromanize from "deromanize";
import removeAccents from "remove-accents";
import { titleCase as internalTitleCase, WORD_SEPARATORS } from "title-case";

import { SITE } from "./contants";

const defaultOptions = {
  locale: SITE.LOCALE,
  wordSeparators: new Set(["_", ...WORD_SEPARATORS]),
};

const terms = {
  pokedex: "Pokédex",
  pokemon: "Pokémon",
};

export const titleCase = (input, options) => {
  try {
    return split(
      internalTitleCase(input, {
        ...defaultOptions,
        ...options,
      }),
    )
      .map((word) =>
        Number.isNaN(deromanize(word))
          ? (terms[noCase(removeAccents(word))] ?? word)
          : word.toUpperCase(),
      )
      .join(" ");
  } catch {}
};
