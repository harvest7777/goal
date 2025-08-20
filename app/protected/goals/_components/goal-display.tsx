import Link from "next/link";
import { MdOutlineEdit } from "react-icons/md";
import { TfiThought } from "react-icons/tfi";
import ToggleFocusButton from "./toggle-focus-button";

interface GoalDisplayProps {
    goal: Goal;
    className?: string;
}
export default function GoalDisplay({ goal, className }: GoalDisplayProps) {
    return (
        <div className={`${!goal.is_focused && 'opacity-30'} border p-4 rounded-md ${className}`}>
            <h2 className="text-lg font-semibold">{goal.name}</h2>
            <p className="text-gray-600 whitespace-pre-line">{goal.motivator}</p>
            <div className="mt-3 flex gap-4">
                <Link className="text-sm text-muted-foreground flex gap-1 items-center align-middle justify-center" href={`goals/${goal.id}/edit`}>
                    <MdOutlineEdit />
                    edit
                </Link>
                <Link className="text-sm text-muted-foreground flex gap-1 items-center align-middle justify-center" href={`goals/${goal.id}/reflect`}>
                    <TfiThought />
                    reflections 
                </Link>
                <ToggleFocusButton goal={goal}/>
            </div>
        </div>
    )
}