"use client"

import React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface ChartProps  {
    chartData: { x: number; value: number | null }[];
    chartConfig: ChartConfig;
    total: number;
    formatX: (x: number) => string;
    formatY: (y: number) => string;
    tickX: number | undefined;
    tickY: number | undefined;
    className?: string;
}

function RenderChartComponent({chartData, chartConfig, formatX, formatY, className, tickX, tickY}: ChartProps) {
    const fillId = `fillValue-${new Date().getTime()}`;
  return (
    <ChartContainer className={`w-full ${className}`} config={chartConfig}>
        <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
            left: -10,
            right: 0,
        }}
        >
        <CartesianGrid vertical={false} />
        <XAxis
            dataKey="x"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            interval={tickX}
            tickFormatter={formatX}
        >

        </XAxis>
        <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickCount={tickY}
            tickFormatter={formatY}
        >
        </YAxis>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <defs>
            <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            <stop
                offset="5%"
                stopColor="var(--color-value)"
                stopOpacity={0.8}
            />
            <stop
                offset="95%"
                stopColor="var(--color-value)"
                stopOpacity={0.1}
            />
            </linearGradient>
        </defs>
        <Area
            dataKey="value"
            type="monotone"
            fill={`url(#${fillId})`}
            fillOpacity={0.4}
            stroke="var(--color-value)"
            stackId="a"
        />
        </AreaChart>
    </ChartContainer>
  )
}

export const RenderChart = React.memo(RenderChartComponent);