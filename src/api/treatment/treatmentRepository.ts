import db from "@/config/db";

export class TreatmentRepository {
    async getTreatmentsWithCost(treatmentIds: number[]) {
        return db("treatments")
          .whereIn("id", treatmentIds)
          .select("id", "cost");
    }
}

export const treatmentRepository = new TreatmentRepository();