import { StatusCodes } from "http-status-codes";

import type { Role } from "@/api/role/roleModel";
import { RoleRepository } from "@/api/role/roleRepository";
import { RoleService } from "@/api/role/roleService";

vi.mock("@/api/role/roleRepository");


describe("roleService", () => {
    let roleServiceInstance: RoleService;
    let roleRepositoryInstance: RoleRepository;
    const mockRoles: Role[] = [
        {
			"id": 33,
			"role_name": "System Architect",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			"id": 34,
			"role_name": "Fullstack Engineer",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
        ];
    
        beforeEach(() => {
                roleRepositoryInstance = new RoleRepository();
                roleServiceInstance = new RoleService(roleRepositoryInstance);
        });

        afterEach(() => {
            vi.clearAllMocks();
        });

    describe("findAll", () => {
        it("should return roles when found", async () => {
            // Arrange
            roleRepositoryInstance.findAllAsync = vi.fn().mockResolvedValue(mockRoles);

            // Act
            const response = await roleServiceInstance.findAll();

            // Assert
            expect(response.success).toBeTruthy();
            expect(response.statusCode).toBe(StatusCodes.OK);
            expect(response.message).toBe("Role found");
            expect(response.data).toEqual(mockRoles);
            expect(roleRepositoryInstance.findAllAsync).toHaveBeenCalledOnce();
        });

        it("should return 'No Role found' when no roles exist", async () => {
            // Arrange
            roleRepositoryInstance.findAllAsync = vi.fn().mockResolvedValue([]);

            // Act
            const response = await roleServiceInstance.findAll();

            // Assert
            expect(response.success).toBeFalsy();
            expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
            expect(response.message).toBe("No Role found");
            expect(response.data).toBeNull();
            expect(roleRepositoryInstance.findAllAsync).toHaveBeenCalledOnce();
        });

        it("should handle errors and return INTERNAL_SERVER_ERROR", async () => {
            // Arrange
            roleRepositoryInstance.findAllAsync = vi.fn().mockRejectedValue(new Error("Database error"));

            // Act
            const response = await roleServiceInstance.findAll();

            // Assert
            expect(response.success).toBeFalsy();
            expect(response.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
            expect(response.message).toBe("An error occurred while retrieving Role.");
            expect(response.data).toBeNull();
            expect(roleRepositoryInstance.findAllAsync).toHaveBeenCalledOnce();
        });
    });
})