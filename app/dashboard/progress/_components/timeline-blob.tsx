import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

type TimelineBlobProps = {
  leftPosition: number; // percentage value for horizontal positioning
  output?: string | null;
  reflection?: string | null;
};

export default function TimelineBlob({
  leftPosition,
  output = null,
  reflection = null,
}: TimelineBlobProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          role="button"
          tabIndex={0}
          aria-label="Open timeline item"

          className="absolute h-3 w-3 rounded-full bg-white ring-1 ring-input shadow cursor-pointer hover:cursor-pointer hover:scale-110 transition-transform duration-200"
          style={{ marginLeft: `calc(${leftPosition}% - 1.5rem)`,
          }}
          
        />
      </PopoverTrigger>
      <PopoverContent side="top" align="center" className=" max-w-50 px-3 py-2 text-sm">
        
        {output && 
        <div>
          <h2>output</h2>
          <p className="text-muted-foreground whitespace-pre-wrap">{output}</p>
        </div>
        }
        {reflection && 
        <div>
          <h2>reflection</h2>
          <p className="text-muted-foreground">{reflection}</p>
        </div>
        }
      </PopoverContent>
    </Popover>
  );
}
