import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { roleController } from "./roleController";
import { RoleSchema } from "./roleModel";

export const roleRegistry = new OpenAPIRegistry();
export const roleRouter: Router = express.Router();

roleRegistry.register("Role", RoleSchema);

roleRegistry.registerPath({
    method: "get",
    path: "/roles",
    tags: ["Role"],

    responses: createApiResponse(z.array(RoleSchema), "Success"),
});

roleRouter.get("/", roleController.getRoleAll);
