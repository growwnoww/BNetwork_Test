import { LineChartComponent } from "@/components/(dashboard-page)/charts/line-chart";
import { NFTInfoComponent } from "@/components/(dashboard-page)/charts/NFT-Info-chart";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import React from "react";

type Props = {};

function NFTsInfo({}: Props) {
  return (
    <>
      <Tabs defaultValue="account" className="">
        <TabsList>
          <TabsTrigger value="account">Royalty NFTs</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2">
        <Card className="h-fit flex  flex-col items-center">
          <div className="flex  flex-col gap-y-2  m-4">
            <Card className="flex items-center justify-center ">
              <video
                autoPlay
                loop
                muted
                height={300}
                width={350}
                className=" rounded-xl"
                >
                <source
                  src="/Venus_NFT.mp4"
                  type="video/mp4"
                  className="rounded-xl object-center"
                />
              </video>
            </Card>
          </div>

          <Card className="w-[68%] mx-10 h-24 mb-2">
            <div className="flex flex-col    text-sm">
              <div className=" my-3 px-6 flex justify-between   w-[65%]">
                <span className="text-muted-foreground">NFT ID: </span>
                <span className="flex items-center  gap-x-2 ">#24</span>
              </div>
              <Separator
                orientation="horizontal"
                className=" w-[90%] translate-x-2"
              />
              <div className="my-3 px-6 flex items-center justify-between   w-[65%]">
                <span className="text-muted-foreground">NFT Name: </span>

                <span className="flex items-center gap-x-2">Venus NFT</span>
              </div>
            </div>
          </Card>
        </Card>
        <Card className="">
          <LineChartComponent />
        </Card>
        <Card className="">
          <NFTInfoComponent />
        </Card>
      </div>
    </>
  );
}

export default NFTsInfo;
