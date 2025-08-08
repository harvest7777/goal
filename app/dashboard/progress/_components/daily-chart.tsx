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
  dayArray: number[] | null;
  goal: Goal;
}
export function Chart({ dayArray, goal }: ChartProps) {
  if (!dayArray) {
    return null;
  }
  const currentHour = new Date().getHours();

  let runningSum = 0;
  const chartData = (() => {
    return dayArray.map((value: number, index: number) => {
      runningSum += value;
      return {
        hour: index,
        value: index <= currentHour ? runningSum : null,
      };
    });
  })();

  const chartConfig = {
    value: {
      label: "minutes",
      color: "hsl(var(--chart-4))",
    },
  } satisfies ChartConfig

  const formatHour = (hour: number): string => {
    const suffix = hour < 12 ? "AM" : "PM";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${hour12} ${suffix}`;
  };
  if (!goal.daily_commitment) {
    console.warn("Goal does not have a daily commitment set");
    return null;
  }
  const formatMinutes = (value: number): string => {
    return `${value} m`
  }

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>{runningSum >= goal.daily_commitment && "✔"} {goal.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer  config={chartConfig}>
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
              interval={4}
              tickFormatter={formatHour}
            >

            </XAxis>
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={4}
              domain={[0, runningSum > goal.daily_commitment ? "auto" : goal.daily_commitment]}
              tickFormatter={formatMinutes}
            >
            </YAxis>
            <ReferenceLine
              y={goal.daily_commitment}
              stroke="var(--color-value)"
              strokeDasharray="4 4"
              strokeWidth={1}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
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
              fill="url(#fillValue)"
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
