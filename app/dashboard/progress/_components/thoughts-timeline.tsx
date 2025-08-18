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

    return (
        <div className="w-full">
            <div className="h-10 w-[calc(100%)] bg-red-50 relative">
                {timelineArray.map((_, index) => {
                    if (timelineArray[index] !== null) {
                        const leftPosition = (index / minsInDay) * 100; // Calculate the left position as a percentage
                        return <TimelineBlob key={index} leftPosition={leftPosition}/>
                    }
                })}
            </div>
            {/* {sessionData.map((s) => (
                <div key={s.session_id}>
                    <h3>Session {s.session_id}</h3>
                    <p>Output: {s.output_description}</p>
                    <p>Reflection: {s.reflection_description}</p>
                </div>
            ))} */}
        </div>
    )


}