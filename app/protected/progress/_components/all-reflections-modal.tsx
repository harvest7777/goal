import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Spinner from "@/components/ui/loading-spinner";

interface AllReflectionsModalProps {
    sessionData: {
        session_id: number;
        session_end: Date;
        output_description: string | null;
        reflection_description: string | null;
        goal_name: string | null;
    }[] | null;
}

export function AllReflectionsModalButton({ sessionData }: AllReflectionsModalProps) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
            <span className="text-cyan-800 hover:underline cursor-pointer">view all</span>
        </DialogTrigger>
        <DialogContent className="w-1/2 h-3/4 max-h-3/4 overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>all your thoughts throughout the day</DialogTitle>
            <div className="h-full flex flex-col items-center align-middle justify-center">
                {sessionData? (
                <ul className="max-h-full w-full overflow-y-auto flex flex-col mt-5">
                    {sessionData.map((session) => (
                    <li key={session.session_id} className="flex flex-col gap-2 border-b border-b-muted mb-5 pb-5">

                        <div>
                            <p className="text-muted-foreground">time investment: </p>
                            <p>{session.goal_name}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">output: </p>
                            <p>{session.output_description}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">reflection: </p>
                            <p>{session.reflection_description}</p>
                        </div>

                    </li>
                    ))}
                </ul>
                ):(<Spinner/>)}
            </div>
          </DialogHeader>
        </DialogContent>
      </form>
    </Dialog>
  )
}
