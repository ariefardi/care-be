import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { GetTreatmentSchema, GetTreatmentListSchema, CreateTreatmentSchema, TreatmentSchema } from "./treatmentModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { treatmentController } from "./treatmentController";

export const treatmentRegistry = new OpenAPIRegistry();
export const treatmentRouter: Router = express.Router();

treatmentRegistry.register("Treatment", TreatmentSchema);

treatmentRegistry.registerPath({
  method: "get",
  path: "/treatments",
  tags: ["Treatment"],
  request: { query: GetTreatmentListSchema.shape.query },
  responses: createApiResponse(z.array(TreatmentSchema), "Success"),
});

treatmentRouter.get("/", validateRequest(GetTreatmentListSchema), treatmentController.getAllTreatments);
