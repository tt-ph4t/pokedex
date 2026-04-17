"use client";

import { sample } from "es-toolkit";
import { Callout } from "fumadocs-ui/components/callout";
import { useRouter } from "next/navigation";
import React from "react";

import { RouterActions } from "@/components/client";

export default ({ hrefs }) => {
  const router = useRouter();
  const href = sample(hrefs);

  const effectEvent = React.useEffectEvent(() => {
    router.push(href);
  });

  React.useEffect(effectEvent);

  return (
    <Callout title="Redirecting to" type="warn">
      {href}
      <RouterActions />
    </Callout>
  );
};
