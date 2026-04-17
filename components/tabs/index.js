import { kebabCase } from "change-case";
import { isEmpty } from "es-toolkit/compat";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import removeAccents from "remove-accents";

import { ClientInView } from "@/components/in-view";
import { NO_CONTENT } from "@/misc/contants";
import { titleCase } from "@/misc/title-case";

import "./index.css";

export const tabs = (tabs) => {
  if (isEmpty(tabs)) return;

  return (
    <ClientInView>
      <Tabs
        items={Object.keys(tabs).map(titleCase)}
        style={{
          backgroundColor: "unset",
          border: "unset",
        }}
      >
        {Object.entries(tabs).map(([a, b]) => {
          const id = kebabCase(removeAccents(a));

          return (
            <Tab
              id={id}
              key={id}
              style={{
                backgroundColor: "unset",
                overflow: "auto",
                paddingInline: "unset",
              }}
              value={titleCase(a)}
            >
              <ClientInView>{b ?? NO_CONTENT}</ClientInView>
            </Tab>
          );
        })}
      </Tabs>
    </ClientInView>
  );
};
