"use client";

import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useActiveAccount } from "thirdweb/react";
import { blockchainId, client } from "@/lib/client";
import { ethers5Adapter } from "thirdweb/adapters/ethers5";
import { ethers } from "ethers";
import {
  cosmosnetworkAbi,
  cosmosnetworkAddress,
  USDTAbi,
  USDTAddress,
} from "@/contract/cosmosnetwork";
import toast from "react-hot-toast";
import { buyPlanetStatus } from "@/actions/planetbuycosmos";
import { PlanetStack } from "./PlanetStack";
import { PlanetData } from "@/helper/planetData";
import Link from "next/link";


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SinglePackage({ planetId }: { planetId: number }) {


  const activeAccount = useActiveAccount();

  const approveUSDT = async () => {
    try {
      const signer = await ethers5Adapter.signer.toEthers({
        client,
        chain: blockchainId,
        account: activeAccount!,
      });

      const contractInstance = new ethers.Contract(
        cosmosnetworkAddress,
        cosmosnetworkAbi,
        signer
      );
      console.log(' contractInstance.address', contractInstance.address)

      const usdtInstance = new ethers.Contract(USDTAddress, USDTAbi, signer);
      const approveAmt = await usdtInstance.balanceOf(activeAccount?.address);
      console.log("Approve", approveAmt);
      const approve = await usdtInstance.approve(
        contractInstance.address,
        approveAmt
      );
      await approve.wait();
      console.log(approve);
    } catch (error) {
      console.log('something went wrong approve usdt',error)
    }
  };

  const buyPlanet = async () => {
    try {
      const signer = await ethers5Adapter.signer.toEthers({
        client,
        chain: blockchainId,
        account: activeAccount!,
      });

      console.log("signer", signer);

      const gasPrice = await signer.getGasPrice();
      const gasPriceOg = ethers.BigNumber.from(gasPrice).toNumber();

      const contractInstance = new ethers.Contract(
        "0xc190CDF5D2a53a18d4932d5E5af5FCa63eEcAFA4",
        cosmosnetworkAbi,
        signer
      );

      console.log("check planet id ", planetId);
      const buyPlanetTransaction = await contractInstance.buyPlannet(planetId);

      await buyPlanetTransaction.wait();

      if (buyPlanetTransaction.hash) {
        toast.success("planet buy successfully!");
      }

      await buyPlanetStatus(planetId)
    } catch (error) {
      console.log("something went wrong in buyPlanet ", error);
    }
  };

  return (
    <div className="bg-white dark:bg-black">
      <div className="bordre w-full flex items-center justify-start   mt-4">
     <Link href='/dashboard/bnsystem/1'>
     <Button variant="default" size="lg" className="ml-5 lg:ml-14">
          Back
        </Button>
     </Link>
      </div>
      <div className=" flex flex-col lg:flex-row">
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-4xl  lg:gap-x-8 lg:px-8  ">
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 overflow-hidden rounded-lg mx-5 h-fit border p-10">
            <Image
              alt={PlanetData[Number(planetId) -1 ].title}
              src={PlanetData[Number(planetId) -1].image}
              width={800}
              height={600}
              className=" "
            />
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10  sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-6 ">
          <div className="lg:col-span-2  lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300 sm:text-3xl">
              {PlanetData[Number(planetId) -1].title}
            </h1>
          </div>

          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900 dark:text-gray-300">
            {PlanetData[Number(planetId) -1].price}
            </p>

            <Button
              variant="default"
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent"
              onClick={approveUSDT}
            >
              Approve
            </Button>

            <Button
              variant="default"
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent"
              onClick={buyPlanet}
            >
              Buy Planet
            </Button>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1  lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="">
                <p className="text-base text-gray-900 dark:text-gray-300">
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PlanetStack planetId={planetId}/>
    </div>
  );
}
