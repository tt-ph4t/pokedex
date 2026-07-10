import { useProgress } from "@bprogress/next";
import { noop } from "es-toolkit";
import { isEmpty } from "es-toolkit/compat";
import { useCompositionInput } from "foxact/use-composition-input";
import { useDebouncedState } from "foxact/use-debounced-state";
import { Callout } from "fumadocs-ui/components/callout";
import Fuse from "fuse.js";
import React from "react";

import { InView } from "@/components/in-view";
import { HORIZONTAL_ELLIPSIS_SYMBOL } from "@/misc/contants";

const defaults = {
  emptyState: <Callout title="No results" />,
  fuseResult: [],
  inputValue: "",
  loading: <Callout title={`Loading search${HORIZONTAL_ELLIPSIS_SYMBOL}`} />,
  select: ({ fuseResult }) => fuseResult,
};

const Input = ({ onChange, ...props }) => (
  <input {...useCompositionInput(onChange)} {...props} />
);

export const FuzzySearch = Object.assign(
  ({
    emptyState = defaults.emptyState,
    fallback,
    fuse,
    loading = defaults.loading,
    render = noop,
    select = defaults.select,
  }) => {
    const [state, setState] = useDebouncedState(defaults.inputValue, 200);
    const isValidState = !isEmpty(state);
    const progress = useProgress();

    const fuseResult = React.useMemo(() => {
      let fuseResult = defaults.fuseResult;

      progress.start();

      if (isValidState)
        fuseResult = select({
          fuseResult: fuse.search(state),
        });

      progress.stop();

      return fuseResult;
    }, [state, isValidState, select, fuse, progress]);

    return (
      <>
        <InView fallback={loading}>
          <search>
            <Input
              defaultValue={defaults.inputValue}
              onChange={setState}
              placeholder="Search"
              style={{
                border: "1px solid var(--color-fd-border)",
                borderRadius: "var(--radius-sm)",
                paddingInline: "calc(var(--spacing) * 2)",
              }}
              type="search"
            />
          </search>
        </InView>
        <React.Activity>
          {isValidState
            ? isEmpty(fuseResult)
              ? emptyState
              : render({
                  fuseResult,
                })
            : fallback}
        </React.Activity>
      </>
    );
  },
  {
    createFuse: (docs, options = {}) =>
      new Fuse(
        docs,
        {
          useTokenSearch: true,
          ...options,
        },
        isEmpty(options.keys)
          ? undefined
          : Fuse.createIndex(options.keys, docs),
      ),
  },
);
