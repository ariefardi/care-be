import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router } from "express";
import { z } from "zod";
import db  from "@/config/db"; 
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

export const healthCheckRegistry = new OpenAPIRegistry();
export const healthCheckRouter: Router = express.Router();

healthCheckRegistry.registerPath({
	method: "get",
	path: "/health-check",
	tags: ["Health Check"],
	responses: createApiResponse(z.null(), "Success"),
});

healthCheckRouter.get("/", async (_req: Request, res: Response): Promise<any> => {
	const serviceResponse = ServiceResponse.success("Service is healthy", null);
	const ress = await db.raw("SELECT 1");
	console.log('ress', ress)
	return handleServiceResponse(serviceResponse, res);
});
