import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChooseDay } from "./choose-day";
import { ChooseProgressDisplay } from "./choose-display";

interface SidebarProps {
    className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
    return (
        <div className={`${className} flex flex-col items-start bg-muted rounded-lg`}>
            <Link className="w-full" href="/protected/progress/timeline">
                <Button variant={"sidebar"}>timeline</Button>
            </Link>
            <Link className="w-full" href="/protected/progress/graph">
                <Button variant={"sidebar"}>graphical view</Button>
            </Link>
            <ChooseDay />
            <ChooseProgressDisplay/>
        </div>

    )
}