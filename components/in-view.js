"use client";

import { useIntersectionObserver } from "@uidotdev/usehooks";
import React from "react";

import { useIsClient } from "@/hooks";

const ClientOnly =
  // https://chakra-ui.com/docs/components/client-only
  ({ children, fallback }) => {
    const isClient = useIsClient();

    return <React.Activity>{isClient ? children : fallback}</React.Activity>;
  };

export const InView = ({
  children,
  forceRender,
  root: Root = "div",
  triggerOnce,
  unwrap = true,
}) => {
  children = <React.Activity>{children}</React.Activity>;

  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
  });

  const RootProps = {
    "data-inview": entry?.isIntersecting,
  };

  if (RootProps["data-inview"] && triggerOnce)
    return unwrap ? children : <Root {...RootProps}>{children}</Root>;

  return (
    <Root ref={ref} {...RootProps}>
      {forceRender ? (
        <React.Activity mode={RootProps["data-inview"] ? "visible" : "hidden"}>
          {children}
        </React.Activity>
      ) : (
        RootProps["data-inview"] && children
      )}
    </Root>
  );
};

export const ClientInView = ({
  children,
  fallback = children,
  triggerOnce = true,
  ...props
}) => (
  <ClientOnly fallback={fallback}>
    <InView triggerOnce={triggerOnce} {...props}>
      {children}
    </InView>
  </ClientOnly>
);
