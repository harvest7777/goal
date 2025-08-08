"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ReferenceLine } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An area chart with axes"

interface ChartProps  {
  weekArray: number[] | null;
  goal: Goal;
}
export function WeeklyChart({ weekArray, goal }: ChartProps) {
  if (!weekArray || !goal.weekly_commitment) {
    return null;
  }
  const currentDay = new Date().getDay();

  let runningSum = 0;

  const chartData = (() => {
    return weekArray.map((value: number, index: number) => {
      runningSum += value/60000;
      return {
        hour: index,
        value: index <= currentDay ? runningSum : null,
      };
    });
  })();


  const weeklyChartConfig = {
    value: {
      label: "minutes",
      color: "hsl(var(--chart-1))"
    },
  } satisfies ChartConfig


  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>{runningSum >= goal.weekly_commitment && "✔"} {goal.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer  config={weeklyChartConfig}>
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
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatDay}
            >

            </XAxis>
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={4}
              domain={[0, runningSum > goal.weekly_commitment ? "auto" : goal.weekly_commitment]}
              tickFormatter={formatMinutes}
            >
            </YAxis>
            <ReferenceLine
              y={goal.weekly_commitment}
              stroke="var(--color-value)"
              strokeDasharray="4 4"
              strokeWidth={1}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="weeklyFillValue" x1="0" y1="0" x2="0" y2="1">
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
              fill="url(#weeklyFillValue)"
              fillOpacity={0.4}
              stroke="var(--color-value)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

const formatDay = (day: number): string => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
};

const formatMinutes = (value: number): string => {
  return `${value} m`
}