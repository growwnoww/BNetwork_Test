'use client'
import React from "react";
import { GradualSpacingText } from "../texts/GradualSpacing";
import { HeroHighlightDemo } from "./backgrounds/HeroHighlight";

export function Hero() {
  return (
    <div className="h-[50rem] w-screen  dark:bg-grid-small-white/[0.5] bg-grid-small-black/[0.4] relative ">
      {/* Radial gradient for the container to give a faded look */}
     <HeroHighlightDemo/>
    </div>
  );
}
