import Spinner from "@/components/ui/loading-spinner";
import { useGoalStore } from "../stores/useGoalsStore";
import GoalDisplayHeavy from "./goal-display-heavy";

type props = {
    className?: string;
}
export default function PickGoal({className}: props) {

    const goals = useGoalStore((state) => state.goals);
    return (
    <div className={`${className} flex flex-col items-center justify-start gap-4`}>
        <h2>pick something to work towards</h2>
        {goals? (
            <div className="grid grid-cols-2 gap-4">
            {goals.filter((goal)=>goal.is_focused).map((goal) => (
                <GoalDisplayHeavy className="w-60" key={goal.id} goal={goal}/>
            ))}
            </div>

        ):(
            <Spinner/>
        )}
    </div>
    )
}