import { useProgress } from "@bprogress/next";
import { useDebounce } from "@uidotdev/usehooks";
import { noop } from "es-toolkit";
import { isEmpty } from "es-toolkit/compat";
import { Callout } from "fumadocs-ui/components/callout";
import Fuse from "fuse.js";
import React from "react";

import { ClientInView } from "@/components/in-view";
import { HORIZONTAL_ELLIPSIS_SYMBOL } from "@/misc/contants";

const defaults = {
  fuseResult: [],
  select: ({ fuseResult }) => fuseResult,
};

export const FuzzySearch = Object.assign(
  ({ fallback, fuse, render = noop, select = defaults.select }) => {
    const [state, setState] = React.useState("");
    const debouncedState = useDebounce(state, 300);
    const isValidDebouncedState = !isEmpty(debouncedState);
    const progress = useProgress();

    const fuseResult = React.useMemo(() => {
      let fuseResult = defaults.fuseResult;

      React.startTransition(() => {
        progress.start();

        if (isValidDebouncedState)
          fuseResult = select({
            fuseResult: fuse.search(debouncedState),
          });

        progress.stop();
      });

      return fuseResult;
    }, [debouncedState, isValidDebouncedState, select, fuse, progress]);

    return (
      <>
        <ClientInView
          fallback={
            <Callout title={`Loading search${HORIZONTAL_ELLIPSIS_SYMBOL}`} />
          }
        >
          <search>
            <input
              onChange={(event) => {
                React.startTransition(() => {
                  setState(event.target.value);
                });
              }}
              placeholder="Search"
              style={{
                border: "1px solid var(--color-fd-border)",
                borderRadius: "var(--radius-sm)",
                paddingInline: "calc(var(--spacing) * 2)",
              }}
              type="search"
              value={state}
            />
          </search>
        </ClientInView>
        <React.Activity>
          {isValidDebouncedState ? (
            isEmpty(fuseResult) ? (
              <Callout title="No results found" />
            ) : (
              render({ fuseResult })
            )
          ) : (
            fallback
          )}
        </React.Activity>
      </>
    );
  },
  {
    createFuse: (docs, options, ...args) =>
      new Fuse(
        docs,
        {
          useTokenSearch: true,
          ...options,
        },
        ...args,
      ),
  },
);
