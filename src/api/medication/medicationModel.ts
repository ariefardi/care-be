import { z } from "zod";

export type Medication = z.infer<typeof MedicationSchema>;

export const MedicationSchema = z.object({
  id: z.number(),
  name: z.string().min(2, "Medication name must be at least 2 characters"),
  description: z.string().optional(),
  cost: z.number().min(0, "Cost must be a positive number"),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Input Validation for 'GET medications/:id' endpoint
export const GetMedicationSchema = z.object({
  params: z.object({ id: z.number() }),
});

export const GetMedicationListSchema = z.object({
  query: z.object({
    limit: z.string().optional().transform((val) => (val ? Number(val) : 10)), 
    page: z.string().optional().transform((val) => (val ? Number(val) : 1)),
  }),
});

export const CreateMedicationSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Medication name must be at least 2 characters"),
    description: z.string().optional(),
    cost: z.number().min(0, "Cost must be a positive number"),
  }),
});
