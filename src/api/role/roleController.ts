import type { Request, RequestHandler, Response } from "express";

import { roleService } from "./roleService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class RoleController {
    public getRoleAll: RequestHandler = async (_req: Request, res: Response): Promise<void> => {
        const serviceResponse = await roleService.findAll();
        handleServiceResponse(serviceResponse, res); // Just call the function, don't return it
    };
}

export const roleController = new RoleController();
