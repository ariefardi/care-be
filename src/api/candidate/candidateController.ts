import type { Request, RequestHandler, Response } from "express";

import { candidateService } from "./candidateService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class CandidateController {
    public getCandidateAll: RequestHandler = async (_req: Request, res: Response): Promise<void> => {
        const { query } = _req;
        const limit = Number(_req.query.limit) || 10;
        const page = Number(_req.query.page) || 1;
        const options:any = { limit, page, ...query }
        
        const serviceResponse = await candidateService.findAll(options);
        handleServiceResponse(serviceResponse, res); // Just call the function, don't return it
    };

    public getOneCandidate: RequestHandler = async (req: Request, res: Response): Promise<void> => {
        const id = Number.parseInt(req.params.id as string, 10);
        const serviceResponse = await candidateService.findById(id);
        handleServiceResponse(serviceResponse, res);
    };
    public createCandidate = async (req: Request, res: Response): Promise<void> => {
        
        const serviceResponse = await candidateService.createCandidate(req.body);
        handleServiceResponse(serviceResponse, res);
    };
}

export const candidateController = new CandidateController();
