"use client";

import * as React from "react";
import { Lightbulb, Loader2 } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { suggestDosage } from "@/ai/flows/suggest-dosage";
import type { GlucoseEntry } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface AiSuggestionProps {
  entries: GlucoseEntry[];
}

export function AiSuggestion({ entries }: AiSuggestionProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [suggestion, setSuggestion] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const { toast } = useToast();

  const handleGetSuggestion = async () => {
    if (entries.length < 3) {
      toast({
        variant: "destructive",
        title: "Not enough data",
        description: "Please add at least 3 entries to get an AI suggestion.",
      });
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setSuggestion(null);
    
    try {
      const formattedEntries = entries.map(entry => ({
          date: format(entry.date, 'yyyy-MM-dd'),
          time: entry.time,
          mealType: entry.mealType,
          glycemia: entry.glycemia,
          novorapidDosage: entry.novorapidDosage,
      }));

      const result = await suggestDosage({ glucoseData: formattedEntries });
      setSuggestion(result.suggestion);
    } catch (err) {
      console.error(err);
      setError("An error occurred while generating the suggestion. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSuggestion(null);
      setError(null);
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto">
          <Lightbulb className="mr-2" />
          Get AI Suggestion
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>AI Dosage Suggestion</DialogTitle>
          <DialogDescription>
            Analyze your recent entries to get a potential dosage adjustment suggestion.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          {isLoading && (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {suggestion && (
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Suggestion</AlertTitle>
              <AlertDescription>
                <p className="whitespace-pre-wrap">{suggestion}</p>
              </AlertDescription>
            </Alert>
          )}
          {!isLoading && !suggestion && !error && (
            <div className="text-center text-sm text-muted-foreground">
              Click the button below to generate a suggestion based on your logs.
            </div>
          )}
        </div>
        <Button onClick={handleGetSuggestion} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Generate Suggestion"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
