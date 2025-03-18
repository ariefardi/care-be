import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export interface Page {
	total: Number;
}
export class ServiceResponse<T = null> {
	readonly success: boolean;
	readonly message: string;
	readonly data: T;
	readonly statusCode: number;
	readonly page?: Page | null;

	private constructor(success: boolean, message: string, data: T, statusCode: number, page?: Page | null) {
		this.success = success;
		this.message = message;
		this.data = data;
		this.statusCode = statusCode;
		this.page = page;
	}

	static success<T>(message: string, data: T, statusCode: number = StatusCodes.OK, page?: Page | null) {
		return new ServiceResponse(true, message, data, statusCode, page);
	}

	static failure<T>(message: string, data: T, statusCode: number = StatusCodes.BAD_REQUEST, page?: Page | null) {
		return new ServiceResponse(false, message, data, statusCode, page);
	}
}

export const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
	z.object({
		success: z.boolean(),
		message: z.string(),
		data: dataSchema.optional(),
		statusCode: z.number(),
		page: dataSchema.optional()
	});
