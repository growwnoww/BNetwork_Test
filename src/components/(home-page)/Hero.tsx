'use client'
import React from "react";
import { GradualSpacingText } from "../texts/GradualSpacing";
import { HeroHighlightDemo } from "./backgrounds/HeroHighlight";
import WalletConnect from "../buttons/wallet-connect";

export function Hero() {
  return (
    <div className="h-[50rem] w-screen   relative ">
      {/* Radial gradient for the container to give a faded look */}
     <HeroHighlightDemo/>
     <WalletConnect/>
    </div>
  );
}
