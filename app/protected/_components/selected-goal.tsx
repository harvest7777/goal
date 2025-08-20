import { useGoalStore } from "../stores/useGoalsStore";

type props = {
    className?: string;
}
export default function SelectedGoal({ className }: props) {
    const { selectedGoal } = useGoalStore((state) => state);
    if (!selectedGoal) return null;
    return (
        <div className={`${className}`}>
            <h1 className="text-center">{selectedGoal.name}</h1>
            <p className="mt-2 whitespace-pre-line">{selectedGoal.motivator}</p>
        </div>
    )
}