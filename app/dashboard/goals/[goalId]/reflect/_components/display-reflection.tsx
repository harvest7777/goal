import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface DisplayReflectionProps {
    reflection: Reflection;
    className?: string;
}
export default function DisplayReflection({ reflection, className }: DisplayReflectionProps) {
    const [open, setOpen] = useState(false);
    const formattedDate = new Date(reflection.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
    return (
        <div 
        onClick={() => {
            setOpen(!open);
        }}
        className={`${className} hover:cursor-pointer`}>
        <div className="flex justify-between gap-2 items-center">
            <h2 className="flex justify-between w-full">
                <span>{reflection.title ? reflection.title : "untitled"}</span>
                <span> {formattedDate}</span>
            </h2>
            <FiChevronDown
            className={`transition-transform duration-300 ${
                open ? "rotate-180" : ""
            }`}
            />
        </div>

        {/* dropdown content */}
        <div
            className={`transition-all duration-300 overflow-hidden ${
            open ? "max-h-40 mt-2" : "max-h-0"
            }`}
        >
            <p className="text-sm">{reflection.description}</p>
        </div>
        </div>
    )
}