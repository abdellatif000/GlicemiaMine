// src/components/glucose-chart.tsx
"use client"

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { format } from 'date-fns';
import type { GlucoseEntry } from "@/lib/types";
import { ChartContainer, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

interface GlucoseChartProps {
    data: GlucoseEntry[];
}

const chartConfig = {
  glycemia: {
    label: "Glycemia (g/L)",
    color: "hsl(var(--chart-1))",
  },
  novorapidDosage: {
    label: "Novorapid (units)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function GlucoseChart({ data }: GlucoseChartProps) {
    const chartData = data.map(entry => ({
        name: format(entry.date, 'MMM d, HH:mm'),
        glycemia: entry.glycemia,
        novorapidDosage: entry.novorapidDosage,
    })).reverse();

    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <ResponsiveContainer width="100%" height={350}>
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => value.split(',')[0]}
                    />
                    <YAxis yAxisId="left"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                    />
                    <YAxis yAxisId="right" orientation="right"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Line yAxisId="left" type="monotone" dataKey="glycemia" stroke={chartConfig.glycemia.color} strokeWidth={2} dot={true} />
                    <Line yAxisId="right" type="monotone" dataKey="novorapidDosage" stroke={chartConfig.novorapidDosage.color} strokeWidth={2} dot={true} />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
}
