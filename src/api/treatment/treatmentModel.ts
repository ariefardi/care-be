import { z } from "zod";

export type Treatment = z.infer<typeof TreatmentSchema>;

export const TreatmentSchema = z.object({
  id: z.number(),
  name: z.string().min(2, "Treatment name must be at least 2 characters"),
  description: z.string().optional(),
  cost: z.number().min(0, "Cost must be a positive number"),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Input Validation for 'GET treatments/:id' endpoint
export const GetTreatmentSchema = z.object({
  params: z.object({ id: z.number() }),
});

export const GetTreatmentListSchema = z.object({
  query: z.object({
    limit: z.string().optional().transform((val) => (val ? Number(val) : 10)), 
    page: z.string().optional().transform((val) => (val ? Number(val) : 1)),
  }),
});

export const CreateTreatmentSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Treatment name must be at least 2 characters"),
    description: z.string().optional(),
    cost: z.number().min(0, "Cost must be a positive number"),
  }),
});
