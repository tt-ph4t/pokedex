"use client";

import { useRouter } from "next/navigation";

import { Link } from "@/components/link";
import { useHotkeys } from "@/hooks";

export default ({ href, keys, prefetch = true, ...props }) => {
  const router = useRouter();

  useHotkeys(keys, () => {
    router.push(href);
  });

  return <Link href={href} prefetch={prefetch} {...props} />;
};
