import { StatusCodes } from "http-status-codes";
import request from "supertest";

import type { Role } from "@/api/role/roleModel";
// import { users } from "@/api/user/userRepository";
import type { ServiceResponse } from "@/common/models/serviceResponse";
import { app } from "@/server";

describe("User API Endpoints", () => {
    describe("GET /roles", () => {
        it("should return a list of users", async () => {
            // Act
            const response = await request(app).get("/roles");
            const responseBody: ServiceResponse<Role[]> = response.body;
            // Assert
            expect(responseBody.statusCode).toEqual(StatusCodes.OK);
            expect(responseBody.success).toBeTruthy();
            expect(responseBody.message).toContain("Role found");
        });
    });
});

