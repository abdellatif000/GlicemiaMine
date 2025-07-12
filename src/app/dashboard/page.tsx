
// src/app/dashboard/page.tsx
"use client";

import * as React from 'react';
import { PlusCircle, Info, LayoutGrid, List, BarChartHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EntryCard } from '@/components/entry-card';
import { EntryForm } from '@/components/entry-form';
import { AiSuggestion } from '@/components/ai-suggestion';
import type { DailyAverage, GlucoseEntry } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { initialEntries } from '@/lib/data';
import { EntryListItem } from '@/components/entry-list-item';
import { GlucoseChart } from '@/components/glucose-chart';
import { EmptyState } from '@/components/empty-state';
import { DailyAverages } from '@/components/daily-averages';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";


export default function DashboardPage() {
  const [entries, setEntries] = React.useState<GlucoseEntry[]>([]);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [entryToEdit, setEntryToEdit] = React.useState<GlucoseEntry | null>(null);
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const { toast } = useToast();

  React.useEffect(() => {
    try {
      const storedEntries = localStorage.getItem('glycemia-entries');
      if (storedEntries) {
        const parsedEntries = JSON.parse(storedEntries).map((entry: any) => ({
          ...entry,
          date: new Date(entry.date),
        }));
        setEntries(parsedEntries);
      } else {
        setEntries(initialEntries);
      }
    } catch (error) {
      console.error("Failed to parse entries from localStorage", error);
      setEntries(initialEntries);
    }
  }, []);

  React.useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('glycemia-entries', JSON.stringify(entries));
    } else {
      localStorage.removeItem('glycemia-entries');
    }
  }, [entries]);

  const handleOpenForm = (entry: GlucoseEntry | null = null) => {
    setEntryToEdit(entry);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: GlucoseEntry) => {
    if (entryToEdit) {
      // Update
      setEntries(entries.map((e) => (e.id === entryToEdit.id ? { ...data, id: e.id } : e)));
      toast({ title: "Success", description: "Entry updated successfully." });
    } else {
      // Add
      setEntries([{ ...data, id: new Date().toISOString() }, ...entries]);
      toast({ title: "Success", description: "Entry added successfully." });
    }
    setIsFormOpen(false);
    setEntryToEdit(null);
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id));
    toast({
      title: "Deleted",
      description: "Entry has been deleted.",
      variant: 'destructive',
    });
  };

  const sortedEntries = React.useMemo(() => {
    return [...entries].sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [entries]);

  const dailyAverages = React.useMemo<DailyAverage[]>(() => {
    if (sortedEntries.length === 0) return [];
    
    const groupedByDay: { [key: string]: GlucoseEntry[] } = sortedEntries.reduce((acc, entry) => {
        const day = entry.date.toISOString().split('T')[0];
        if (!acc[day]) {
            acc[day] = [];
        }
        acc[day].push(entry);
        return acc;
    }, {} as { [key: string]: GlucoseEntry[] });

    return Object.entries(groupedByDay).map(([date, dailyEntries]) => {
        const totalGlycemia = dailyEntries.reduce((sum, e) => sum + e.glycemia, 0);
        const totalDosage = dailyEntries.reduce((sum, e) => sum + e.novorapidDosage, 0);
        return {
            date: new Date(date),
            avgGlycemia: totalGlycemia / dailyEntries.length,
            avgNovorapid: totalDosage / dailyEntries.length,
            entryCount: dailyEntries.length,
        };
    }).sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [sortedEntries]);


  return (
    <div className="container mx-auto max-w-7xl p-4 md:p-6 lg:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="font-bold text-2xl md:text-3xl">My Entries</h1>
         <div className="flex w-full sm:w-auto flex-col sm:flex-row gap-2">
           <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto" disabled={sortedEntries.length === 0}>
                        <BarChartHorizontal className="mr-2 h-4 w-4" />
                        View Chart
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Glycemia and Dosage Overview</DialogTitle>
                        <DialogDescription>A chart showing your glycemia and Novorapid dosage over time.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <GlucoseChart data={sortedEntries} />
                    </div>
                </DialogContent>
            </Dialog>
          <AiSuggestion entries={sortedEntries} />
          <Button onClick={() => handleOpenForm()} className="w-full sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Entry
          </Button>
        </div>
      </div>
      
      {sortedEntries.length > 0 && <DailyAverages averages={dailyAverages} />}

       <div className="flex items-center justify-between">
         <h2 className="font-bold text-xl md:text-2xl">All Entries</h2>
          <ToggleGroup type="single" value={viewMode} onValueChange={(value) => {if(value) setViewMode(value as 'grid' | 'list')}} defaultValue="grid" size="sm">
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <LayoutGrid className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
      </div>
      
      {sortedEntries.length === 0 ? (
          <EmptyState
            icon={<Info className="h-10 w-10 text-primary" />}
            title="No Entries Yet"
            description="You haven't logged any glucose entries. Add your first one to get started."
            action={
              <Button onClick={() => handleOpenForm()}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add First Entry
              </Button>
            }
          />
      ) : (
        viewMode === 'grid' ? (
          <div className="grid gap-4 md:gap-6 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {sortedEntries.map((entry) => (
              <EntryCard 
                key={entry.id} 
                entry={entry}
                onEdit={() => handleOpenForm(entry)}
                onDelete={() => handleDeleteEntry(entry.id!)}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Meal Type</TableHead>
                                <TableHead className="text-right">Glycemia (g/L)</TableHead>
                                <TableHead className="text-right">Novorapid (units)</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedEntries.map((entry) => (
                                <EntryListItem
                                    key={entry.id}
                                    entry={entry}
                                    onEdit={() => handleOpenForm(entry)}
                                    onDelete={() => handleDeleteEntry(entry.id!)}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
          </Card>
        )
      )}

      <EntryForm
        isOpen={isFormOpen}
        onOpenChange={(open) => {
          if (!open) setEntryToEdit(null);
          setIsFormOpen(open);
        }}
        entryToEdit={entryToEdit}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
