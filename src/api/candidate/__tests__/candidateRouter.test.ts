import { StatusCodes } from "http-status-codes";
import request from "supertest";

import type { Candidate } from "@/api/candidate/candidateModel";
// import { users } from "@/api/user/userRepository";
import type { ServiceResponse } from "@/common/models/serviceResponse";
import { app } from "@/server";

describe("User API Endpoints", () => {
    describe("GET /candidates", () => {
        it("should return null", async () => {
             // Act
             const response = await request(app).get("/candidates?keyword=niawf");
             const responseBody: ServiceResponse<Candidate[]> = response.body;
             

             expect(responseBody.statusCode).toEqual(StatusCodes.NOT_FOUND);
             expect(responseBody.success).toBeFalsy();
             expect(responseBody.message).toContain("No candidate found");
             expect(responseBody.data).toBeNull()
        })
    })
    describe("GET /candidates", () => {
        it("should return a list of users", async () => {
            // Act
            const response = await request(app).get("/candidates");
            const responseBody: ServiceResponse<Candidate[]> = response.body;

            // Assert
            expect(responseBody.statusCode).toEqual(StatusCodes.OK);
            expect(responseBody.success).toBeTruthy();
            expect(responseBody.message).toContain("Candidate found");
            expect(Array.isArray(responseBody.data)).toBeTruthy();
            expect(responseBody.data.length).toBeGreaterThan(0);
            responseBody.data.forEach((candidate) => {
                expect(candidate).toHaveProperty("id");
                expect(candidate).toHaveProperty("candidate_full_name");
                expect(candidate).toHaveProperty("candidate_email_address");
                expect(candidate.candidate_email_address).toMatch(/^\S+@\S+\.\S+$/);
                expect(candidate).toHaveProperty("candidate_yoe");
                expect(candidate).toHaveProperty("candidate_phone_number");
                expect(candidate).toHaveProperty("candidate_role_id");
                expect(candidate).toHaveProperty("candidate_location");
                expect(candidate).toHaveProperty("candidate_resume_url");
                expect(candidate).toHaveProperty("candidate_application_status");
                expect(candidate).toHaveProperty("candidate_role_name");
                expect(candidate).toHaveProperty("candidate_image_url");
                expect(candidate).toHaveProperty("createdAt");
                expect(candidate).toHaveProperty("updatedAt");
            });
        });
    });
});

