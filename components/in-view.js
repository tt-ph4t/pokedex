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

const InternalInView = ({
  children,
  forceRender,
  root: Root = "div",
  triggerOnce = true,
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

export const InView = ({ children, fallback = children, ...props }) => (
  <ClientOnly fallback={fallback}>
    <InternalInView {...props}>{children}</InternalInView>
  </ClientOnly>
);
