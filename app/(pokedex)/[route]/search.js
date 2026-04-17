"use client";

import { usePathname } from "next/navigation";
import React from "react";

import { table } from "@/components";
import { FuzzySearch } from "@/components/fuzzy-search";
import { Link } from "@/components/link";
import { titleCase } from "@/misc/title-case";

const fuse = FuzzySearch.createFuse();

export default ({ docs, ...props }) => {
  const pathname = usePathname();

  React.useEffect(() => {
    fuse.setCollection(docs);
  }, [docs]);

  return (
    <FuzzySearch
      fuse={fuse}
      render={({ fuseResult }) =>
        table.pagination(fuseResult, {
          renderRows: ({ context }) => [
            <Link href={`${pathname}/${context.item}`}>
              {titleCase(context.item)}
            </Link>,
          ],
        })
      }
      {...props}
    />
  );
};
