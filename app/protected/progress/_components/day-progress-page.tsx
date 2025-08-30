"use client";

import { useDailyChartData } from "../_hooks/useDailyChartData";
import { RenderChart } from "./render-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatMinutesToHoursAndMinutes } from "../api-helpers";
import Spinner from "@/components/ui/loading-spinner";
import { format, isToday } from "date-fns";
import useDailyOutputsData from "../_hooks/useDailyOutputsData";
import ThoughtsTimeline from "./thoughts-timeline";
import BorderWrapper from "@/components/ui/border-wrapper";

interface DayProgressProps {
    display: string;
    date: Date;
    className?: string;
}

export default function DayProgressPage({ className, display, date }: DayProgressProps) {
    const {sessionData} = useDailyOutputsData({ date });
    const { goalData, chartConfig, loading, xFormatter, yFormatter } = useDailyChartData(date);

    if (display !== "day") {
        console.log(display)
        return null;
    }

    if (!date || loading || !goalData || !sessionData) {
        return (
            <div className={`h-[calc(50vh)] flex flex-col items-center align-middle justify-center gap-5`}>
                <Spinner/>
            </div>
        )
    }

    return (
        <div className={`${className} w-full flex flex-col items-center justify-center gap-5`}>
            <h1>{isToday(date) ? "today" :  format(date, "MMMM do").toLowerCase()}</h1>
            <BorderWrapper className="w-full">
                {sessionData.length > 0? (
                    <div>
                        <h2 className="text-left w-full">thoughts and reflections</h2>
                        <ThoughtsTimeline className="mt-5" sessionData={sessionData}/>
                    </div>
                ):(
                    <p className="w-full  text-center">no reflections to show</p>
                )}
            </BorderWrapper>
            <BorderWrapper className="w-full flex flex-col items-center align-middle justify-center">
                {goalData.totalMinsWorkingThisDay > 0?(
                    <div>
                        <h2 className="text-left w-full">
                            <span>total time </span>
                            <span className="font-bold">{formatMinutesToHoursAndMinutes(goalData.totalMinsWorkingThisDay)}</span>
                        </h2> 
                        <div className={`mt-5 grid grid-cols-3 gap-5`}>
                            {goalData.goalsToRender!
                            .filter((goal) => goal.daily_commitment !== null)
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

                :(
                    <p className="w-full text-center">no goal data to show</p>
                )}
        </BorderWrapper>
        
        </div>
    )
}
