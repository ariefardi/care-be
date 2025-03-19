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
    path: "/candidates?limit=10&page=1",
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

candidateRegistry.registerPath({
    method: "post",
    path: "/candidates",
    tags: ["Candidate"],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            candidate_full_name: { type: "string", example: "John Doe" },
                            candidate_email_address: { type: "string", format: "email", example: "johndoe1@example.com" },
                            candidate_yoe: { type: "integer", example: 2 },
                            candidate_phone_number: { type: "string", example: "08123456789" },
                            candidate_role_id: { type: "integer", example: 33 },
                            candidate_location: { type: "string", example: "New York" },
                            candidate_resume_url: { type: "string", format: "uri", example: "https://ariefardi.com/" }
                        },
                        required: [
                            "candidate_full_name",
                            "candidate_email_address",
                            "candidate_yoe",
                            "candidate_phone_number",
                            "candidate_role_id",
                            "candidate_location",
                            "candidate_resume_url"
                        ]
                    }
                }
            }
        }
    },
    responses: createApiResponse(
        CandidateSchema,
        "Candidate successfully created"
    ),
});

candidateRouter.post("/", validateRequest(CreateCandidateSchema), candidateController.createCandidate);

