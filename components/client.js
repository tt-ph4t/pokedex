"use client";

import { useProgress } from "@bprogress/next";
import { asyncNoop, isPlainObject, pick } from "es-toolkit";
import { useRouter } from "next/navigation";
import { Avatar } from "radix-ui";

import { list } from "@/components";
import { InView } from "@/components/in-view";
import { Link } from "@/components/link";
import { titleCase } from "@/misc/title-case";

export { usePathname as Pathname } from "next/navigation";

export const RouterActions = () => {
  const router = useRouter();

  return list(
    ...Object.entries(pick(router, ["back", "forward", "refresh"])).map(
      ([a, b]) => <Link onClick={b}>{titleCase(a)}</Link>,
    ),
  );
};

export const LazyImage = ({
  decoding = "async",
  fallback,
  loading = "lazy",
  onLoadingStatusChange = asyncNoop,
  src,
  style,
  ...props
}) => {
  const progress = useProgress();

  return (
    <InView>
      <Avatar.Root>
        <Avatar.Image
          decoding={decoding}
          loading={loading}
          onLoadingStatusChange={async (status) => {
            if (status === "loading") progress.start();
            if (status === "loaded" || status === "error") progress.stop();

            await onLoadingStatusChange(status);
          }}
          {...(isPlainObject(src)
            ? pick(src, ["height", "width", "src"])
            : { src })}
          {...props}
          style={{
            userSelect: "none",
            ...style,
          }}
        />
        <Avatar.Fallback>{fallback}</Avatar.Fallback>
      </Avatar.Root>
    </InView>
  );
};
