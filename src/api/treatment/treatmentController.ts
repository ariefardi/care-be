import { Request, Response } from "express";
import { treatmentService } from "./treatmentService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class TreatmentController {
    public getAllTreatments = async (_req: Request, res: Response): Promise<void> => {
        const serviceResponse = await treatmentService.getAllTreatments();
        handleServiceResponse(serviceResponse, res);
    };
}

export const treatmentController = new TreatmentController();
