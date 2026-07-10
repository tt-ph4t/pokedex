import { useProgress } from "@bprogress/next";
import { useIsomorphicLayoutEffect } from "foxact/use-isomorphic-layout-effect";
import React from "react";

export const useProgressWhen = (isLoading) => {
  const progress = useProgress();

  const effectEvent = React.useEffectEvent(() => {
    progress[isLoading ? "start" : "stop"]();
  });

  useIsomorphicLayoutEffect(effectEvent, [isLoading]);
};
