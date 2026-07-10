import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

import { InView } from "@/components/in-view";

export default (math) => (
  <InView>
    <span title={math}>
      <InlineMath errorColor="var(--color-fd-error)" math={math} />
    </span>
  </InView>
);
