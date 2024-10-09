'use client'
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Activity, BadgeDollarSign, Network } from "lucide-react";
import { AiOutlineShareAlt } from "react-icons/ai";
import { BsBarChartLine } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

export function PlanetStack({planetId}:{planetId:number}) {
    const getPlanetName = (planetNum: number): string => {
        const planetNames: { [key: number]: string } = {
            1: 'Earth',
            2: 'Moon',
            3: 'Mars',
            4: 'Mercury',
            5: 'Venus',
            6: 'Jupiter',
            7: 'Saturn',
            8: 'Uranus',
            9: 'Neptune',
            10: 'Pluto'
        };
    
        return planetNames[planetNum] || 'Unknown Planet'; 
    }

    const projects = [
        {
          title: <AiOutlineShareAlt className="text-[7rem] rotate-90 text-yellow-400 text-center" />
          ,
          description:"Earth Autopool",
          link: `/dashboard/bnsystem/1/${planetId}/${getPlanetName(planetId)}`,
        },
        {
          title: <RiMoneyDollarCircleLine className="text-[7rem] text-yellow-400 text-center" />,
          description:"Income From Earth ",
          link: "https://netflix.com",
        },
        {
          title: <BsBarChartLine className="text-[7rem] text-yellow-400 text-center" />,
      
          description:"Earth Planet Status",
          link: "https://google.com",
        },
        
      ];
    
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />

    </div>
  );
}

