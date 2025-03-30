import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { Router } from "express";
import { z } from "zod";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { CreateTransactionSchema, TransactionSchema } from "./transactionModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { transactionController } from "./transactionController";

export const transactionRegistry = new OpenAPIRegistry();
export const transactionRouter: Router = express.Router();

transactionRegistry.register("Transaction", TransactionSchema);

transactionRegistry.registerPath({
  method: "post",
  path: "/transactions",
  tags: ["Transaction"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              patient_id: { type: "integer", example: 1 },
              date_of_treatment: { type: "string", example: "2025-03-30" },
              treatments: { type: "array", items: { type: "integer" }, example: [1, 2] },
              medications: { type: "array", items: { type: "integer" }, example: [3, 4] },
            },
            required: ["patient_id", "date_of_treatment", "treatments", "medications"],
          },
        },
      },
    },
  },
  responses: createApiResponse(TransactionSchema, "Transaction successfully created"),
});

transactionRouter.post("/", validateRequest(CreateTransactionSchema), transactionController.createTransaction);



transactionRegistry.registerPath({
    method: "get",
    path: "/transactions",
    tags: ["Transaction"],
    responses: createApiResponse(z.array(TransactionSchema), "Success"),
  });
  
  transactionRouter.get("/", transactionController.getAllTransactions);
