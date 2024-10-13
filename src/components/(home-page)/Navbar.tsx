"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ModeToggle } from "../buttons/theme-toggle";
import WalletConnect from "../buttons/wallet-connect";
import { Button } from "../ui/button";
import {
  X,
  Menu,
  Package2,
  Home,
  ShoppingCart,
  Badge,
  Package,
  Users,
  LineChart,

  PanelLeftDashed,
  Workflow,
  MapPin,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavType {
  name: string;
  href: string;
  current: boolean;
}

interface HeaderRoundedWeb3Types {
  title?: string;
  navigationData: NavType[];
  loginPath?: string;
  signupPath?: string;
}

// {company heading, navigation, login ,signup, }
const HeaderRoundedWeb3 = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationData = [
    { name: "Home", href: "/", current: true },
    { name: "Dashboard", href: "/dashboard", current: false },
    { name: "Feature", href: "#", current: false },
    { name: "About", href: "#", current: false },
  ];

  const links = [
    {
      href: "#",
      label: "Home",
      icon: Home,
      className: "text-foreground hover:text-foreground",
    },
    {
      href: "#",
      label: "Dashboard",
      icon: PanelLeftDashed,
      className: "text-muted-foreground  hover:text-foreground",
    },
    {
      href: "#",
      label: "Feature",
      icon: Package,
      className: "text-muted-foreground hover:text-foreground",
    },
    {
      href: "#",
      label: "Roadmap",
      icon: MapPin,
      className: "text-muted-foreground hover:text-foreground",
    },
    {
      href: "#",
      label: "How it Works",
      icon: Workflow,
      className: "text-muted-foreground hover:text-foreground",
    },
  ];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <div className="relative  flex items-center justify-center h-24 z-30 ">
        <div className="border fixed bg-neutral-200 dark:bg-neutral-900 flex items-center  justify-between rounded-full w-[90%]  h-14   lg:[80%] xl:w-3/4">
          <div className="flex  items-center  w-fit lg:w-full justify-between ml-5 lg:mx-10 mt-4  mb-3 ">
            <Link href="/">
              <div className="flex  items-start justify-center ">
                <p className="text-xl font-extrabold text-yellow-500">
                  Believe
                </p>
                <p className="text-xl font-extrabold ">Network</p>
              </div>
            </Link>

            <div className="hidden lg:block">
              <div className="flex space-x-4">
                {navigationData.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? " text-black dark:text-white"
                        : "text-black/70 dark:text-gray-400  dark:hover:text-white",
                      "rounded-md px-3 py-2  lg:text-sm xl:text-md font-medium"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center gap-x-3">
              <div className="flex items-center space-x-10">
                <div className="flex items-center justify-center space-x-5">
                  {" "}
                  <WalletConnect />
                  <Link href="/registration">
                    <button className=" border-black/55   dark:border-white/[0.3] px-3 py-1 rounded-2xl border">
                      Registration
                    </button>
                  </Link>
                </div>

                <ModeToggle />
              </div>
            </div>
          </div>

          <Sheet>
            <SheetTrigger asChild className="">
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 lg:hidden z-50 mr-4 rounded-[8px]"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                > 

                  <span className="">Believe Network</span>
                </Link>

                <WalletConnect />

                <Link href="/registration">
                  <Button
                    variant="believe"
                    className=" border-black/55   dark:border-white/[0.3] px-10 py-0  rounded-3xl border"
                  >
                    Registration
                  </Button>
                </Link>

                {links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${link.className}`}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
      
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* <div className="lg:hidden">
              <Button
                variant="outline"
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-[8px]  p-1"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div> */}
        {/* 
        <div
          className={`lg:hidden ${
            isOpen
              ? "block absolute top-24 z-50 bg-white dark:bg-black   w-[80%] left-10 rounded-md border p-2 "
              : "hidden"
          }`}
        >
          <div className="  w-full">
            <div className="flex flex-col items-center space-x-10">
              <div className="flex flex-col items-center justify-center space-x-5">
                {" "}
                <WalletConnect />
                <Link href="/registration">
                  <Button variant="secondary" className=" border-black/55   dark:border-white/[0.3] px-3 py-1 rounded-xl border w-full">
                    Registration
                  </Button>
                </Link>
              </div>
            </div>
            {navigationData.map((item) => (
              <a
                key={item.name}
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "text-white bg-black dark:bg-white dark:text-black"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </a>
            ))}

            <ModeToggle />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default HeaderRoundedWeb3;
