"use client";

import {
  Chart as InternalChart,
  Series,
  Subtitle,
  Title,
  XAxis,
  YAxis,
} from "@highcharts/react";
import { Accessibility } from "@highcharts/react/options/Accessibility";
import { Exporting } from "@highcharts/react/options/Exporting";

import { InView } from "@/components/in-view";
import { titleCase } from "@/misc/title-case";

import "./index.css";
import themeOptions from "./theme-options";

export const Chart = ({
  series,
  subtitle,
  title = "",
  XAxisProps,
  YAxisProps,
  ...props
}) => (
  <InView>
    <InternalChart options={{ ...themeOptions, ...props }}>
      <Title>{titleCase(title)}</Title>
      <Subtitle>{subtitle}</Subtitle>
      {series.map(({ data, ...props }) => (
        <Series
          data={data.map(({ name, ...rest }) => ({
            name: titleCase(name),
            ...rest,
          }))}
          {...props}
        />
      ))}
      <XAxis {...XAxisProps} />
      <YAxis {...YAxisProps} />
      <Accessibility />
      <Exporting />
    </InternalChart>
  </InView>
);
