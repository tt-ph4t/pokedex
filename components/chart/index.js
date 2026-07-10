"use client";

import {
  Chart as Highchart,
  Series,
  Subtitle,
  Title,
  XAxis,
  YAxis,
} from "@highcharts/react";
import { Accessibility } from "@highcharts/react/modules/Accessibility";
import { Exporting } from "@highcharts/react/modules/Exporting";
import { castArray } from "es-toolkit/compat";
import React from "react";

import { InView } from "@/components/in-view";
import { titleCase } from "@/misc/title-case";

import "./index.css";
import themeOptions from "./theme-options";

export const Chart = InView.with(
  ({ series, subtitle, title = "", XAxisProps, YAxisProps, ...props }) => (
    <Highchart
      options={{
        ...themeOptions,
        ...props,
      }}
    >
      <Title>{titleCase(title)}</Title>
      <Subtitle>{subtitle}</Subtitle>
      {castArray(series).map(({ data, ...props }) => (
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
      <React.Activity>
        <Accessibility />
        <Exporting />
      </React.Activity>
    </Highchart>
  ),
);
