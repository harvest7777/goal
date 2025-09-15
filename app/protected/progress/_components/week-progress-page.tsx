"use client";

import { RenderChart } from "./render-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWeeklyChartData } from "../_hooks/useWeeklyChartData";
import { formatMinutesToHoursAndMinutes } from "../api-helpers";
import Spinner from "@/components/ui/loading-spinner";
import { format, isThisWeek } from "date-fns";
import BorderWrapper from "@/components/ui/border-wrapper";

interface WeekProgressPageProps {
    display: string;
    date: Date;
    className?: string;
}
export default function WeekProgressPage({ display, className, date }: WeekProgressPageProps) {
    const { goalData, chartConfig, loading, xFormatter, yFormatter } = useWeeklyChartData (date);

    if (display !== "week") {
        return null;
    }
    if (!date || loading || !goalData) {
        return (
            <div className={`h-[calc(50vh)] flex flex-col items-center align-middle justify-center gap-5`}>
                <Spinner/>
            </div>
        )
    }

    return (
        <div className={`${className} flex flex-col items-center justify-center gap-5`}>

            <BorderWrapper className="w-full flex flex-col items-center align-middle justify-center">
            {goalData.totalMinsWorkingThisWeek > 0? (
                <div>
                <h2 className="w-full">
                    <span>you spent </span>
                    <span className="font-bold">{formatMinutesToHoursAndMinutes(goalData.totalMinsWorkingThisWeek)}</span>
                    <span> working {isThisWeek(date) ? "this week" : "the week of " + format(date, "MMMM do").toLowerCase()}</span>
                </h2>

                <div className={`mt-5 grid grid-cols-3 gap-5`}>
                {
                    (goalData.goalsToRender!
                        .filter((goal) => goal.weekly_commitment !== null)
                        .map((goal) => (
                        <Card key={goal.id} className={`w-64 ${!goal.is_focused && 'opacity-30'}`}>
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
            ):(
                <p className="w-full text-center">no goal data to show</p>
            )}
            </BorderWrapper>
        </div>
    )
}