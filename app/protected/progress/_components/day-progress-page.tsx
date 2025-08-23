"use client";

import { useDailyChartData } from "../_hooks/useDailyChartData";
import { RenderChart } from "./render-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatMinutesToHoursAndMinutes } from "../api-helpers";
import Spinner from "@/components/ui/loading-spinner";
import useDailyOutputsData from "../_hooks/useDailyOutputsData";
import { isToday } from "date-fns";

interface DayProgressProps {
    display: string;
    date: Date;
    className?: string;
}

export default function DayProgressPage({ className, display, date }: DayProgressProps) {
    const sessionData = useDailyOutputsData({date});

    const { goalData, chartConfig, loading, xFormatter, yFormatter } = useDailyChartData(date);

    if (display !== "day") {
        console.log(display)
        return null;
    }
    if (!date || loading || !goalData) {
        return (
            <div className={`${className} flex flex-col items-center justify-center gap-5`}>
                <Spinner />
            </div>
        )
    }

    return (
        <div className={`${className} flex flex-col items-center justify-center gap-5`}>
            <h2>
                <span>you spent </span>
                <span className="font-bold">{formatMinutesToHoursAndMinutes(goalData.totalMinsWorkingThisDay)}</span>
                <span> working {isToday(date) ? "today" : "on " + date.toLocaleDateString()}</span>
            </h2>
            <div className={`flex flex-wrap gap-5 items-center align-middle justify-center`}>
            {goalData.goalsToRender!
            .filter((goal) => goal.daily_commitment !== null)
            .map((goal) => (
            <Card key={goal.id} className={`w-80 ${!goal.is_focused && 'opacity-30'}`}>
            <CardHeader>
                <CardTitle className="flex justify-between">
                <span className="w-3/5 line-clamp-1">{goal.name}</span>
                <span className="text-muted-foreground font-normal">{formatMinutesToHoursAndMinutes(goalData.goalToTotalMins[goal.id])}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <RenderChart
                    chartData={goalData.goalToChartData[goal.id]}
                    chartConfig={chartConfig}
                    target={goalData.goalToTargetMins[goal.id]}
                    total={goalData.goalToTotalMins[goal.id]}
                    formatX={xFormatter}
                    formatY={yFormatter}
                    tickX={4}
                    tickY={4}
                />
            </CardContent>
            </Card>
            ))}
            </div>
        </div>
    )
}
