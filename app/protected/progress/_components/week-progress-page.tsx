"use client";

import { RenderChart } from "./render-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWeeklyChartData } from "../_hooks/useWeeklyChartData";
import { formatMinutesToHoursAndMinutes } from "../api-helpers";
import { useDashboardStore } from "../../stores/useDashboardStore";
import Spinner from "@/components/ui/loading-spinner";

interface WeekProgressPageProps {
    display: string;
    className?: string;
}
export default function WeekProgressPage({ display, className }: WeekProgressPageProps) {
    const date = useDashboardStore((state) => state.date);
    const { goalData, chartConfig, loading, xFormatter, yFormatter } = useWeeklyChartData (date);

    if (display !== "week") {
        return null;
    }
    if (!date || loading || !goalData) {
        return (
            <div className={`${className} flex flex-col items-center justify-center gap-5`}>
                <Spinner/>
            </div>
        )
    }

    return (
        <div className={`${className} flex flex-col items-center justify-center gap-5`}>
            <h2>{formatMinutesToHoursAndMinutes(goalData.totalMinsWorkingThisWeek)}</h2>

            <div className={`flex flex-wrap gap-5 items-center align-middle justify-center`}>
            {
                (goalData.goalsToRender!
                    .filter((goal) => goal.weekly_commitment !== null)
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
                            tickX={undefined}
                            tickY={4}
                        />
                    </CardContent>
                    </Card>
            )))}
            </div>
        </div>
    )
}