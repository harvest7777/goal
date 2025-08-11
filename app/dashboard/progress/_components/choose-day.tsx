"use client";

import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react";

interface ChooseDayProps {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export function ChooseDay({ date, setDate }: ChooseDayProps) {
  let day = date?.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" }).toLowerCase();
  const [open, setOpen] = useState(false);

  if (isToday(date)) {
    day = "today";
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">{day}</Button>
      </PopoverTrigger>
      <PopoverContent className="!p-0 !w-min">
      <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {setDate(date); setOpen(false)}}
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