"use client";
import {
  cosmosautopooldata,
  cosmosautpoolType,
} from "@/actions/cosmosautopool";
import { FaArrowLeft } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { shortenAddress } from "@/helper";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function AutopoolPage({
  params,
}: {
  params: { autopool: string };
}) {
  const value = 33;
  const [data, setData] = useState<cosmosautpoolType[] | null>();

  useEffect(() => {
    async function getCosmosPool() {
      const result: cosmosautpoolType[] | null = await cosmosautopooldata(
        "Earth"
      );
      console.log("result", result);
      setData(result);
    }

    getCosmosPool();
  }, []);

  return (
    <div className=" w-full h-full">
      <Link href="/dashboard/bnsystem/1/1">
        {" "}
        <div className="flex cursor-pointer  items-center justify-center gap-x-3  border-2 border-yellow-400  px-3 rounded-2xl  w-fit m-3 hover:bg-muted-foreground/15">
          <FaArrowLeft className="text-lg" />
          <p className="text-lg">Back</p>
        </div>
      </Link>

    <div className="flex flex-col lg:flex-row">
       <div className="max-w-full h-auto lg:h-[55rem] lg:w-[60rem] border  rounded-lg m-4">
        <div className="relative w-full h-[4rem] lg:h-[7rem] lg:w-[60rem] bg-neutral-900 rounded-tr-lg rounded-tl-lg ">
          <div
            className={`absolute   h-[4rem] w-[33%] lg:h-[7rem] lg:w-[33%]  border  bg-primary blur-lg opacity-10`}
          />

          <div className="flex items-center gap-x-4 ml-3 translate-y-3">
            <p className="text-md lg:text-2xl font-medium">Level 1{}</p>
            <p>.</p>
            <p className="text-md lg:text-2xl font-medium">5 USDT</p>
          </div>

          <div className="relative translate-y-[2rem] lg:translate-y-[5rem]">
            <p className="absolute -top-3 lg:-top-8 left-4 text-[0.5rem] lg:text-lg">
              33% Completed
            </p>
            <Progress className="" value={value} />
          </div>
        </div>

        <div className="max-w-full h-auto lg:h-[43rem] lg:w-[60rem] ">
          <Image
            src="/PlanetUpgradeTree.png"
            alt=""
            height={900}
            width={1000}
            className=""
          />
        </div>
        </div>

      <div className="w-full h-[40rem] lg:h-[55rem] border mx-3 mt-4 rounded-lg">
        <div className="  w-full h-[4rem] lg:h-[7rem]  bg-neutral-900 rounded-tr-lg rounded-tl-lg flex items-center justify-center">
         <p className="max-w-52 text-lg lg:text-2xl text-center">Recent Activity on CosMos Autopool</p>
        </div>

        <div className="border rounded-xl m-2 p-3">
        <div className="flex items-center mx-5 gap-x-4">
       <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="/avatar.jpg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
         <div className="flex flex-col  gap-x-3">
         <div className="flex items-center gap-x-3">
         <p className="text-lg">BN24fg7H89</p>
          <p className="text-sm text-muted-foreground"> 2 Days</p>
         </div>
          <p>{shortenAddress('0xA5F6Bd48911bE7b6dDB7bb8114b3119f8099eD55')}</p>
          <p>Income: 0.35 $</p>
          <p>Level : 1</p>
          <p>Recycle: 1</p>
          </div>
         
       </div>

       
        </div>

        <div className="border rounded-xl m-2 p-3">
        <div className="flex items-center mx-5 gap-x-4">
       <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="/avatar.jpg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
         <div className="flex flex-col  gap-x-3">
         <div className="flex items-center gap-x-3">
         <p className="text-lg">BN24fg7H89</p>
          <p className="text-sm text-muted-foreground"> 2 Days</p>
         </div>
          <p>{shortenAddress('0xA5F6Bd48911bE7b6dDB7bb8114b3119f8099eD55')}</p>
          <p>Income: 0.35 $</p>
          <p>Level : 1</p>
          <p>Recycle: 1</p>
          </div>
         
       </div>

       
        </div>

        <div className="border rounded-xl m-2 p-3">
        <div className="flex items-center mx-5 gap-x-4">
       <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="/avatar.jpg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
         <div className="flex flex-col  gap-x-3">
         <div className="flex items-center gap-x-3">
         <p className="text-lg">BN24fg7H89</p>
          <p className="text-sm text-muted-foreground"> 2 Days</p>
         </div>
          <p>{shortenAddress('0xA5F6Bd48911bE7b6dDB7bb8114b3119f8099eD55')}</p>
          <p>Income: 0.35 $</p>
          <p>Level : 1</p>
          <p>Recycle: 1</p>
          </div>
         
       </div>

       
        </div>
      </div>
    </div>
    </div>
  );
}
