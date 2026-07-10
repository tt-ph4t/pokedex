import { Geist } from "next/font/google";

import { SITE } from "@/misc/contants";

import ForesightProgressBridge from "./foresight-progress-bridge";
import FumadocsUIProvider from "./fumadocs-ui-provider";
import ProgressProvider from "./progress-provider";
import "./styles/index.css";

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
        <FumadocsUIProvider>
          {children}
          <ForesightProgressBridge />
        </FumadocsUIProvider>
      </ProgressProvider>
    </body>
  </html>
);
