import { CandidateRepository } from "@/api/candidate/candidateRepository";
import type { Candidate } from "@/api/candidate/candidateModel";
import { vi } from "vitest";
import db from "@/config/db"; // Sesuaikan dengan path database instance yang digunakan
import { Knex } from "knex";

vi.mock("@/db", () => {
    const mockDb = {
        select: vi.fn().mockReturnThis(),
        leftJoin: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        offset: vi.fn().mockReturnThis(),
        orderBy: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
    };
    return { db: () => mockDb };
});


describe("CandidateRepository.findById", () => {
    
    let dbMock: Partial<Knex.QueryBuilder>;

    beforeEach(() => {
        dbMock = {
            where: vi.fn().mockReturnThis(),
            first: vi.fn(),
        };

        vi.mock("@/db", () => ({
            db: () => dbMock, // Mock database instance
        }));
    });
    it("should return a candidate when found", async () => {
        

        const mockCandidate = { id: 1, candidate_full_name: "John Doe", candidate_location: "New York" };
        (dbMock.first as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockCandidate);

        const candidateRepository = new CandidateRepository();

        
        const result = await candidateRepository.findById(317);

        
        expect(result).toHaveProperty("id");
        expect(result).toHaveProperty("candidate_full_name");
        expect(result).toHaveProperty("candidate_email_address");
        expect(result?.candidate_email_address).toMatch(/^\S+@\S+\.\S+$/);
        expect(result).toHaveProperty("candidate_yoe");
        expect(result).toHaveProperty("candidate_phone_number");
        expect(result).toHaveProperty("candidate_role_id");
        expect(result).toHaveProperty("candidate_location");
        expect(result?.candidate_location).toEqual("Nepal");
        expect(result).toHaveProperty("candidate_resume_url");
        expect(result).toHaveProperty("candidate_application_status");
        expect(result).toHaveProperty("candidate_image_url");
        expect(result).toHaveProperty("createdAt");
        expect(result).toHaveProperty("updatedAt");
    });

    it("should return null when candidate is not found", async () => {
        // Arrange
        (dbMock.first as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(null);

        const candidateRepository = new CandidateRepository();

        // Act
        const result = await candidateRepository.findById(999);

        // Assert
        expect(result).toBeUndefined();
    });
});

describe("CandidateRepository.findAllAsync", () => {
    
    let dbMock: Partial<Knex.QueryBuilder>;


    beforeEach(() => {
        dbMock = {
            select: vi.fn().mockReturnThis(),
            leftJoin: vi.fn().mockReturnThis(),
            limit: vi.fn().mockReturnThis(),
            offset: vi.fn().mockReturnThis(),
            orderBy: vi.fn().mockReturnThis(),
            where: vi.fn().mockReturnThis(),
        };
    
        vi.mock("@/db", () => ({
            db: () => dbMock, // Mock database instance
        }));
    });

    it("should filter candidates by location", async () => {
        // Arrange
        const mockCandidates = [{
			"id": 317,
			"candidate_full_name": "Mrs. Sylvia Streich",
			"candidate_email_address": "Casey91@yahoo.com",
			"candidate_yoe": 15,
			"candidate_phone_number": "505.827.2813 x6934",
			"candidate_role_id": 33,
			"candidate_location": "Nepal",
			"candidate_application_status": "Interview Scheduled",
			"createdAt": "2025-03-18T08:45:48.000Z",
			"updatedAt": "2025-03-18T08:45:48.000Z",
			"candidate_resume_url": "https://ariefardi.com/",
			"candidate_image_url": "https://i.pinimg.com/736x/0a/5c/75/0a5c75ecc0fae4e75f87002b5640be89.jpg",
			"candidate_role_name": "System Architect"
		}];
        
        
        (dbMock.where as unknown as ReturnType<typeof vi.fn>).mockReturnThis();
        (dbMock.orderBy as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockCandidates);

        const candidateRepository = new CandidateRepository();
        
        const result = await candidateRepository.findAllAsync({ limit: 10, offset: 1, location: "Nepal" });
    
        
        result.forEach((candidate) => {
            expect(candidate).toHaveProperty("id");
            expect(candidate).toHaveProperty("candidate_full_name");
            expect(candidate).toHaveProperty("candidate_email_address");
            expect(candidate.candidate_email_address).toMatch(/^\S+@\S+\.\S+$/);
            expect(candidate).toHaveProperty("candidate_yoe");
            expect(candidate).toHaveProperty("candidate_phone_number");
            expect(candidate).toHaveProperty("candidate_role_id");
            expect(candidate).toHaveProperty("candidate_location");
            expect(candidate.candidate_location).toEqual("Nepal");
            expect(candidate).toHaveProperty("candidate_resume_url");
            expect(candidate).toHaveProperty("candidate_application_status");
            expect(candidate).toHaveProperty("candidate_role_name");
            expect(candidate).toHaveProperty("candidate_image_url");
            expect(candidate).toHaveProperty("createdAt");
            expect(candidate).toHaveProperty("updatedAt");
        });
    });

    it("should filter candidates by status", async () => {
        // Arrange
        const mockCandidates = [{ id: 4, candidate_full_name: "Bob", candidate_application_status: "Pending" }];
        (dbMock.where as unknown as ReturnType<typeof vi.fn>).mockReturnThis();
        (dbMock.orderBy as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockCandidates);

        const candidateRepository = new CandidateRepository();
        const result = await candidateRepository.findAllAsync({ limit: 10, offset: 1, status: "Pending" });

        // Assert
        
        result.forEach((candidate) => {
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
            expect(candidate.candidate_application_status).toEqual("Pending");
            expect(candidate).toHaveProperty("candidate_role_name");
            expect(candidate).toHaveProperty("candidate_image_url");
            expect(candidate).toHaveProperty("createdAt");
            expect(candidate).toHaveProperty("updatedAt");
        });
    });

    it("should filter candidates by job ID", async () => {
        
        const mockCandidates = [{ id: 5, candidate_full_name: "Charlie", candidate_role_id: 2 }];
        (dbMock.where as unknown as ReturnType<typeof vi.fn>).mockReturnThis();
        (dbMock.orderBy as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockCandidates);

        const candidateRepository = new CandidateRepository();
        
        const result = await candidateRepository.findAllAsync({ limit: 10, offset: 1, job: String(34) });

        // Assert
        
        result.forEach((candidate) => {
            expect(candidate).toHaveProperty("id");
            expect(candidate).toHaveProperty("candidate_full_name");
            expect(candidate).toHaveProperty("candidate_email_address");
            expect(candidate.candidate_email_address).toMatch(/^\S+@\S+\.\S+$/);
            expect(candidate).toHaveProperty("candidate_yoe");
            expect(candidate).toHaveProperty("candidate_phone_number");
            expect(candidate).toHaveProperty("candidate_role_id");
            expect(candidate.candidate_role_id).toEqual(34);
            expect(candidate).toHaveProperty("candidate_location");
            expect(candidate).toHaveProperty("candidate_resume_url");
            expect(candidate).toHaveProperty("candidate_application_status");
            
            expect(candidate).toHaveProperty("candidate_role_name");
            expect(candidate).toHaveProperty("candidate_image_url");
            expect(candidate).toHaveProperty("createdAt");
            expect(candidate).toHaveProperty("updatedAt");
        });
    });

    // it("should filter candidates by keyword", async () => {
    //     // Arrange
    //     const mockCandidates = [{ id: 6, candidate_full_name: "David" }];
    //     db.where.mockImplementationOnce((callback) => {
    //         callback.call({
    //             where: vi.fn().mockReturnThis(),
    //         });
    //         return db;
    //     });
    //     db.orderBy.mockResolvedValue(mockCandidates);

    //     // Act
    //     const result = await candidateRepository.findAllAsync({ limit: 10, offset: 1, keyword: "Da" });

    //     // Assert
    //     expect(db.where).toHaveBeenCalled();
    //     expect(result).toEqual(mockCandidates);
    // });
});

describe("candidateRepository.create", () => {
    let candidateRepositoryInstance: CandidateRepository;

    const mockCandidateData: Partial<Candidate> = {
        candidate_full_name: "John Doe",
        candidate_email_address: `johndoe${Math.random() * 10000}@example.com`,
        candidate_yoe: 2,
        candidate_phone_number: "08123456789",
        candidate_role_id: 33,
        candidate_location: "New York",
        candidate_resume_url: "https://ariefardi.com/",
    };

    const mockCreatedCandidate: Candidate = {
        ...mockCandidateData,
        id: 1, // ID dihasilkan oleh database
    } as Candidate;

    beforeEach(() => {
        candidateRepositoryInstance = new CandidateRepository();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should insert candidate data and return the created candidate", async () => {
        // Arrange: Mock database insert agar return kandidat yang sudah dibuat
        vi.spyOn(db, "insert").mockReturnValue({
            returning: vi.fn().mockResolvedValue([{...mockCreatedCandidate, id: 1}]),
        } as any);

        // Act: Panggil fungsi create
        const result = await candidateRepositoryInstance.create(mockCandidateData);

        // Assert: Pastikan kandidat yang dibuat sama dengan yang diharapkan
        expect(result).toEqual(
            expect.objectContaining({
                ...mockCandidateData,
                id: expect.any(Number), // Pastikan id selalu berupa angka
            })
        );
    });

    // it("should throw an error when database insert fails", async () => {
    //     // Arrange: Mock database insert agar throw error
    //     vi.spyOn(db, "insert").mockImplementation(() => {
    //         throw new Error("Database insert error");
    //     });

    //     // Act & Assert: Pastikan error dilempar
    //     await expect(candidateRepositoryInstance.create(mockCandidateData)).rejects.toThrow("Database insert error");
    // });
});
