"use client";
import { useEffect, useState } from "react";
import { getReflections } from "./api-helpers";
import DisplayReflection from "./_components/display-reflection";

export default function ReflectPage() {
    const [reflections, setReflections] = useState<Reflection[] | null>(null);
    useEffect(()=>{
        const init = async () => {
            const fetchedReflections = await getReflections();
            setReflections(fetchedReflections);
        }
        init();
    },[])
    return (
        <div className="flex flex-col items-center justify-center">
            <h1>reflect</h1>
            <div className="w-1/2 flex flex-col gap-4">
                {reflections?.map((reflection) => (
                    <DisplayReflection key={reflection.id} reflection={reflection} />
                ))}
            </div>
        </div>

    )
}