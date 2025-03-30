import { TreatmentRepository } from "./treatmentRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { StatusCodes } from "http-status-codes";

class TreatmentService {
    private treatmentRepository: TreatmentRepository;

    constructor(repository: TreatmentRepository = new TreatmentRepository()) {
        this.treatmentRepository = repository;
    }

    public async getAllTreatments() {
        try {
            const treatments = await this.treatmentRepository.getAll();
            return ServiceResponse.success("Treatments retrieved successfully", treatments, StatusCodes.OK);
        } catch (error) {
            return ServiceResponse.failure("Error retrieving treatments", null, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

export const treatmentService = new TreatmentService();
