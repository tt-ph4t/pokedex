"use client";

import { useComponentWillReceiveUpdate } from "foxact/use-component-will-receive-update";
import { useIsomorphicLayoutEffect } from "foxact/use-isomorphic-layout-effect";
import { usePathname } from "next/navigation";

import { table } from "@/components";
import { Link } from "@/components/client";
import { FuzzySearch } from "@/components/fuzzy-search";
import { titleCase } from "@/misc/title-case";

const fuse = FuzzySearch.createFuse();

export default ({ docs, ...props }) => {
  const pathname = usePathname();

  const updateFuseCollection = () => {
    fuse.setCollection(docs);
  };

  useComponentWillReceiveUpdate(updateFuseCollection, [docs]);
  useIsomorphicLayoutEffect(updateFuseCollection, []);

  return (
    <FuzzySearch
      fuse={fuse}
      render={({ fuseResult }) =>
        table.pagination(fuseResult, {
          renderCells: ({ context }) => (
            <Link href={`${pathname}/${context.item}`}>
              {titleCase(context.item)}
            </Link>
          ),
        })
      }
      {...props}
    />
  );
};
