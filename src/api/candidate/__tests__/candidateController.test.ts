import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Request, Response, NextFunction } from "express";

import { candidateController } from "@/api/candidate/candidateController";
import { candidateService } from "@/api/candidate/candidateService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";


vi.mock("@/api/candidate/candidateService", () => ({
    candidateService: {
        findAll: vi.fn(),
        findById: vi.fn(),
        createCandidate: vi.fn(),
    },
}));

vi.mock("@/common/utils/httpHandlers", () => ({
    handleServiceResponse: vi.fn(),
}));

describe("CandidateController", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = {};
        mockRes = {
            json: vi.fn(),
            status: vi.fn().mockReturnThis(),
        };
        mockNext = vi.fn(); 
    });

    
    it("should call findAll in candidateService with correct params", async () => {
        
        mockReq.query = { limit: "5", page: "2" };
        const mockServiceResponse = { success: true, data: [] };
        (candidateService.findAll as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockServiceResponse);

        await candidateController.getCandidateAll(mockReq as Request, mockRes as Response, mockNext);
        
        expect(candidateService.findAll).toHaveBeenCalledWith({ limit: 5, page: 2, ...mockReq.query });
        expect(handleServiceResponse).toHaveBeenCalledWith(mockServiceResponse, mockRes);
    });

    
    it("should call findById in candidateService with correct id", async () => {
        
        mockReq.params = { id: "3" };
        const mockServiceResponse = { success: true, data: { id: 3, candidate_full_name: "Alice" } };
        (candidateService.findById as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockServiceResponse);

        await candidateController.getOneCandidate(mockReq as Request, mockRes as Response, mockNext);
        
        expect(candidateService.findById).toHaveBeenCalledWith(3);
        expect(handleServiceResponse).toHaveBeenCalledWith(mockServiceResponse, mockRes);
    });

    
    it("should call createCandidate in candidateService with request body", async () => {
        
        mockReq.body = { candidate_full_name: "John Doe" };
        const mockServiceResponse = { success: true, data: { id: 1, candidate_full_name: "John Doe" } };
        (candidateService.createCandidate as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockServiceResponse);

        await candidateController.createCandidate(mockReq as Request, mockRes as Response);
        
        expect(candidateService.createCandidate).toHaveBeenCalledWith(mockReq.body);
        expect(handleServiceResponse).toHaveBeenCalledWith(mockServiceResponse, mockRes);
    });
});
