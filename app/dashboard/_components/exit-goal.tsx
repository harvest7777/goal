import { Button } from "@/components/ui/button";
import { useGoalStore } from "../stores/useGoalsStore";

export default function ExitGoal() {
  const setSelectedGoal = useGoalStore((state) => state.setSelectedGoal);
  return (
    <Button
      variant={"outline"}
      className="w-full"
      onClick={() => {
        // Reset the timer and goal selection
        setSelectedGoal(null);
      }}
    >
      leave
    </Button>
  );
}
