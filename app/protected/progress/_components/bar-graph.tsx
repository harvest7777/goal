"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A bar chart"

interface ChartProps  {
    chartData: { x: number; value: number | null }[];
    chartConfig: ChartConfig;
    formatX: (x: number) => string;
    formatY: (y: number) => string;
    tickX: number | undefined;
    tickY: number | undefined;
    className?: string;
}

export function BarGraph({ chartData, chartConfig, formatX, formatY, tickX, tickY, className }: ChartProps) {
  return (
        <ChartContainer className={`w-full ${className}`} config={chartConfig}>
          <BarChart accessibilityLayer  data={chartData}         
          margin={{
            left: -25,
            right: 0,
          }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="x"
              tickLine={false}
              axisLine={false}
              tickCount={tickX}
              tickMargin={8}
              tickFormatter={formatX}
            />
            <YAxis
              domain={[0, 60]}
              axisLine={false}
              tickLine={false}
              tickFormatter={formatY}
              tickCount={tickY}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" fill={chartConfig.value.color} radius={4}  />
          </BarChart>
        </ChartContainer>
  )
}
