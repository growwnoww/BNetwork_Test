'use client'
import { NFTCard } from "@/app/dashboard/(nft)/components/nft-cards";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { MergeNFTBoxes } from "../../components/mergenftboxes";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { disableIdsAtom, nft2Info, nft3Info, selectNFT2, selectNFT3 } from "@/store/recoil-store/nftStates";

type Props = {
  params: {
    mergenfts: string[];
  };
};

export default async function NFTMergePage({params}: Props) {

  const [disableIds,setDisableIds] = useRecoilState(disableIdsAtom)
  const [nftName,nftId]  = params.mergenfts
  console.log(`nftName ${nftName} and nftId ${nftId}`)
  const [isSelectedNFT2,setSelectedNFT2] = useRecoilState(selectNFT2);
  const [isSelectedNFT3,setSelectedNFT3] = useRecoilState(selectNFT3);
  const [nft2Details,setNFT2Details] = useRecoilState(nft2Info);
  const [nft3Details,setNFT3Details] = useRecoilState(nft3Info);



  useEffect(()=>{
    setDisableIds([])
    setSelectedNFT2(false)
    setSelectedNFT3(false)
    setNFT2Details(null)
    setNFT3Details(null)

  },[])


  return (
    <div className="w-full h-full">
      <Link href="/dashboard/nft">
        {" "}
        <div className="flex cursor-pointer  items-center justify-center gap-x-3  border-2 border-yellow-400  px-3 rounded-2xl  w-fit m-3 hover:bg-muted-foreground/15">
          <FaArrowLeft className="text-lg" />
          <p className="text-lg">Back</p>
        </div>
      </Link>

      <div className="flex flex-col lg:flex-row">
        <div className="w-full h-[40rem] lg:h-[55rem] border mx-3 mt-4 rounded-lg">
          <div className="mt-5">
            <NFTCard nftName={nftName} nftLevel={1} nftId={Number(nftId)} />
          </div>

          <div className="mt-10">
            <MergeNFTBoxes nftName={nftName} nftId={Number(nftId)}/>
          </div>
        </div>

        

        <div className="max-w-full h-auto lg:h-[55rem] lg:w-[60rem] border  rounded-lg m-4">
          <div className="h-32 w-full  bg-neutral-900 rounded-tl-xl rounded-tr-xl flex flex-col items-center justify-center">
            <p className="text-3xl font-semibold ">Your NFT Bounce</p>
            <p className="text-sm text-primary">
              Your bonus can grow every 15 days, upgrade your NFT to increase
              your income
            </p>
          </div>

          <div>
         
          <Card className="h-40 mx-5 mt-4">
              <div className="flex items-end justify-end w-full">
                <p className="px-2 bg-neutral-800 w-fit rounded-xl text-muted-foreground">Token id #212</p>
              </div>
              <div className="flex items-center justify-between mx-9 mb-4">
                <div className="flex items-center justify-center h-32 w-fit  ">
                  <div className="flex flex-col items-center  gap-x-4 w-fit ">
                    <Image
                      src="/EarthNFTImg.png"
                      alt="NFT_Img"
                      height={100}
                      width={100}
                      className="rounded-xl"
                    />

                    {/* <div>
                      <p  className="text-sm text-muted-foreground/70">Earth NFT</p>
                      <p className="text-xs text-muted-foreground/70">Token ID: #21</p>
                    </div> */}
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center  w-fit">
                  <p className="text-xl">Time for withdraw</p>
                  <p className="text-xl">13h:09m:10s</p>
                </div>

                <div className="flex flex-col items-center justify-center  w-fit">
                  <span className="text-xl font-medium">$100</span>
                  <Button
                    variant="default"
                    className="px-5 py-1 h-6 rounded-[7px]"
                  >
                    Claim
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="h-40 mx-5 mt-4">
              <div className="flex items-end justify-end w-full">
                <p className="px-2 bg-neutral-800 w-fit rounded-xl text-muted-foreground">Token id #212</p>
              </div>
              <div className="flex items-center justify-between mx-9 mb-4">
                <div className="flex items-center justify-center h-32 w-fit  ">
                  <div className="flex flex-col items-center  gap-x-4 w-fit ">
                    <Image
                      src="/EarthNFTImg.png"
                      alt="NFT_Img"
                      height={100}
                      width={100}
                      className="rounded-xl"
                    />

                    {/* <div>
                      <p  className="text-sm text-muted-foreground/70">Earth NFT</p>
                      <p className="text-xs text-muted-foreground/70">Token ID: #21</p>
                    </div> */}
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center  w-fit">
                  <p className="text-xl">Time for withdraw</p>
                  <p className="text-xl">13h:09m:10s</p>
                </div>

                <div className="flex flex-col items-center justify-center  w-fit">
                  <span className="text-xl font-medium">$100</span>
                  <Button
                    variant="default"
                    className="px-5 py-1 h-6 rounded-[7px]"
                  >
                    Claim
                  </Button>
                </div>
              </div>
            </Card>


            <Card className="h-40 mx-5 mt-4">
              <div className="flex items-end justify-end w-full">
                <p className="px-2 bg-neutral-800 w-fit rounded-xl text-muted-foreground">Token id #212</p>
              </div>
              <div className="flex items-center justify-between mx-9 mb-4">
                <div className="flex items-center justify-center h-32 w-fit  ">
                  <div className="flex flex-col items-center  gap-x-4 w-fit ">
                    <Image
                      src="/EarthNFTImg.png"
                      alt="NFT_Img"
                      height={100}
                      width={100}
                      className="rounded-xl"
                    />

                    {/* <div>
                      <p  className="text-sm text-muted-foreground/70">Earth NFT</p>
                      <p className="text-xs text-muted-foreground/70">Token ID: #21</p>
                    </div> */}
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center  w-fit">
                  <p className="text-xl">Time for withdraw</p>
                  <p className="text-xl">13h:09m:10s</p>
                </div>

                <div className="flex flex-col items-center justify-center  w-fit">
                  <span className="text-xl font-medium">$100</span>
                  <Button
                    variant="default"
                    className="px-5 py-1 h-6 rounded-[7px]"
                  >
                    Claim
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="h-40 mx-5 mt-4">
              <div className="flex items-end justify-end w-full">
                <p className="px-2 bg-neutral-800 w-fit rounded-xl text-muted-foreground">Token id #212</p>
              </div>
              <div className="flex items-center justify-between mx-9 mb-4">
                <div className="flex items-center justify-center h-32 w-fit  ">
                  <div className="flex flex-col items-center  gap-x-4 w-fit ">
                    <Image
                      src="/EarthNFTImg.png"
                      alt="NFT_Img"
                      height={100}
                      width={100}
                      className="rounded-xl"
                    />

                    {/* <div>
                      <p  className="text-sm text-muted-foreground/70">Earth NFT</p>
                      <p className="text-xs text-muted-foreground/70">Token ID: #21</p>
                    </div> */}
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center  w-fit">
                  <p className="text-xl text-muted-foreground">Time for withdraw</p>
                  <p className="text-xl">13h:09m:10s</p>
                </div>

                <div className="flex flex-col items-center justify-center  w-fit">
                  <span className="text-xl font-medium">$100</span>
                  <Button
                    variant="default"
                    className="px-5 py-1 h-6 rounded-[7px]"
                  >
                    Claim
                  </Button>
                </div>
              </div>
            </Card>          </div>
        </div>
      </div>
    </div>
  );
}
