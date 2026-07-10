import convert from "convert";
import { compact } from "es-toolkit";
import { Slot } from "radix-ui";
import React from "react";
import Highlighter from "react-highlight-words";

import { LazyImage, Link } from "@/components/client";

export const highlighter = (textToHighlight, ...searchWords) => (
  <Highlighter
    caseSensitive
    highlightStyle={{
      backgroundColor: "var(--color-fd-accent)",
      color: "var(--color-fd-accent-foreground)",
      letterSpacing: "-.1ch",
    }}
    highlightTag="code"
    searchWords={searchWords}
    textToHighlight={textToHighlight}
  />
);

export const unnamedLink = (href) => {
  if (href) {
    const [a, b] = compact(new URL(href).pathname.split("/")).slice(-2);

    href = `/${a}/${a}-${b}`;

    return <Link href={href}>{href}</Link>;
  }
};

export const Avatar = (props) => (
  <Slot.Root
    style={{
      maxWidth: "calc(var(--text-base) * 6)",
    }}
  >
    <LazyImage {...props} />
  </Slot.Root>
);

export const unit = (quantity, from, to = "best", toFixed = 1) => (
  <span title={`${quantity} ${from}`}>
    {convert(quantity, from).to(to).toString(toFixed)}
  </span>
);

export const descriptionList = (term, ...descriptions) => (
  <dl>
    <dt>{term}</dt>
    <dd>
      {descriptions.map((description, index) => (
        <blockquote
          key={index}
          style={{
            fontStyle: "unset",
            fontWeight: "unset",
          }}
        >
          {description}
        </blockquote>
      ))}
    </dd>
  </dl>
);

export const Checkbox = ({ checked, children, ...props }) => {
  const id = React.useId();

  return (
    <div
      style={{
        display: "inline-flex",
        gap: "var(--spacing)",
      }}
    >
      <Slot.Root readOnly type="checkbox">
        <input checked={checked} disabled={!checked} id={id} {...props} />
      </Slot.Root>
      <label htmlFor={id}>{children}</label>
    </div>
  );
};
