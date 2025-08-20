"use client";
import { useDashboardStore } from "../../stores/useDashboardStore";
import ThoughtsTimeline from "./_components/thoughts-timeline";
import useDailyOutputsData from "./_hooks/useDailyOutputsData";
import Spinner from "@/components/ui/loading-spinner";

export default function TimelinePage() {
    const date = useDashboardStore((state) => state.date);
    const {sessionData} = useDailyOutputsData({date});
    if (!sessionData) {
        return (
            <div className="flex justify-center items-center">
                <Spinner/>
            </div>
        )
    }
    return (
        <div>
            <h1>welcome to your timeline</h1>
            <span>hover over any bubble to see your outputs and reflections throghout the day</span>
            <ThoughtsTimeline className="mt-20" sessionData={sessionData} />
        </div>
    )
}