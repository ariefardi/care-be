import type { Candidate } from "@/api/candidate/candidateModel";


import db from '@/config/db'

interface FilterQuery {
    limit?: number,
    offset?: number,
    order?: string;
    location?:string;
    status?: string;
    job?: string;
    keyword?: string;
}
export class CandidateRepository {
    async findAllAsync
    (
        {
            limit = 10,
            offset = 1,
            
            order = 'desc',
            location,
            status,
            job,
            keyword
        }: FilterQuery): Promise<Candidate[]> {
        
        let query = db('candidates')
        .select('candidates.*', 'roles.role_name as candidate_role_name') 
        .leftJoin('roles', 'candidates.candidate_role_id', 'roles.id')
        .limit(limit)
        .offset(offset)
        .orderBy("createdAt", order || "desc");
        if (location) {
            query = query.where('candidate_location', location);
        }
        if(status) {
            query = query.where('candidate_application_status', status)
        }
        if (job) {
            query = query.where('roles.id', job);
        }
        if (keyword) {
            query = query.where(function() {
                this.where('candidate_full_name', 'like', `${keyword}%`) // Search by candidate name
            });
        }
        return query
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
        return {...candidateData, id: createdCandidate};
    }
}
