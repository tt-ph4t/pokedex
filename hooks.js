import { useProgress } from "@bprogress/next";
import { useIsClient as internalUseIsClient } from "@suspensive/react";
import React from "react";
import { useHotkeys as internalUseHotkeys } from "react-hotkeys-hook";

export const useProgressWhen = (isLoading) => {
  const progress = useProgress();

  const effectEvent = React.useEffectEvent(() => {
    progress[isLoading ? "start" : "stop"]();
  });

  React.useEffect(effectEvent);
};

export const useIsClient = () => {
  const isClient = internalUseIsClient();

  useProgressWhen(!isClient);

  return isClient;
};

export const useHotkeys = (keys, callback, ...args) => {
  const progress = useProgress();

  return internalUseHotkeys(
    keys,
    async (...args) => {
      progress.start();
      await callback(...args);
      progress.stop();
    },
    ...args,
  );
};
