import { z } from "zod";

export const glucoseEntrySchema = z.object({
  id: z.string().optional(),
  date: z.date({
    required_error: "A date is required.",
  }),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "Invalid time format. Please use HH:MM.",
  }),
  mealType: z.enum(["breakfast", "lunch", "dinner", "snack"], {
    required_error: "Please select a meal type.",
  }),
  glycemia: z.coerce
    .number({ invalid_type_error: "Glycemia must be a number." })
    .positive({ message: "Glycemia must be a positive number." })
    .multipleOf(0.01, { message: "Please use up to two decimal places."}),
  novorapidDosage: z.coerce
    .number({ invalid_type_error: "Dosage must be a number." })
    .min(0, { message: "Dosage cannot be negative." })
    .int({ message: "Dosage must be an integer." }),
});

export type GlucoseEntry = z.infer<typeof glucoseEntrySchema>;

export interface DailyAverage {
    date: Date;
    avgGlycemia: number;
    avgNovorapid: number;
    entryCount: number;
}
