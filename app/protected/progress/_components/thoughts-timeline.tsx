/**
 * This can take an input of dates and render a div spaced apart to 
 * scale based on the differendes in dates
 */
"use client";

import CenteredSpinner from "@/components/ui/centered-spinner";
import TimelineBlob from "./timeline-blob";
import { useSearchParams } from "next/navigation";

interface ThoughtsTimelineProps {
    sessionData: {
        session_id: number;
        session_end: Date;
        output_description: string | null;
        reflection_description: string | null;
    }[] | null;
    vertical?: boolean;
    className?: string;
}
export default function ThoughtsTimeline({sessionData, vertical=false, className}: ThoughtsTimelineProps) {
    const searchParams = useSearchParams();
    const paramDate = searchParams.get("date");
    let date = new Date();

    if (paramDate) {
        date = new Date(paramDate);
    }
    if (!sessionData || !date) {
        return <CenteredSpinner/>
    }
    const minsInDay = 24*60;
    const timelineArray = new Array(minsInDay).fill(null);
    sessionData.forEach((session) => {
        const minuteOfDay = new Date(session.session_end).getHours() * 60 + new Date(session.session_end).getMinutes();
        timelineArray[minuteOfDay] = session;
    });

    let percentOfDayPassed = (new Date().getHours() * 60 + new Date().getMinutes())*100/minsInDay;
    if (isBeforeToday(date)) {
        percentOfDayPassed = 100;
    }
    const percentOfDayLeft = 100 - percentOfDayPassed;
    return (
        <div className={`relative ${vertical ? 'h-[calc(100vh-56px)]' : 'w-full'} ${className}`}>
            {/* bar up to the current time */}

            <div style={vertical? {height: `${percentOfDayPassed}%`} : {width: `${percentOfDayPassed}%` }} className={`rounded-l-full absolute ${vertical? 'w-1': 'h-1'} bg-input`}/>
            {/* bar for the rest of the day  */}

            <div style={vertical? {height: `${percentOfDayLeft}%`, top: `${percentOfDayPassed}%`}: {width: `${percentOfDayLeft}%`, left: `${percentOfDayPassed}%` }} className={`absolute ${vertical? 'w-1':'h-1'} bg-muted`}/>
            {timelineArray.map((_, index) => {
                if (timelineArray[index] !== null) {
                    const offset = (index / minsInDay) * 100; // Calculate the left position as a percentage
                    return <TimelineBlob key={index} offset={offset} output={timelineArray[index].output_description} reflection={timelineArray[index].reflection_description} vertical={vertical}/>;
                }
            })}
        </div>
    )
}
const isBeforeToday = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize to start of today
  return date < today;
}