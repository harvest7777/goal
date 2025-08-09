'use client'
import supabase from '@/lib/supabase/supabase'
import { use, useEffect, useState } from 'react'
import DisplayReflection from '@/app/dashboard/goals/[goalId]/reflect/_components/display-reflection'
import CenteredSpinner from '@/components/ui/centered-spinner'
 
export default function GoalReflections({
  params,
}: {
  params: Promise<{ goalId: string }>
}) {
  const { goalId } = use(params)
  const [reflections, setReflections] = useState<Reflection[] | null>(null);
  useEffect(()=>{
    const init = async() => {
        const { data, error } = await supabase
          .from('reflections')
          .select('*')
          .order('created_at', { ascending: false })
          .eq('goal_id', goalId);
        if (error) {
          console.error('Error fetching reflections:', error);
          return;
        }
        setReflections(data);
    }
    init();
  },[])

  if (!reflections) {
    return ( 
      <CenteredSpinner/>
    )
  }
  return (
    <div className="flex flex-col items-center justify-center align-middle w-full">
        <h1>reflect</h1>
        <div className="w-1/2 flex flex-col gap-4 items-center align-middle justify-center mt-10">
          {reflections?.map((reflection) => (
              <DisplayReflection className='w-full' key={reflection.id} reflection={reflection} />
          ))}
        </div>
    </div>
  )
}