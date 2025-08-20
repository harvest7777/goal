/**
 * The goal of this page is to manage information of a specific goal.
 * @queryparams goalId - The ID of the goal to edit.
 */
'use client'
import { use} from 'react'
import { useGoalStore } from '@/app/protected/stores/useGoalsStore'
import CenteredSpinner from '@/components/ui/centered-spinner'
import EditGoalForm from './edit-goal-form'
 
export default function GoalReflections({
  params,
}: {
  params: Promise<{ goalId: string }>
}) {
  const { goalId } = use(params)
  const goals = useGoalStore((state) => state.goals);
  if (!goals) {
    return (
        <CenteredSpinner/>
    )
  }
  const goal = goals.find((goal) => goal.id === Number(goalId));
  if (!goal) {
    return <h1 className='text-center'>goal not found</h1>
  }
  return (
    <div className="flex flex-col items-center justify-center align-middle w-full">
        <h1>edit</h1>
        <EditGoalForm className="w-2/3" goal={goal} />
    </div>
  )
}