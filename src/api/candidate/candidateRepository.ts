import type { Candidate } from "@/api/candidate/candidateModel";


import db from '@/config/db'
export class CandidateRepository {
    async findAllAsync({limit = 10, offset = 1, sort = 'createdAt', order = 'desc'}: { limit?: number, offset?: number, sort?: string; order?: string }): Promise<Candidate[]> {
        
        return db('candidates').select('*').limit(limit).offset(offset).orderBy("createdAt", order || "desc");
    }
    async countCandidate(): Promise<number> {
        const [{ total }] = await db("candidates").count("* as total");
        return Number(total)
    }
    async findById(id: number): Promise<Candidate | null> {
        return db('candidates').where({ id }).first();
    }

    public async create(candidateData: Partial<Candidate>) {
        const [createdCandidate] = await db<Candidate>("candidates").insert(candidateData).returning("*");
        return createdCandidate;
    }

}
