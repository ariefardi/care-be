import { StatusCodes } from "http-status-codes";

import type { Candidate } from "./candidateModel";
import { CandidateRepository } from "./candidateRepository";
import { Page, ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";

export class CandidateService {
	private candidateRepository: CandidateRepository;

	constructor(repository: CandidateRepository = new CandidateRepository()) {
		this.candidateRepository = repository;
	}

	// Retrieves all users from the database
	async findAll({limit = 10, page = 1}: { limit?: number, page?: number }): Promise<ServiceResponse<Candidate[] | null>> {
		try {
			const offset = (page - 1) * limit;
			const candidates = await this.candidateRepository.findAllAsync({ limit, offset });
			const total = await this.candidateRepository.countCandidate();
			const pageInfo: Page = {
				total,
			}
			if (!candidates || candidates.length === 0) {
				return ServiceResponse.failure("No candidate found", null, StatusCodes.NOT_FOUND);
			}
			return ServiceResponse.success<Candidate[]>("Candidate found", candidates, StatusCodes.OK, pageInfo);
		} catch (ex) {
			const errorMessage = `Error finding all candidates: $${(ex as Error).message}`;
			logger.error(errorMessage);
			return ServiceResponse.failure(
				"An error occurred while retrieving candidate.",
				null,
				StatusCodes.INTERNAL_SERVER_ERROR,
			);
		}
	}

	// Retrieves a single user by their ID
	async findById(id: number): Promise<ServiceResponse<Candidate | null>> {
		try {
			const candidate = await this.candidateRepository.findById(id);
			if (!candidate) {
				return ServiceResponse.failure("Candidate not found", null, StatusCodes.NOT_FOUND);
			}
			return ServiceResponse.success<Candidate>("Candidate found", candidate);
		} catch (ex) {
			const errorMessage = `Error finding candidate with id ${id}:, ${(ex as Error).message}`;
			logger.error(errorMessage);
			return ServiceResponse.failure("An error occurred while finding candidate.", null, StatusCodes.INTERNAL_SERVER_ERROR);
		}
	}
	public async createCandidate(candidateData: Candidate) {
		try {
			const newCandidate = await this.candidateRepository.create(candidateData);
			return ServiceResponse.success("Candidate created successfully", newCandidate);
		} catch (error) {
			return ServiceResponse.failure("Error creating candidate", error);
		}
	}
}

export const candidateService = new CandidateService();
