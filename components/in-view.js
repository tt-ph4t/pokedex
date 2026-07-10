"use client";

import { useIntersection } from "foxact/use-intersection";
import { useIsClient } from "foxact/use-is-client";
import { Slot } from "radix-ui";
import React from "react";

import { useProgressWhen } from "@/hooks";

const ClientOnly =
  // https://chakra-ui.com/docs/components/client-only
  ({ children, fallback }) => {
    const isClient = useIsClient();

    useProgressWhen(!isClient);

    return <React.Activity>{isClient ? children : fallback}</React.Activity>;
  };

const Intersection = ({
  as: Wrapper = "div",
  children,
  triggerOnce = true,
  ...props
}) => {
  const [setIntersection, isIntersected] = useIntersection({
    rootRef: undefined,
  });

  useProgressWhen(!isIntersected);

  return isIntersected && triggerOnce ? (
    children
  ) : (
    <Slot.Root ref={setIntersection}>
      <Wrapper {...props}>{isIntersected && children}</Wrapper>
    </Slot.Root>
  );
};

export const InView = Object.assign(
  ({ children, fallback = children, ...props }) => (
    <ClientOnly fallback={fallback}>
      <Intersection {...props}>{children}</Intersection>
    </ClientOnly>
  ),
  {
    with: (Component, InViewProps) => (props) => (
      <InView {...InViewProps}>
        <Component {...props} />
      </InView>
    ),
  },
);
