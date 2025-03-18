import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError, ZodSchema } from "zod";

import { ServiceResponse } from "@/common/models/serviceResponse";

export const handleServiceResponse = (serviceResponse: ServiceResponse<unknown>, response: Response) => {
	return response.status(serviceResponse.statusCode).send(serviceResponse);
};

export const validateRequest = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction): any => {
	try {
		schema.parse({ body: req.body, query: req.query, params: req.params });
		next();
	} catch (err) {
		if (err instanceof ZodError) {
			// Map errors to detailed messages
			const errorDetails = err.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join("; ");

			const serviceResponse = ServiceResponse.failure(`Validation failed: ${errorDetails}`, null, StatusCodes.BAD_REQUEST);
			return handleServiceResponse(serviceResponse, res);
		}

		// Unexpected error
		const serviceResponse = ServiceResponse.failure("An unexpected error occurred during validation", null, StatusCodes.INTERNAL_SERVER_ERROR);
		return handleServiceResponse(serviceResponse, res);
	}
};
