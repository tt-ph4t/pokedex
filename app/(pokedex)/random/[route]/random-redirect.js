"use client";

import { sample } from "es-toolkit";
import { useIsomorphicLayoutEffect } from "foxact/use-isomorphic-layout-effect";
import { Callout } from "fumadocs-ui/components/callout";
import { useRouter } from "next/navigation";
import React from "react";

export default ({ hrefs }) => {
  const router = useRouter();
  const href = sample(hrefs);

  const effectEvent = React.useEffectEvent(() => {
    router.push(href);
  });

  useIsomorphicLayoutEffect(effectEvent, []);

  return (
    <Callout title="Redirecting to" type="warn">
      {href}
    </Callout>
  );
};
