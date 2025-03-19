import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type Candidate = z.infer<typeof CandidateSchema>;
export const CandidateSchema = z.object({
  id: z.number(),
  candidate_full_name: z.string(),
  candidate_email_address: z.string().email(),
  candidate_yoe: z.number(),
  candidate_phone_number: z.string(),
  candidate_role_id: z.number(),
  candidate_location: z.string(),
  candidate_application_status: z.enum([
    "Applied",
    "Contacted",
    "Interview Scheduled",
    "Candidate Rejected",
    "Offer Made",
    "Offer Accepted",
    "Offer Rejected",
    "Interview Done",
    "Hired",
  ]),
  candidate_resume_url: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Input Validation for 'GET candidates/:id' endpoint
export const GetCandidateSchema = z.object({
  params: z.object({ id: commonValidations.id }),
  
});


export const GetCandidateListSchema = z.object({
  
  query: z.object({
    limit: z.string().optional().transform((val) => (val ? Number(val) : 10)), 
    page: z.string().optional().transform((val) => (val ? Number(val) : 1)),
    location: z.string().optional(),
    status: z.string().optional(),
    job: z.string().optional(),
    keyword: z.string().optional(),
  }),
});

export const CreateCandidateSchema = z.object({
  body: z.object({
    candidate_full_name: z.string().min(3, "Name must be at least 3 characters"),
    candidate_email_address: z.string().email("Invalid email format"),
    candidate_yoe: z.number().min(0, "Years of experience must be positive"),
    candidate_phone_number: z.string().min(10, "Invalid phone number"),
    candidate_role_id: z.number(),
    candidate_location: z.string().optional(),
    candidate_application_status: z.enum([
      "Applied",
      "Contacted",
      "Interview Scheduled",
      "Candidate Rejected",
      "Offer Made",
      "Offer Accepted",
      "Offer Rejected",
      "Interview Done",
      "Hired",
    ]).default("Applied"),
    candidate_image_url: z.string().optional().default('https://i.pinimg.com/736x/0a/5c/75/0a5c75ecc0fae4e75f87002b5640be89.jpg'),
    candidate_resume_url: z.string().nonempty()
  }),
});