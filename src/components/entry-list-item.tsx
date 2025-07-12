
// src/components/entry-list-item.tsx
"use client";

import { Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
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
import { Button } from "@/components/ui/button";
import type { GlucoseEntry } from "@/lib/types";
import { TableCell, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";

interface EntryListItemProps {
  entry: GlucoseEntry;
  onEdit: () => void;
  onDelete: () => void;
}

export function EntryListItem({ entry, onEdit, onDelete }: EntryListItemProps) {
    const mealTypeDisplay: Record<GlucoseEntry['mealType'], string> = {
        breakfast: "Breakfast",
        lunch: "Lunch",
        dinner: "Dinner",
        snack: "Snack",
    };

  return (
    <TableRow className="group">
      <TableCell className="font-medium">{format(entry.date, "PPP")}</TableCell>
      <TableCell>{entry.time}</TableCell>
      <TableCell>
        <Badge variant="outline">
            {mealTypeDisplay[entry.mealType]}
        </Badge>
      </TableCell>
      <TableCell className="text-right">{entry.glycemia.toFixed(2)}</TableCell>
      <TableCell className="text-right">{entry.novorapidDosage}</TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
      </TableCell>
    </TableRow>
  );
}
