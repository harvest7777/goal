import { Button } from "@/components/ui/button";
import { ChooseDay } from "./choose-day";

interface SidebarProps {
    className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
    const changeQueryParams = (newParams: Record<string, string>) => {
        const searchParams = new URLSearchParams(window.location.search);
        Object.entries(newParams).forEach(([key, value]) => {
            searchParams.set(key, value);
        });
        window.history.replaceState({}, "", `${window.location.pathname}?${searchParams}`);
    };
    return (
        <div className={`${className} flex flex-col items-start border-r-2 border-muted`}>
            <Button variant={"sidebar"} onClick={() => changeQueryParams({ view: "day" })}>day view</Button>
            <Button variant={"sidebar"} onClick={() => changeQueryParams({ view: "week" })}>week view</Button>
            <ChooseDay />
        </div>

    )
}