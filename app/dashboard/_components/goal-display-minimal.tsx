type props = {
    goal: Goal;
    className?: string;
}
export default function GoalDisplayMinimal({ goal, className }: props) {
    return (
        <div className={`${className} rounded-sm outline outline-1 ${goal.is_focused ? 'outline-foreground' : 'outline-muted-foreground text-muted-foreground'} p-1 relative overflow-hidden`}>
            <h2 className="z-10 relative">{goal.name}</h2>
            <div className="absolute h-full top-0 left-0 bg-muted"></div>
        </div>
    );
} 