import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export type TransactionDetail = z.infer<typeof TransactionDetailSchema>;

export const TransactionDetailSchema = z.object({
  id: z.number(),
  transaction_id: z.number(),
  treatment_id: z.number().optional(),
  medication_id: z.number().optional(),
  cost: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Input Validation for 'GET transaction detail by ID' endpoint
export const GetTransactionDetailSchema = z.object({
  params: z.object({ id: z.number() }),
});

// Input Validation for creating a new Transaction Detail
export const CreateTransactionDetailSchema = z.object({
  body: z.object({
    transaction_id: z.number().min(1, "Invalid transaction ID"),
    treatment_id: z.number().optional(),
    medication_id: z.number().optional(),
    cost: z.number().min(0, "Cost must be a positive number"),
  }),
});

// Input Validation for listing Transaction Details
export const GetTransactionDetailListSchema = z.object({
  query: z.object({
    transaction_id: z.string().optional().transform((val) => (val ? Number(val) : undefined)),
  }),
});
