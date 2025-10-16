/***
 * This page manages different ways of showing the user's progress on their current active goals.
 */
"use client";
import { useSearchParams } from "next/navigation";
import WeekProgressPage from "./_components/week-progress-page";
import DayProgressPage from "./_components/day-progress-page";
import { Suspense } from "react";

function ProgrssPageContent() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") || "day";
  const paramDate = searchParams.get("date");
  let date = new Date();

  if (paramDate) {
    date = new Date(paramDate);
  }

  return (
    <div>
      <DayProgressPage display={view} date={date} />
      <WeekProgressPage display={view} date={date} />
    </div>
  );
}

export default function ProgressPage() {
  return (
    <Suspense>
      <ProgrssPageContent />
    </Suspense>
  );
}
