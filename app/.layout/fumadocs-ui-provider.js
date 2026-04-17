import { RootProvider } from "fumadocs-ui/provider/next";
import "fumadocs-ui/style.css";

export default ({ children }) => (
  <RootProvider
    search={{
      options: {
        delayMs: 0,
      },
    }}
  >
    {children}
  </RootProvider>
);
