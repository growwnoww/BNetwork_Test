import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";

import {
  Bar,
  BarChart,
  Rectangle,
  ReferenceLine,
  XAxis,
  Label,
  YAxis,
  LabelList,
} from "recharts";
import { Button } from "../ui/button";
import { LineChartComponent } from "./charts/line-chart";
import { UserTypes } from "@/actions/dashboardhome/types";

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


export function ScrollAreaDemo({user}:{user:UserTypes | null}) {
  return (
    <ScrollArea className="h-[46rem] w-auto rounded-md border bg-black ">
      <div className="p-4 flex flex-col gap-y-4">


        <Card
          className="w-full " x-chunk="charts-01-chunk-4"
        >
          <CardContent className="flex gap-4 p-4 pb-2">
            <ChartContainer
              config={{
                move: {
                  label: "Upgrade",
                  color: "hsl(var(--chart-1))",
                },
                stand: {
                  label: "Direct",
                  color: "hsl(var(--chart-2))",
                },
                exercise: {
                  label: "Level ",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[140px] w-full"
            >
              <BarChart
                margin={{
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 10,
                }}
                data={[
                  {
                    activity: "Upgrade ",
                    value: user?.upgradeEarning!,
                    label:`${user?.upgradeEarning}$`,
                    fill: "var(--color-stand)",
                  },
                  {
                    activity: "Direct ",
                    value: user?.directEarning,
                    label:`${user?.directEarning}$`,
                    fill: "var(--color-exercise)",
                  },
                  {
                    activity: "Level ",
                    value: user?.levelEarning,
                    label:`${user?.levelEarning}$`,
                    fill: "var(--color-move)",
                  },
                ]}
                layout="vertical"
                barSize={32}
                barGap={2}
              >
                <XAxis type="number" dataKey="value" hide />
                <YAxis
                  dataKey="activity"
                  type="category"
                  tickLine={false}
                  tickMargin={4}
                  axisLine={false}
                  className="capitalize"
                />
                <Bar dataKey="value" radius={5}>
                  <LabelList
                    position="insideLeft"
                    dataKey="label"
                    fill="white"
                    offset={8}
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex flex-row border-t p-4">
            <div className="flex w-full items-center gap-2">
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">Upgrade Earning</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  {user?.upgradeEarning}
                  <span className="text-sm font-normal text-muted-foreground">
                    $
                  </span>
                </div>
              </div>
              <Separator orientation="vertical" className="mx-2 h-10 w-px" />
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">Direct Earning</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                 {user?.directEarning}
                  <span className="text-sm font-normal text-muted-foreground">
                    $
                  </span>
                </div>
              </div>
              <Separator orientation="vertical" className="mx-2 h-10 w-px" />
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">Level Earning</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  {user?.levelEarning}
                  <span className="text-sm font-normal text-muted-foreground">
                    $
                  </span>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card className="" x-chunk="charts-01-chunk-0">
          <CardHeader className="space-y-0 pb-2">
            <CardDescription>Total CosMos Autopool Earning</CardDescription>
            <CardTitle className="text-4xl tabular-nums">
              $1,584{" "}
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
                        return new Date(value).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        });
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
    </ScrollArea>
  );
}
