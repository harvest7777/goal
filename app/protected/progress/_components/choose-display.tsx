"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDashboardStore } from "../../stores/useDashboardStore"

export function ChooseProgressDisplay() {
  const view = useDashboardStore((state)=>state.view);
  const setView = useDashboardStore((state)=>state.setView);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="sidebar">{view} view</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>progress display</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={view ? view : ""} onValueChange={setView}>
          <DropdownMenuRadioItem value="day">day</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="week">week</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
