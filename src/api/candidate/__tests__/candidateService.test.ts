import { StatusCodes } from "http-status-codes";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

import type { Candidate } from "@/api/candidate/candidateModel";
import { CandidateRepository } from "@/api/candidate/candidateRepository";
import { CandidateService } from "@/api/candidate/candidateService";


vi.mock("@/api/candidate/candidateRepository");

describe("CandidateService", () => {
    let candidateServiceInstance: CandidateService;
    let candidateRepositoryInstance: CandidateRepository;

    const mockCandidate: Candidate = {
        id: 1,
        candidate_full_name: "John Doe",
        candidate_email_address: "johndoe1@example.com",
        candidate_yoe: 2,
        candidate_phone_number: "08123456789",
        candidate_role_id: 33,
        candidate_location: "New York",
        candidate_resume_url: "https://ariefardi.com/",
        candidate_application_status: 'Applied',
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    beforeEach(() => {
        candidateRepositoryInstance = new CandidateRepository();
        candidateServiceInstance = new CandidateService(candidateRepositoryInstance);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });


    describe("candidateService.findAll", () => {
        it("should return 500 when an error occurs while retrieving candidates", async () => {
            // Arrange: Mock repository agar selalu throw error
            candidateRepositoryInstance.findAllAsync = vi.fn().mockRejectedValue(new Error("Database error"));
        
            // Act: Panggil fungsi findAll
            const response = await candidateServiceInstance.findAll({ limit: 10, page: 1 });
        
            // Assert: Pastikan error tertangkap dan mengembalikan 500
            expect(response.success).toBeFalsy();
            expect(response.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR); // ⬅️ Harus 500
            expect(response.message).toContain("An error occurred while retrieving candidate.");
            expect(response.data).toBeNull();
            expect(candidateRepositoryInstance.findAllAsync).toHaveBeenCalledOnce();
        });
        let candidateServiceInstance: CandidateService;
        let candidateRepositoryInstance: CandidateRepository;
        
        const mockCandidates: Candidate[] = [
            {
                id: 1,
                candidate_full_name: "John Doe",
                candidate_email_address: "johndoe@example.com",
                candidate_yoe: 2,
                candidate_phone_number: "08123456789",
                candidate_role_id: 33,
                candidate_location: "New York",
                candidate_resume_url: "https://ariefardi.com/",
                candidate_application_status: 'Applied',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                candidate_full_name: "Jane Smith",
                candidate_email_address: "janesmith@example.com",
                candidate_yoe: 5,
                candidate_phone_number: "08129876543",
                candidate_role_id: 34,
                candidate_location: "Los Angeles",
                candidate_resume_url: "https://janesmith.com/",
                candidate_application_status: 'Applied',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        beforeEach(() => {
            candidateRepositoryInstance = new CandidateRepository();
            candidateServiceInstance = new CandidateService(candidateRepositoryInstance);
        });

        afterEach(() => {
            vi.restoreAllMocks();
        });
        it("should return 200 and a list of candidates when candidates exist", async () => {
            // Arrange: Mock findAllAsync dan countCandidate
            vi.spyOn(candidateRepositoryInstance, "findAllAsync").mockResolvedValue(mockCandidates);
            vi.spyOn(candidateRepositoryInstance, "countCandidate").mockResolvedValue(mockCandidates.length);
    
            // Act: Panggil fungsi findAll
            const response = await candidateServiceInstance.findAll({ limit: 10, page: 1 });
    
            // Assert: Pastikan response sukses
            expect(response.success).toBeTruthy();
            expect(response.statusCode).toBe(StatusCodes.OK);
            expect(response.message).toBe("Candidate found");
            expect(response.data).toEqual(mockCandidates);
            expect(response.page).toEqual({ total: mockCandidates.length });
            expect(candidateRepositoryInstance.findAllAsync).toHaveBeenCalledOnce();
            expect(candidateRepositoryInstance.countCandidate).toHaveBeenCalledOnce();
        });
    })


describe("candidateService.findById", () => {
        let candidateServiceInstance: CandidateService;
        let candidateRepositoryInstance: CandidateRepository;

        const mockCandidate: Candidate = {
            id: 2,
                candidate_full_name: "Jane Smith",
                candidate_email_address: "janesmith@example.com",
                candidate_yoe: 5,
                candidate_phone_number: "08129876543",
                candidate_role_id: 34,
                candidate_location: "Los Angeles",
                candidate_resume_url: "https://janesmith.com/",
                candidate_application_status: 'Applied',
                createdAt: new Date(),
                updatedAt: new Date(),
        };

        beforeEach(() => {
            candidateRepositoryInstance = new CandidateRepository();
            candidateServiceInstance = new CandidateService(candidateRepositoryInstance);
        });

        afterEach(() => {
            vi.restoreAllMocks();
        });

        it("should return 200 and the candidate when found", async () => {
            // Arrange: Mock findById agar mengembalikan kandidat
            vi.spyOn(candidateRepositoryInstance, "findById").mockResolvedValue(mockCandidate);

            // Act: Panggil fungsi findById
            const response = await candidateServiceInstance.findById(1);

            // Assert: Pastikan response sukses
            expect(response.success).toBeTruthy();
            expect(response.statusCode).toBe(StatusCodes.OK);
            expect(response.message).toBe("Candidate found");
            expect(response.data).toEqual(mockCandidate);
            expect(candidateRepositoryInstance.findById).toHaveBeenCalledWith(1);
        });

        it("should return 404 when candidate is not found", async () => {
            // Arrange: Mock findById agar return null
            vi.spyOn(candidateRepositoryInstance, "findById").mockResolvedValue(null);

            // Act: Panggil fungsi findById
            const response = await candidateServiceInstance.findById(1);

            // Assert: Pastikan response 404
            expect(response.success).toBeFalsy();
            expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
            expect(response.message).toBe("Candidate not found");
            expect(response.data).toBeNull();
            expect(candidateRepositoryInstance.findById).toHaveBeenCalledWith(1);
        });

        it("should return 500 when an error occurs", async () => {
            // Arrange: Mock findById agar throw error
            vi.spyOn(candidateRepositoryInstance, "findById").mockRejectedValue(new Error("Database error"));

            // Act: Panggil fungsi findById
            const response = await candidateServiceInstance.findById(1);

            // Assert: Pastikan response 500
            expect(response.success).toBeFalsy();
            expect(response.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
            expect(response.message).toBe("An error occurred while finding candidate.");
            expect(response.data).toBeNull();
            expect(candidateRepositoryInstance.findById).toHaveBeenCalledWith(1);
        });
    });

    describe("candidateService.createCandidate", () => {
        it("should create a candidate successfully", async () => {
            // Arrange
            candidateRepositoryInstance.create = vi.fn().mockResolvedValue(mockCandidate);

            // Act
            const response = await candidateServiceInstance.createCandidate(mockCandidate);

            // Assert
            expect(response.success).toBeTruthy();
            expect(response.statusCode).toBe(StatusCodes.OK);
            expect(response.message).toBe("Candidate created successfully");
            expect(response.data).toEqual(mockCandidate);
            expect(candidateRepositoryInstance.create).toHaveBeenCalledOnce();
            expect(candidateRepositoryInstance.create).toHaveBeenCalledWith(mockCandidate);
        });

        it("should handle errors when creating a candidate", async () => {
            // Arrange
            candidateRepositoryInstance.create = vi.fn().mockRejectedValue(new Error("Database error"));

            // Act
            const response = await candidateServiceInstance.createCandidate(mockCandidate);

            // Assert
            expect(response.success).toBeFalsy();
            expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST)
            expect(response.message).toContain("Error creating candidate");
            expect(response.data).toBeNull();
            expect(candidateRepositoryInstance.create).toHaveBeenCalledOnce();
        });

        
    });
});
