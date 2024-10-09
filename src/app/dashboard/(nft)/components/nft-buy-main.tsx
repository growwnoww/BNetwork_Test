import React from "react";
import BuyEarthNFT from "./buyearthnft";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateJustNFT from "./create-just-nft";

const RenderNFTBuy = () => {
  return (
    <div className=" md:w-screen lg:w-full  mt-7">
      <Tabs defaultValue="create-nft" className="md:w-screen lg:w-full  ">
        <div className="w-full flex items-center justify-center ">
          <TabsList className="grid w-72 grid-cols-2 rounded-[7px]">
            <TabsTrigger value="create-nft" className="rounded-[7px]">
              Create Just NFT
            </TabsTrigger>
            <TabsTrigger value="mint-nft" className="rounded-[7px]">
              Mint NFT
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="create-nft">
          <CreateJustNFT />
        </TabsContent>
        <TabsContent value="mint-nft" >
          <BuyEarthNFT />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RenderNFTBuy;
