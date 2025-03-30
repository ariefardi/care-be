import { MedicationRepository } from "./medicationRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { StatusCodes } from "http-status-codes";

class MedicationService {
    private medicationRepository: MedicationRepository;

    constructor(repository: MedicationRepository = new MedicationRepository()) {
        this.medicationRepository = repository;
    }

    public async getAllMedications() {
        try {
            const medications = await this.medicationRepository.getAll();
            return ServiceResponse.success("Medications retrieved successfully", medications, StatusCodes.OK);
        } catch (error) {
            return ServiceResponse.failure("Error retrieving medications", null, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

export const medicationService = new MedicationService();
