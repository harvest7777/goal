"use client";

import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function ChooseDayContent() {
  const [open, setOpen] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const paramDate = searchParams.get("date");
  let date = new Date();

  if (paramDate) {
    date = new Date(paramDate);
  }

  let day = date?.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" }).toLowerCase();

  if (isToday(date)) {
    day = "today";
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="sidebar">{day}</Button>
      </PopoverTrigger>
      <PopoverContent className="!p-0 !w-min">
      <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {setSearchParamsDate(newDate ? newDate : date); setOpen(false)}}
          className="rounded-lg"
        />
      </PopoverContent>
    </Popover>
  )
}

export function ChooseDay() {
  return (
    <Suspense>
      <ChooseDayContent />
    </Suspense>
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

const setSearchParamsDate = (date: Date) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set("date", date.toISOString());
  window.history.replaceState({}, "", `${window.location.pathname}?${searchParams}`);
};