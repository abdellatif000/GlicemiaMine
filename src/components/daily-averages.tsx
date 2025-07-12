
// src/components/daily-averages.tsx
"use client";

import type { DailyAverage } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Droplets, Syringe } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DailyAveragesProps {
  averages: DailyAverage[];
}

export function DailyAverages({ averages }: DailyAveragesProps) {
  if (averages.length === 0) {
    return null;
  }

  const getGlycemiaVariant = (glycemia: number) => {
    if (glycemia < 0.70) return "warning";
    if (glycemia >= 0.70 && glycemia <= 1.40) return "success";
    if (glycemia > 1.40 && glycemia <= 1.80) return "warning";
    return "destructive";
  };
  
  const cardVariants = {
    success: "bg-green-500/10 dark:bg-green-900/40 border-green-500/30 dark:border-green-700/80",
    warning: "bg-yellow-500/10 dark:bg-yellow-900/40 border-yellow-500/30 dark:border-yellow-700/80",
    destructive: "bg-red-500/10 dark:bg-red-900/40 border-red-500/30 dark:border-red-700/80",
    default: "bg-card"
  }
  
  const iconVariants = {
    success: "text-green-600 dark:text-green-400",
    warning: "text-yellow-600 dark:text-yellow-400",
    destructive: "text-red-600 dark:text-red-400",
    default: "text-primary"
  }

  return (
    <div>
        <h2 className="text-xl font-bold mb-4">Daily Averages</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {averages.map((avg) => {
            const variant = getGlycemiaVariant(avg.avgGlycemia);
            return (
                <Card 
                  key={avg.date.toISOString()} 
                  className={cn("transition-colors", cardVariants[variant])}
                >
                <CardHeader>
                    <CardTitle className="text-lg">{format(avg.date, "PPP")}</CardTitle>
                    <CardDescription>{avg.entryCount} {avg.entryCount > 1 ? 'entries' : 'entry'}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="flex items-center gap-3">
                        <div className={cn("flex h-10 w-10 items-center justify-center rounded-full", iconVariants[variant], cardVariants[variant])}>
                            <Droplets className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Avg. Glycemia</p>
                            <p className="font-semibold text-lg">{avg.avgGlycemia.toFixed(2)} g/L</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                         <div className={cn("flex h-10 w-10 items-center justify-center rounded-full", iconVariants['default'], 'bg-primary/10')}>
                            <Syringe className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Avg. Novorapid</p>
                            <p className="font-semibold text-lg">{avg.avgNovorapid.toFixed(1)} units</p>
                        </div>
                    </div>
                </CardContent>
                </Card>
            )
        })}
        </div>
    </div>
  );
}
