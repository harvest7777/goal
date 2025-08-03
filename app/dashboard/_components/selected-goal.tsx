import { useGoalStore } from "../stores/useGoalsStore";

type props = {
    className?: string;
}
export default function SelectedGoal({ className }: props) {
    const { selectedGoal } = useGoalStore((state) => state);
    if (!selectedGoal) return null;
    return (
        <div className={`text-center ${className}`}>
            <h1>{selectedGoal.name}</h1>
            <p className="mt-2">{selectedGoal.motivator}</p>
        </div>
    )
}