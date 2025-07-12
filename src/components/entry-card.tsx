
"use client";

import {
  CalendarDays,
  Clock,
  Droplets,
  Edit,
  Syringe,
  Trash2,
  Utensils,
} from "lucide-react";
import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { GlucoseEntry } from "@/lib/types";
import { Badge } from "./ui/badge";

interface EntryCardProps {
  entry: GlucoseEntry;
  onEdit: () => void;
  onDelete: () => void;
}

export function EntryCard({ entry, onEdit, onDelete }: EntryCardProps) {
  const mealTypeDisplay = {
    breakfast: "Breakfast",
    lunch: "Lunch",
    dinner: "Dinner",
    snack: "Snack",
  };
  
  return (
    <Card className="flex flex-col group">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <CalendarDays className="h-5 w-5 text-muted-foreground" />
                    <span>{format(entry.date, "PPP")}</span>
                </CardTitle>
                <CardDescription className="flex items-center gap-2 pt-1">
                    <Clock className="h-4 w-4" />
                    <span>{entry.time}</span>
                </CardDescription>
            </div>
             <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" onClick={onEdit} aria-label="Edit Entry">
                    <Edit className="h-4 w-4" />
                </Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" aria-label="Delete Entry">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this
                        entry.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
        <div className="flex items-start gap-4">
          <Utensils className="h-6 w-6 text-muted-foreground mt-1" />
          <div>
            <p className="text-sm text-muted-foreground">Meal Type</p>
            <div className="font-semibold text-base">
                <Badge variant="outline">{mealTypeDisplay[entry.mealType]}</Badge>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Droplets className="h-6 w-6 text-muted-foreground mt-1" />
          <div>
            <p className="text-sm text-muted-foreground">Glycemia</p>
            <p className="font-semibold text-base">{entry.glycemia.toFixed(2)} g/L</p>
          </div>
        </div>
        <div className="flex items-start gap-4 col-span-1 sm:col-span-2">
          <Syringe className="h-6 w-6 text-muted-foreground mt-1" />
          <div>
            <p className="text-sm text-muted-foreground">Novorapid Dosage</p>
            <div className="font-semibold text-base">{entry.novorapidDosage} units</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
