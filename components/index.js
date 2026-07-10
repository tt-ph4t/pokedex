import { chunk, isPlainObject, noop } from "es-toolkit";
import { castArray, isEmpty } from "es-toolkit/compat";
import React from "react";
import romanize from "romanize";

import { InView } from "@/components/in-view";
import { tabs } from "@/components/tabs";
import { titleCase } from "@/misc/title-case";

export const table = Object.assign(
  (thead = [], tbody = [], tfoot) => {
    if (thead.length || tbody.length)
      return (
        <table>
          <thead>
            <tr>
              {thead.map((a, b) => (
                <th key={b}>{titleCase(a)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tbody.map((a, b) => (
              <tr key={b}>
                <InView as="td">
                  {castArray(a).map((a, b) => (
                    <td key={b}>{a}</td>
                  ))}
                </InView>
              </tr>
            ))}
          </tbody>
          <tfoot>{tfoot}</tfoot>
        </table>
      );
  },
  {
    pagination: Object.assign(
      (
        items,
        { chunkSize = 100, renderCells = noop, showIndex = true, thead },
      ) => {
        if (isEmpty(items)) return;

        return tabs(
          Object.fromEntries(
            chunk(items, chunkSize).map((items, index1) => [
              `page ${romanize(index1 + 1)}`,
              table(
                thead,
                items.map((context, index2) => {
                  const [firstCell, ...cells] = castArray(
                    renderCells({
                      context,
                    }),
                  );

                  return [
                    <span>
                      {showIndex && (
                        <span
                          style={{
                            color: "var(--color-fd-muted-foreground)",
                          }}
                        >
                          {index1 * chunkSize + index2 + 1}
                          {". "}
                        </span>
                      )}
                      {firstCell}
                    </span>,
                    ...cells,
                  ];
                }),
              ),
            ]),
          ),
        );
      },
      {
        object: (value, { renderKey = noop, renderValue = noop }) => {
          if (isPlainObject(value))
            return table.pagination(Object.entries(value), {
              renderCells: ({ context: [a, b] }) => [
                renderKey(a),
                table.pagination.object(b, {
                  renderKey,
                  renderValue,
                }),
              ],
            });

          return renderValue(value);
        },
      },
    ),
  },
);

export const list = Object.assign(
  (...items) => (
    <ul>
      {items.map((a, b) => (
        <li key={b}>{a}</li>
      ))}
    </ul>
  ),
  {
    inline: (...items) =>
      items.map((a, b) => {
        const penultimateIndex = items.length - 2;

        return (
          <React.Fragment key={b}>
            {a}
            {b < penultimateIndex && ", "}
            {b === penultimateIndex && " and "}
          </React.Fragment>
        );
      }),
  },
);
