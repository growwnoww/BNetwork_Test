"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ModeToggle } from "../buttons/theme-toggle";
import Image from "next/image";
import WalletConnect from "../buttons/wallet-connect";



export function Navbar() {

  return (
    <header className="bg-red-600">
      <div className="relative ">

        <Navbar_Inner className="top-2" />
      </div>
    </header>
  );
}

function Navbar_Inner({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn(
        "fixed top-10 inset-x-0 max-w-7xl mx-auto z-40  mt-5  ",
        className
      )}
    >


      <Menu setActive={setActive}>
        <div className="flex items-center justify-center space-x-5">
          <Link href="/">
            <div className="flex  items-start justify-center ">
           
              <p className="text-xl font-extrabold text-yellow-500">Believe</p>
              <p className="text-xl font-extrabold ">Network</p>
            </div>
          </Link>
          <Link href='/'>
          <MenuItem setActive={setActive} active={active} item="Home">
           
          </MenuItem></Link>
          
          <Link href='/dashboard'>
          <MenuItem setActive={setActive} active={active} item="Dashboard">
          </MenuItem>
          </Link>
     
         <Link href="/Resource">
         <MenuItem setActive={setActive} active={active} item="Resource">
          </MenuItem></Link>

          <Link href='/about'>
          <MenuItem setActive={setActive} active={active} item="About">
          </MenuItem></Link>

      
        </div>

        <div className="flex items-center space-x-10">
          <div className="flex items-center justify-center space-x-5">
              {" "}
              <WalletConnect/>
            <Link href="/registration">
              <button className=" border-black/55   dark:border-white/[0.3] px-3 py-1 rounded-2xl border">
                Registration
              </button>
            </Link>
          </div>

          <ModeToggle />
        </div>
      </Menu>
    </div>
  );
}
