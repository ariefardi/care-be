import db from "@/config/db";

export class TreatmentRepository {
    async getTreatmentsWithCost(treatmentIds: number[]) {
        return db("treatments")
          .whereIn("id", treatmentIds)
          .select("id", "cost");
    }
    public async getAll() {
        return db("treatments").select("*");
    }
}

export const treatmentRepository = new TreatmentRepository();