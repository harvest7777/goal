"use client";

import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ChooseDayProps {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export function ChooseDay({ date, setDate }: ChooseDayProps) {
  let day = date?.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" }).toLowerCase();

  if (isToday(date)) {
    day = "today";
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">{day}</Button>
      </PopoverTrigger>
      <PopoverContent className="!p-0 !w-min">
      <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg"
        />
      </PopoverContent>
    </Popover>
  )
}

const isToday = (someDate: Date | undefined): boolean => {
  if (!someDate) return false;

  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};