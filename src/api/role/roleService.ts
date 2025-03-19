import { StatusCodes } from "http-status-codes";

import type { Role } from "./roleModel";
import { RoleRepository } from "./roleRepository";
import { Page, ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";

export class RoleService {
	private roleRepository: RoleRepository;

	constructor(repository: RoleRepository = new RoleRepository()) {
		this.roleRepository = repository;
	}

	// Retrieves all users from the database
	async findAll(): Promise<ServiceResponse<Role[] | null>> {
		try {
			const roles = await this.roleRepository.findAllAsync();
			
			
			if (!roles || roles.length === 0) {
				return ServiceResponse.failure("No Role found", null, StatusCodes.NOT_FOUND);
			}
			return ServiceResponse.success<Role[]>("Role found", roles, StatusCodes.OK);
		} catch (ex) {
			const errorMessage = `Error finding all Roles: $${(ex as Error).message}`;
			logger.error(errorMessage);
			return ServiceResponse.failure(
				"An error occurred while retrieving Role.",
				null,
				StatusCodes.INTERNAL_SERVER_ERROR,
			);
		}
	}

	
}

export const roleService = new RoleService();
