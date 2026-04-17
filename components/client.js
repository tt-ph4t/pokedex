"use client";

import { useImagePreload } from "@madeinhaus/hooks";
import { isPlainObject, pick } from "es-toolkit";
import { useRouter } from "next/navigation";

import { list } from "@/components";
import { ClientInView } from "@/components/in-view";
import { Link } from "@/components/link";
import { useProgressWhen } from "@/hooks";
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
  loading = "lazy",
  src,
  ...props
}) => {
  const [loaded, ref] = useImagePreload();

  useProgressWhen(!loaded);

  return (
    <ClientInView>
      <img
        decoding={decoding}
        loading={loading}
        ref={ref}
        {...(isPlainObject(src)
          ? pick(src, ["height", "width", "src"])
          : { src })}
        {...props}
      />
    </ClientInView>
  );
};
