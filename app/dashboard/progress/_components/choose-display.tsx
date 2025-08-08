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

interface ChooseProgressDisplayProps {
    display: string;
    setDisplay: React.Dispatch<React.SetStateAction<string>>;
}
export function ChooseProgressDisplay({ display, setDisplay }: ChooseProgressDisplayProps) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">lets see how we are doing {display}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>progress display</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={display} onValueChange={setDisplay}>
          <DropdownMenuRadioItem value="today">today</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="weekly">weekly</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
