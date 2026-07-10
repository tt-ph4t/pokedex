"use client";

import { useProgress } from "@bprogress/next";
import { useForesightEvent } from "@foresightjs/react";

export default () => {
  const progress = useProgress();

  useForesightEvent("callbackInvoked", progress.start);
  useForesightEvent("callbackCompleted", progress.stop);
};
