/**
 * This can take an input of dates and render a div spaced apart to 
 * scale based on the differendes in dates
 */
"use client";

import CenteredSpinner from "@/components/ui/centered-spinner";
import TimelineBlob from "./timeline-blob";

interface ThoughtsTimelineProps {
    sessionData: {
        session_id: number;
        session_end: Date;
        output_description: string | null;
        reflection_description: string | null;
    }[] | null;
}
export default function ThoughtsTimeline({sessionData}: ThoughtsTimelineProps) {
    if (!sessionData) {
        return <CenteredSpinner/>
    }
    const minsInDay = 24*60;
    const timelineArray = new Array(minsInDay).fill(null);
    sessionData.forEach((session) => {
        const minuteOfDay = new Date(session.session_end).getHours() * 60 + new Date(session.session_end).getMinutes();
        timelineArray[minuteOfDay] = session;
    });

    const percentOfDayPassed = (new Date().getHours() * 60 + new Date().getMinutes())*100/minsInDay;
    const percentOfDayLeft = 100 - percentOfDayPassed;
    return (
        <div className="w-3/5 relative">
            {/* bar up to the curren titme */}
            <div style={{width: `${percentOfDayPassed}%` }} className="rounded-l-full absolute h-1 bg-input mt-1"/>
            {/* bar for the rest of the day  */}
            <div style={{width: `${percentOfDayLeft}%`, marginLeft: `${percentOfDayPassed}%` }} className="absolute h-1 bg-muted mt-1"/>
            <div className="">
                {timelineArray.map((_, index) => {
                    if (timelineArray[index] !== null) {
                        const leftPosition = (index / minsInDay) * 100; // Calculate the left position as a percentage
                        return <TimelineBlob key={index} leftPosition={leftPosition} output={timelineArray[index].output_description} reflection={timelineArray[index].reflection_description} />;
                    }
                })}
            </div>
        </div>
    )


}