import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

type TimelineBlobProps = {
  offset: number;
  output?: string | null;
  reflection?: string | null;
  vertical?: boolean;
};

export default function TimelineBlob({
  offset,
  output = null,
  reflection = null,
  vertical = true,
}: TimelineBlobProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          role="button"
          tabIndex={0}
          aria-label="Open timeline item"

          className="absolute h-5 w-5 rounded-full bg-white ring-1 ring-input shadow cursor-pointer hover:cursor-pointer hover:scale-110 transition-transform duration-200"
          style={vertical? {top: `calc(${offset}%) - 7px`, left: "-7px"}:{ left: `calc(${offset}% - 7px)`, top: "-7px"}}
        />
      </PopoverTrigger>
      <PopoverContent side={vertical ? "right" : "top"} align="center" className=" max-w-50 px-3 py-2 text-sm">

        {output && (
        <div>
          <h2>output</h2>
          <p className="text-muted-foreground whitespace-pre-wrap">{output}</p>
        </div>
        )}
        {reflection && (  
        <div>
          <h2>reflection</h2>
          <p className="text-muted-foreground">{reflection}</p>
        </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
