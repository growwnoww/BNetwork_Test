'use client';
import React, { use } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Card,
    CardHeader,
    CardDescription,
    CardTitle,
    CardContent,
    CardFooter,
  } from "@/components/ui/card"
import Image from 'next/image';
import { FiCopy } from 'react-icons/fi';
import { handleCopy, shortenAddress } from '@/helper';
import { Separator } from '@/components/ui/separator';
import { Users } from 'lucide-react';
import { ScrollAreaDemo } from '@/components/(dashboard-page)/scroll-bar';
import { BNCoinPieChart } from '@/components/(dashboard-page)/charts/bn-coin-piechart';
import { CircleProgress } from '@/components/(dashboard-page)/charts/circle-progress';
import { useActiveAccount } from 'thirdweb/react';
import { UserTypes } from '@/actions/dashboardhome/types';



export default function UserInfo ({user}:{user:UserTypes | null} ) {

  const activeAccount = useActiveAccount();



  return (
    <>

        <Tabs defaultValue="account" className="">
          <TabsList>
            <TabsTrigger value="account">CosMos Network</TabsTrigger>
            <TabsTrigger value="password">U-ClubA</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="">
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-y-3   gap-x-2 ">
            <Card className='bg-none h-fit'>
              <div className=" flex flex-col gap-y-4">
                <Card className="border-none">
                  <div className=" flex flex-col gap-y-2  m-4">
                    <Card className="w-full  h-[25rem] flex items-center justify-center ">
                      <Image
                        src={`/Moon.png`}
                        alt="earth"
                        height={200}
                        width={300}
                        className="mx-5"
                      />
                    </Card>

                    <Card className=" h-36 mt-2">
                      <div className="flex flex-col    text-sm">
                        <div className=" my-3 px-6 flex justify-between   w-[65%]">
                          <span className="text-muted-foreground">BN ID: </span>
                          <span className="flex items-center  gap-x-2 ">
                            {user?.bn_id}{" "}
                            <FiCopy className="hover:text-muted-foreground" />
                          </span>
                        </div>
                        <Separator
                          orientation="horizontal"
                          className=" w-[90%] translate-x-2"
                        />
                        <div className="my-3 px-6 flex items-center justify-between   w-[65%]">
                          <span className="text-muted-foreground">
                            Wallet:{" "}
                          </span>
                          <span className="flex items-center gap-x-2">
                            {shortenAddress(user?.wallet_address!)}{" "}
                            <FiCopy className="hover:text-muted-foreground" onClick={()=>handleCopy(user?.wallet_address!)} />
                          </span>
                        </div>
                        <Separator
                          orientation="horizontal"
                          className=" w-[90%] translate-x-2"
                        />
                        <div className="my-3 px-6 flex items-center justify-between   w-[65%]">
                          <span className="text-muted-foreground">
                            Sponser:{" "}
                          </span>
                          <span className="flex items-center gap-x-2">
                            {shortenAddress(user?.sponser_address!)}
                          <FiCopy className="hover:text-muted-foreground" onClick={()=>handleCopy(user?.sponser_address!)}/>
                          </span>
                        </div>
                      </div>
                    </Card>

                    <Card x-chunk="dashboard-01-chunk-01 " className="flex border-none items-center justify-between gap-x-5">
                     <Card className="w-64" >
                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Direct Team
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{user?.directTeam_Count}</div>
                        <p className="text-xs text-muted-foreground">
                          +180.1% from last month
                        </p>
                      </CardContent>
                     </Card>
                     <Card className="w-64">
                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Total Team
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{user?.totalTeam_Count}</div>
                        <p className="text-xs text-muted-foreground">
                          +180.1% from last month
                        </p>
                      </CardContent>
                     </Card>
                
                    </Card>
                  </div>
                </Card>
              </div>
            </Card>

              <ScrollAreaDemo user={user} />
            

            <Card className="flex flex-col">
            <BNCoinPieChart />

              <CircleProgress />

            </Card>
          </div>
        </div>

    </>
  )
}

