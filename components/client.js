"use client";

import { useProgress } from "@bprogress/next";
import { useForesight } from "@foresightjs/react";
import { isPlainObject, pick } from "es-toolkit";
import FumadocsLink from "fumadocs-core/link";
import { useLinkStatus } from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, Slot } from "radix-ui";
import React from "react";

import { InView } from "@/components/in-view";

export { usePathname as Pathname } from "next/navigation";

export const Link = ({ href, prefetch = false, ...props }) => {
  useLinkStatus;

  const router = useRouter();

  const foresight = useForesight({
    callback() {
      if (href && !prefetch)
        router.prefetch(href, {
          onInvalidate: this.callback,
        });
    },
  });

  return (
    <Slot.Root ref={foresight.elementRef}>
      <FumadocsLink href={href} prefetch={prefetch} {...props} />
    </Slot.Root>
  );
};

export const LazyImage = InView.with(({ fallback, src, ...props }) => {
  const progress = useProgress();

  const defaultProps = React.useMemo(
    () =>
      isPlainObject(src)
        ? pick(src, ["height", "width", "src"])
        : {
            src,
          },
    [src],
  );

  return (
    <Avatar.Root>
      <Slot.Root
        onDoubleClick={() => {
          prompt(undefined, defaultProps.src);
        }}
        onLoadingStatusChange={(status) => {
          if (status === "loading") progress.start();
          if (status === "loaded" || status === "error") progress.stop();
        }}
        style={{
          userSelect: "none",
        }}
      >
        <Avatar.Image
          {...defaultProps}
          decoding="async"
          loading="lazy"
          {...props}
        />
      </Slot.Root>
      <Avatar.Fallback>{fallback}</Avatar.Fallback>
    </Avatar.Root>
  );
});
