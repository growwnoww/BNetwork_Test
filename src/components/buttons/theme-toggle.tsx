"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"

export function ModeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // When mounted on the client, set the mounted state to true
  useEffect(() => setMounted(true), [])

  const currentTheme = theme === "system" ? systemTheme : theme

  const handleThemeMode = () => {
    if (currentTheme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  // Prevent rendering until the component has mounted to ensure the correct theme is loaded
  if (!mounted) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" onClick={handleThemeMode} className="rounded-full">
          {currentTheme === "dark" ? (
            <SunIcon className="h-[1.2rem] w-[1.2rem] transition-all" />
          ) : (
            <MoonIcon className="h-[1.2rem] w-[1.2rem] transition-all" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  )
}
