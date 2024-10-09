"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A donut chart with text"

const chartData = [
  { browser: "chrome", visitors: 61.25  , fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 60.5  , fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 20.7
  , fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 10.05  , fill: "var(--color-edge)" },
  { browser: "other", visitors: 0, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "BN Max Rewards Coins",
  },
  chrome: {
    label: "BN Max Airdrop Coins",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "BN Airdrop Coins",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Airdrop Refer Coins",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "BN Reward Coin",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Total BN Coin ",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function BNCoinPieChart() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  return (
    <Card className="flex flex-col m-1">
      <CardHeader className="items-center pb-0">
        <CardTitle>BN Coin Distribution</CardTitle>

      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Coin Earned
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Showing Your BN Coin <TrendingUp className="h-4 w-4" />
        </div>
    
      </CardFooter>
    </Card>
  )
}
