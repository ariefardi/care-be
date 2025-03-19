import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type Role = z.infer<typeof RoleSchema>;

export const RoleSchema = z.object({
  id: z.number(),
  role_name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

