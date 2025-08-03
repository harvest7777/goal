import GoalsList from "./_components/goals-list";
import NewGoalForm from "./_components/new-goal-form";

export default function ManageGoalsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-10">
      <div className="w-1/3">
        <h1> manage goals</h1>
        <GoalsList className="w-full mt-2"/>
      </div>
      <div className="w-1/3">
        <h1>define a goal</h1>
        <NewGoalForm className="w-full"/>
      </div>
    </div>
  )
}