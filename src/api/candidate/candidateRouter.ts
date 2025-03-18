import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { GetCandidateSchema, GetCandidateListSchema, CreateCandidateSchema, CandidateSchema } from "./candidateModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { candidateController } from "./candidateController";

export const candidateRegistry = new OpenAPIRegistry();
export const candidateRouter: Router = express.Router();

candidateRegistry.register("Candidate", CandidateSchema);

candidateRegistry.registerPath({
    method: "get",
    path: "/candidates",
    tags: ["Candidate"],

    responses: createApiResponse(z.array(CandidateSchema), "Success"),
});

candidateRouter.get("/", validateRequest(GetCandidateListSchema), candidateController.getCandidateAll);

candidateRegistry.registerPath({
    method: "get",
    path: "/candidates/{id}",
    tags: ["Candidate"],
    request: { params: GetCandidateSchema.shape.params },
    responses: createApiResponse(CandidateSchema, "Success"),
});

candidateRouter.get("/:id", validateRequest(GetCandidateSchema), candidateController.getOneCandidate);

candidateRouter.post("/", validateRequest(CreateCandidateSchema), candidateController.createCandidate);

