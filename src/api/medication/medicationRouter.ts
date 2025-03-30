import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { GetMedicationSchema, GetMedicationListSchema, CreateMedicationSchema, MedicationSchema } from "./medicationModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { medicationController } from "./medicationController";

export const medicationRegistry = new OpenAPIRegistry();
export const medicationRouter: Router = express.Router();

medicationRegistry.register("Medication", MedicationSchema);

medicationRegistry.registerPath({
  method: "get",
  path: "/medications",
  tags: ["Medication"],
  request: { query: GetMedicationListSchema.shape.query },
  responses: createApiResponse(z.array(MedicationSchema), "Success"),
});

medicationRouter.get("/", validateRequest(GetMedicationListSchema), medicationController.getAllMedications);
