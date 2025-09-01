"use client";

import { useDailyChartData } from "../_hooks/useDailyChartData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatMinutesToHoursAndMinutes } from "../api-helpers";
import Spinner from "@/components/ui/loading-spinner";
import { format, isToday } from "date-fns";
import useDailyOutputsData from "../_hooks/useDailyOutputsData";
import ThoughtsTimeline from "./thoughts-timeline";
import BorderWrapper from "@/components/ui/border-wrapper";
import { BarGraph } from "./bar-graph";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabase/supabase";

interface DayProgressProps {
    display: string;
    date: Date;
    className?: string;
}

export default function DayProgressPage({ className, display, date }: DayProgressProps) {
    const {sessionData} = useDailyOutputsData({ date });
    const { goalData, chartConfig, loading, xFormatter, yFormatter } = useDailyChartData(date);
    const [totalDayData, setTotalDayData] = useState<{x: number, value: number}[]|null>(null);

    useEffect(()=>{
        const init = async() => {
            const startDate = new Date(date);
            startDate.setHours(0,0,0);
            const { data, error } = await supabase.rpc('get_hourly_time_over_range_of_hours', {
                p_hours: 24,
                p_start_time: startDate.toISOString(),
            });
            if (error) {
                console.error("Error fetching hourly data:", error);
                return;
            }

            const chartData = data.map((d: {  day_time: number }, index: number) => {
                return {
                    x: index,
                    value:  (d.day_time / 60000),
                };
            });

            setTotalDayData(chartData);
        }
        init();
    }, []);
    if (display !== "day") {
        return null;
    }

    if (!date || loading || !goalData || !sessionData || totalDayData === null) {
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

                {goalData.totalMinsWorkingThisDay > 0?(
                    <div>
                        <BorderWrapper className="mb-5">
                            <h2 className="text-left w-full mb-3">
                                <span>total time </span>
                                <span className="font-bold">{formatMinutesToHoursAndMinutes(goalData.totalMinsWorkingThisDay)}</span>
                            </h2> 
                            <BarGraph
                                className="h-48"
                                chartData={totalDayData}
                                chartConfig={chartConfig}
                                formatX={xFormatter}
                                formatY={yFormatter}
                                tickX={2}
                                tickY={3}
                            />
                        </BorderWrapper>

                        <BorderWrapper className="w-full flex flex-col items-center align-middle justify-center">
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
                                <BarGraph
                                    chartData={goalData.goalToChartData[goal.id]}
                                    chartConfig={chartConfig}
                                    formatX={xFormatter}
                                    formatY={yFormatter}
                                    tickX={2}
                                    tickY={3}
                                />
                            </CardContent>
                            </Card>

                        ))}
                        </div>
                        </BorderWrapper>
                    </div>
                )

                :(

                    <BorderWrapper className="w-full flex flex-col items-center align-middle justify-center">
                    <p className="w-full text-center">no goal data to show</p>
                    </BorderWrapper>
                )}
        </div>
    )
}


            {/* <BorderWrapper className="w-full flex flex-col items-center align-middle justify-center">
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
            </BorderWrapper> */}