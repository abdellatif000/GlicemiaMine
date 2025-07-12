"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { glucoseEntrySchema, type GlucoseEntry } from "@/lib/types";

interface EntryFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  entryToEdit: GlucoseEntry | null;
  onSubmit: (data: GlucoseEntry) => void;
}

export function EntryForm({ isOpen, onOpenChange, entryToEdit, onSubmit }: EntryFormProps) {
  const form = useForm<GlucoseEntry>({
    resolver: zodResolver(glucoseEntrySchema),
    defaultValues: {
      date: new Date(),
      time: "",
      mealType: "breakfast",
      glycemia: 0,
      novorapidDosage: 0,
    },
  });

  React.useEffect(() => {
    if (entryToEdit) {
      form.reset({
        ...entryToEdit,
        date: new Date(entryToEdit.date),
      });
    } else {
      form.reset({
        date: new Date(),
        time: new Date().toTimeString().slice(0, 5),
        mealType: "breakfast",
        glycemia: 0,
        novorapidDosage: 0,
      });
    }
  }, [entryToEdit, form]);

  const onFormSubmit = (data: GlucoseEntry) => {
    onSubmit(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{entryToEdit ? "Edit Entry" : "Add New Entry"}</DialogTitle>
          <DialogDescription>
            {entryToEdit
              ? "Update the details of your entry."
              : "Log your blood glucose and insulin dosage."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <DatePicker value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mealType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meal Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a meal type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="breakfast">Breakfast</SelectItem>
                        <SelectItem value="lunch">Lunch</SelectItem>
                        <SelectItem value="dinner">Dinner</SelectItem>
                        <SelectItem value="snack">Snack</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="glycemia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Glycemia (g/L)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="novorapidDosage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Novorapid Dosage (units)</FormLabel>
                  <FormControl>
                    <Input type="number" step="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Saving..." : "Save Entry"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
