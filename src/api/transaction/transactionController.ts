import type { Request, RequestHandler, Response } from "express";
import { transactionService } from "./transactionService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class TransactionController {
    
    public createTransaction: RequestHandler = async (req: Request, res: Response): Promise<void> => {
        const serviceResponse = await transactionService.createTransaction(req.body);
        handleServiceResponse(serviceResponse, res);
    };

    public getAllTransactions: RequestHandler = async (req: Request, res: Response): Promise<void> => {
        const limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;
        const options = { limit, page };
    
        
        const serviceResponse = await transactionService.findAll(options);
        handleServiceResponse(serviceResponse, res);
      };
}

export const transactionController = new TransactionController();
