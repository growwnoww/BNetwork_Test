"use client";
import { AreaGradientChart } from "@/components/(dashboard-page)/charts/AreaGradientChar";
import { PieChartComp } from "@/components/(dashboard-page)/charts/PieChart";
import RecentTransaction from "@/components/(dashboard-page)/RecentTransaction";
import { Hero } from "@/components/(home-page)/Hero";
import { GradualSpacingText } from "@/components/texts/GradualSpacing";
import { Button } from "@/components/ui/button";
import { FiCopy } from "react-icons/fi";

import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { Bird, Orbit, Eclipse, Turtle, Users, Copy } from "lucide-react";
import React, { Suspense, useState } from "react";
import {
  Bar,
  BarChart,
  Rectangle,
  ReferenceLine,
  XAxis,
  Label,
} from "recharts";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeAccountState } from "@/global/recoil-store/walletState";
import { getDirectTeam } from "@/actions/dashboardhome";
import DirectTeam from "@/components/card/directteam";
import { shortenAddress } from "@/helper";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface valueType {
  Plan: string;
}

const planets: { [key: number]: string } = {
  1: "Ear ",
  2: "Mo",
  3: "Mar",
  4: "Mer",
  5: "Ven ",
  6: "Jup ",
  7: "Sat ",
  8: "Ura",
  9: "Nep ",
  10: "Plu ",
};

interface SelectItemType {
  id: number;
  value: string;
  data: string;
  icon: string;
}
const iconMap = {
  Orbit,
  Eclipse,
};

const SelectPlan: SelectItemType[] = [
  {
    id: 1,
    value: "CosMos Network",
    data: "CosMos Network",
    icon: "Eclipse",
  },
  {
    id: 2,
    value: "Club-A",
    data: "Club-A",
    icon: "Orbit",
  },
];

const DashboardPage = () => {
  const [value, setValue] = useState<valueType>({ Plan: "CosMos Network" });
  const [userAddress,setUserAdress] = useRecoilState(activeAccountState)
  // const {data} = useSession()
  // console.log("user us",userAddress)

  const router = useRouter()

  const handleSelectPlanChange = (selectedLevel: string) => {
    setValue((prevState: any) => ({
      ...prevState,
      Plan: selectedLevel,
    }));
  };

 
  // if(!data?.user){
  //    router.push('/')
  // }




  return (
<Suspense>
<main className="flex flex-1 flex-col h-full   gap-4 p-4 lg:gap-6 lg:p-6 ">
      <div>
        <p className="text-xl md:text-2xl lg:text-4xl font-semibold  w-fit">
          Welcome Back 0x01243..98f21 👋🏻
        </p>
      </div>

      <div className="flex   gap-x-8">
        <div className=" flex  w-[55rem] flex-col gap-y-5">
          <div className="">
            <Card
              className="sm:col-span-2 h-[37rem]   flex"
              x-chunk="dashboard-05-chunk-0"
            >
              <div className="w-full h-[32rem]  m-4">
                <Card className="w-full h-[25rem] "></Card>

                <Card className=" h-36 mt-2">
                  <div className="flex flex-col    text-sm">
                    <div className=" my-3 px-6 flex justify-between   w-[65%]">
                      <span className="text-muted-foreground">BN ID: </span>
                      <span className="flex items-center  gap-x-2 ">
                        BN231Rf34c{" "}
                        <FiCopy className="hover:text-muted-foreground" />
                      </span>
                    </div>
                    <Separator
                      orientation="horizontal"
                      className=" w-[90%] translate-x-2"
                    />
                    <div className="my-3 px-6 flex items-center justify-between   w-[65%]">
                      <span className="text-muted-foreground">Wallet: </span>
                      <span className="flex items-center gap-x-2">
                        {shortenAddress(userAddress!)}{" "}
                        <FiCopy className="hover:text-muted-foreground" />
                      </span>
                    </div>
                    <Separator
                      orientation="horizontal"
                      className=" w-[90%] translate-x-2"
                    />
                    <div className="my-3 px-6 flex justify-between   w-[65%]">
                      <span className="text-muted-foreground">Sponser: </span>
                      <span className="">0x02341...c85</span>
                      <FiCopy className="hover:text-muted-foreground" />
                    </div>
                  </div>
                </Card>
              </div>

              <div className="w-1/2 h-full  mx-4  flex flex-col justify-center gap-y-3">
                <div className="grid  w-36">
                  <Select
                    name="selectTieTeamLevels"
                    value={value.Plan}
                    onValueChange={handleSelectPlanChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent defaultValue="CosMos Network">
                      {SelectPlan.map((item: SelectItemType) => {
                        const IconComponent =
                          iconMap[item.icon as keyof typeof iconMap]; // Dynamically get the icon component

                        return (
                          <SelectItem key={item.id} value={item.value}>
                            <div className="flex items-start gap-3 text-muted-foreground">
                              {/* Render the icon dynamically */}
                              {IconComponent && (
                                <IconComponent className="size-5" />
                              )}
                              <div className="grid gap-0.5 place-items-center">
                                <p className="text-xs mt-0.5" data-description>
                                  {item.data}
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-x-3 ">
                  <Card className="w-48  " x-chunk="charts-01-chunk-3">
                    <CardHeader className="p-4 pb-0 ">
                      <CardTitle className="text-2xl flex gap-x-2">
                        <span>
                          <Users />
                        </span>

                        <span className="text-xl">Direct Team</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className=" w-fit  gap-4 p-4 pt-0">
                      <div className="flex flex-row items-center justify-center gap-1 text-3xl font-bold tabular-nums leading-none">
                        <ChartContainer
                          config={{
                            steps: {
                              label: "Steps",
                              color: "hsl(var(--chart-1))",
                            },
                          }}
                          className=" w-16"
                        >
                          <BarChart
                            accessibilityLayer
                            margin={{
                              left: 0,
                              right: 0,
                              top: 0,
                              bottom: 0,
                            }}
                            data={[
                              {
                                date: "2024-01-01",
                                steps: 2000,
                              },
                              {
                                date: "2024-01-02",
                                steps: 2100,
                              },
                              {
                                date: "2024-01-03",
                                steps: 2200,
                              },
                              {
                                date: "2024-01-04",
                                steps: 1300,
                              },
                              {
                                date: "2024-01-05",
                                steps: 1400,
                              },
                              {
                                date: "2024-01-06",
                                steps: 2500,
                              },
                              {
                                date: "2024-01-07",
                                steps: 1600,
                              },
                            ]}
                          >
                            <Bar
                              dataKey="steps"
                              fill="#fcdb03"
                              radius={2}
                              fillOpacity={0.2}
                              activeIndex={2}
                              activeBar={<Rectangle fillOpacity={0.8} />}
                            />
                            <XAxis
                              dataKey="date"
                              tickLine={false}
                              axisLine={false}
                              tickMargin={4}
                              hide
                            />
                          </BarChart>
                        </ChartContainer>

                       <DirectTeam user={userAddress!}/>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="w-48  " x-chunk="charts-01-chunk-3">
                    <CardHeader className="p-4 pb-0 ">
                      <CardTitle className="text-2xl flex gap-x-2">
                        <span>
                          <Users />
                        </span>

                        <span className="text-xl">Total Team</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className=" w-fit  gap-4 p-4 pt-0">
                      <div className="flex flex-row items-center justify-center gap-1 text-3xl font-bold tabular-nums leading-none">
                        <ChartContainer
                          config={{
                            steps: {
                              label: "Steps",
                              color: "hsl(var(--chart-1))",
                            },
                          }}
                          className=" w-16"
                        >
                          <BarChart
                            accessibilityLayer
                            margin={{
                              left: 0,
                              right: 0,
                              top: 0,
                              bottom: 0,
                            }}
                            data={[
                              {
                                date: "2024-01-01",
                                steps: 2000,
                              },
                              {
                                date: "2024-01-02",
                                steps: 2100,
                              },
                              {
                                date: "2024-01-03",
                                steps: 2200,
                              },
                              {
                                date: "2024-01-04",
                                steps: 1300,
                              },
                              {
                                date: "2024-01-05",
                                steps: 1400,
                              },
                              {
                                date: "2024-01-06",
                                steps: 2500,
                              },
                              {
                                date: "2024-01-07",
                                steps: 1600,
                              },
                            ]}
                          >
                            <Bar
                              dataKey="steps"
                              fill="#fcdb03"
                              radius={2}
                              fillOpacity={0.2}
                              activeIndex={2}
                              activeBar={<Rectangle fillOpacity={0.8} />}
                            />
                            <XAxis
                              dataKey="date"
                              tickLine={false}
                              axisLine={false}
                              tickMargin={4}
                              hide
                            />
                          </BarChart>
                        </ChartContainer>

                        <span className="text-center">124</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="" x-chunk="charts-01-chunk-0">
                  <CardHeader className="space-y-0 pb-2">
                    <CardDescription>Total CosMos Income</CardDescription>
                    <CardTitle className="text-4xl tabular-nums">
                      $12,584{" "}
                      <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                        USDT
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        steps: {
                          label: "income $",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                    >
                      <BarChart
                        accessibilityLayer
                        margin={{
                          left: 4,
                          right: 2,
                        }}
                        data={[
                          { index: 1, steps: 2000 }, // Example data
                          { index: 2, steps: 2100 },
                          { index: 3, steps: 2000 },
                          { index: 4, steps: 1300 },
                          { index: 5, steps: 1400 },
                          { index: 6, steps: 2500 },
                          { index: 7, steps: 1600 },
                          { index: 8, steps: 1700 },
                          { index: 9, steps: 1800 },
                          { index: 10, steps: 1900 },
                        ]}
                      >
                        <Bar
                          dataKey="steps"
                          fill=" hsl(var(--primary))"
                          radius={7}
                          fillOpacity={0.6}
                          activeBar={<Rectangle fillOpacity={0.8} />}
                        />

                        <XAxis
                          dataKey="index" // Assuming your data's key for the X-axis is based on the index from 1 to 10
                          tickLine={false}
                          axisLine={false}
                          tickMargin={3}
                          tickFormatter={(value: any) => {
                            return planets[value] || ""; // Map the value to the corresponding planet or return an empty string
                          }}
                        />
                        <ChartTooltip
                          defaultIndex={0}
                          content={
                            <ChartTooltipContent
                              hideIndicator
                              labelFormatter={(value) => {
                                return new Date(value).toLocaleDateString(
                                  "en-US",
                                  {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  }
                                );
                              }}
                            />
                          }
                          cursor={false}
                        />
                        <ReferenceLine
                          y={1200}
                          stroke="hsl(var(--muted-foreground))"
                          strokeDasharray="7"
                          strokeWidth={2}
                          className=""
                        >
                          <Label
                            position="insideBottomLeft"
                            value="Average Income"
                            offset={10}
                            fill="hsl(var(--foreground))"
                          />
                          <Label
                            position="insideTopLeft"
                            value="12,343"
                            className="text-lg"
                            fill="hsl(var(--foreground))"
                            offset={10}
                            startOffset={100}
                          />
                        </ReferenceLine>
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                  <CardFooter className="flex-col items-start gap-1">
                    <Button
                      variant={"outline"}
                      size="lg"
                      className="w-full bg-muted/50"
                    >
                      Show
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </Card>
          </div>

          <div className="flex flex-col md:flex-row gap-x-9">
            <div className="w-96 ">
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>CosMos Autopool</CardDescription>
                  <CardTitle className="text-4xl">$1,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +25% from last week
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress
                    value={25}
                    aria-label="25% increase"
                    className="text-yellow-500"
                  />
                </CardFooter>
              </Card>
            </div>
            <div className="w-96 ">
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>Universe Club-A Autopool</CardDescription>
                  <CardTitle className="text-4xl">$1,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +25% from last week
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress
                    value={25}
                    aria-label="25% increase"
                    className="text-yellow-500"
                  />
                </CardFooter>
              </Card>
            </div>{" "}
          </div>

          <div className="w-[50rem]">
            <RecentTransaction />
          </div>
        </div>

        <div className="w-2/4 gap-y-5">
          <div className="mb-8">
            <AreaGradientChart />
          </div>

          <PieChartComp />
        </div>
      </div>
    </main>
</Suspense>
  );
};

export default DashboardPage;
