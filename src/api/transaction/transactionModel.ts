import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export type Transaction = z.infer<typeof TransactionSchema>;

export const TransactionSchema = z.object({
  id: z.number(),
  patient_id: z.number(),
  date_of_treatment: z.string(),
  total_cost: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateTransactionSchema = z.object({
  body: z.object({
    patient_id: z.number().min(1, "Invalid patient ID"),
    date_of_treatment: z.string(),
    treatments: z.array(z.number()).nonempty("At least one treatment is required"),
    medications: z.array(z.number()).nonempty("At least one medication is required"),
  }),
});

export const GetTransactionSchema = z.object({
  params: z.object({ id: z.number() }),
});

export const GetTransactionListSchema = z.object({
  query: z.object({
    limit: z.string().optional().transform((val) => (val ? Number(val) : 10)),
    page: z.string().optional().transform((val) => (val ? Number(val) : 1)),
  }),
});
