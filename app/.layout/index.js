import { Geist } from "next/font/google";

import { SITE } from "@/misc/contants";

import "./css/index.css";
import FumadocsUIProvider from "./fumadocs-ui-provider";
import ProgressProvider from "./progress-provider";

const font = Geist();

const requiredStyles = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100dvh",
};

export default ({ children }) => (
  <html className={font.className} lang={SITE.LOCALE} suppressHydrationWarning>
    <body style={requiredStyles}>
      <ProgressProvider>
        <FumadocsUIProvider>{children}</FumadocsUIProvider>
      </ProgressProvider>
    </body>
  </html>
);
