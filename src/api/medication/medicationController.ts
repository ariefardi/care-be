import { Request, Response } from "express";
import { medicationService } from "./medicationService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class MedicationController {
    public getAllMedications = async (_req: Request, res: Response): Promise<void> => {
        const serviceResponse = await medicationService.getAllMedications();
        handleServiceResponse(serviceResponse, res);
    };
}

export const medicationController = new MedicationController();
