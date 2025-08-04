"use client";
import { useEffect, useState } from "react"
import TestGoals from "./_components/test-goals"
import { getDayArray } from "./graph-helpers"
import { getSessions } from "./api-helpers"
import { Chart } from "./_components/chart"
export default function ProgressPage() {
    const [dayArray, setDayArray] = useState<number[] | null>(null);
    useEffect(()=>{
        const init = async () => {
            const startDate = new Date();
            startDate.setHours(0, 0, 0, 0);

            const endDate = new Date();
            endDate.setHours(23, 59, 59, 999);

            const fetchedSessions = await getSessions(8, startDate.toISOString(), endDate.toISOString());
            const newDayArray = getDayArray(fetchedSessions);
            setDayArray(newDayArray);
            console.log(dayArray)
        }
        init();

    },[])
    return (
    <div className="flex flex-col items-center justify-center gap-10">
        <h1>lets see how we are doing</h1>
        <Chart dayArray={dayArray}/>
        <TestGoals/>
    </div>
    )
}