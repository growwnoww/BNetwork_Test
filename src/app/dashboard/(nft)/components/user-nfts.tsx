'use client'
import React, { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NFTCard } from '@/app/dashboard/(nft)/components/nft-cards';
import { GetNFTSTypes } from '@/actions/royaltynft/types';
import { TabsContent } from '@radix-ui/react-tabs';
import { getNFTName } from '@/helper';
import { useRecoilState } from 'recoil';
import { disableIdsAtom } from '@/store/recoil-store/nftStates';





const UserNFTs = ({userNFTs}:{userNFTs:GetNFTSTypes[]}) => {
  const [disableIds, setDisableIds] = useRecoilState(disableIdsAtom);

  useEffect(() => {

    setDisableIds([]);


    return () => {

    };
  }, []);



  return (
    <div className="border-t flex flex-col">
    <div className="mx-16">
      <p className="text-3xl font-semibold text-start mt-3">Your NFTs</p>
    </div>

    <Tabs defaultValue="AllNFTs" className="">
      {/* <TabsList className=" mx-14 my-4">
        <TabsTrigger value="AllNFTs" className="">
          All NFTs
        </TabsTrigger>
        <TabsTrigger value="EarthNFT">Earth NFTs</TabsTrigger>
        <TabsTrigger value="MarsNFT">Mars NFTs</TabsTrigger>
        <TabsTrigger value="VenusNFT">Venus NFTs</TabsTrigger>
        <TabsTrigger value="SaturnNFT">Saturn NFTs</TabsTrigger>
        <TabsTrigger value="NeptuneNFT">Neptune NFTs</TabsTrigger>


      </TabsList> */}
      <TabsContent value="AllNFTs" className="mx-16 grid grid-cols-1 gap-y-5 lg:grid-cols-4 xl:grid-cols-4 lg:gap-x-6 mb-7">
            {userNFTs.map((data) => (
              <NFTCard
                key={data.id}
                nftName={getNFTName(data.tokenType)}
                nftLevel={data.tokenType}
                nftId={data.tokenId}
              />
            ))}
          </TabsContent>

    <div className="mx-16 grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 lg:gap-x-6 mb-7">


        {
            userNFTs.map((data)=>(
                <TabsContent value={getNFTName(data.tokenType)} key={data.id}>
                    <NFTCard nftName={getNFTName(data.tokenType)} nftLevel={data.tokenType} nftId={data.tokenId}/>
                </TabsContent>
            ))
        }
    </div>
    </Tabs>

  </div>
  )
}

export default UserNFTs