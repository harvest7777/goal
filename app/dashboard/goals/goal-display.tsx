import Link from "next/link";

interface GoalDisplayProps {
    goal: Goal;
    className?: string;
}
export default function GoalDisplay({ goal, className }: GoalDisplayProps) {
    return (
        <div className={`border p-4 rounded-md ${className}`}>
            <h2 className="text-lg font-semibold">{goal.name}</h2>
            <p className="text-gray-600">{goal.motivator}</p>
            <Link className="text-sm text-muted-foreground" href={`goals/${goal.id}/reflect`}>reflect</Link>
        </div>
    )
}