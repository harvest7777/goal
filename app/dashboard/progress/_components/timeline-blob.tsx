import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type TimelineBlobProps = {
  leftPosition: number; // percentage value for horizontal positioning
  className?: string;   // optional extra classes for the blob
  label?: string;       // popover text; defaults to "hi"
};

export default function TimelineBlob({
  leftPosition,
  className,
  label = "hi",
}: TimelineBlobProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          role="button"
          tabIndex={0}
          aria-label="Open timeline item"
          style={{ marginLeft: `calc(${leftPosition}% - 10px)` }}
          className={cn(
            "absolute h-5 w-5 rounded-full bg-green-500 ring-2 ring-white shadow cursor-pointer",
            "focus:outline-none focus:ring-4 focus:ring-green-200",
            className
          )}
        />
      </PopoverTrigger>
      <PopoverContent side="top" align="center" className="w-auto px-3 py-2 text-sm">
        {label}
      </PopoverContent>
    </Popover>
  );
}
