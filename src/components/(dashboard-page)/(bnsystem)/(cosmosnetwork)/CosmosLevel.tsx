import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import LevelIcon from "../Levelicon";
import Link from "next/link";




const CosmosLevel = () => {

    const levels = Array.from({ length: 10 }, (_, i) => i + 1);

  


    return (
        <div className="bg-muted/50 flex flex-col lg:flex-row gap-y-5 lg:gap-y-0 items-center justify-between py-8 m-3 rounded-md">
            <div className="text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl  px-3 font-semibold"> CosMos Network</div>
            <div className="flex flex-col lg:flex-row gap-y-6  items-center justify-center gap-x-9 mx-10">
                <div className="h-fit grid grid-cols-5 w-fit  gap-x-2 ">
                    {levels.map((index) => (
                        <LevelIcon
                            key={index}
                            level={index}
                            id={`planetUpgrade-level-${index + 1}`}
                            context="planetUpgrade"
                            planetCount={10}
                        />
                    ))}
                </div>
                <div className="flex items-center relative">
              <Link href='/dashboard/bnsystem/1'>
              <Button
            variant='default'
            size='lg'

            >Show</Button>
              </Link>
          </div>
            </div>
        </div>
    );
};

export default CosmosLevel;
