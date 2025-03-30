import db from "@/config/db";

export class MedicationRepository {
    async getMedicationsWithCost(medicationIds: number[]) {
        return db("medications")
          .whereIn("id", medicationIds)
          .select("id", "cost");
    }
    public async getAll() {
        return db("medications").select("*");
    }
}

export const treatmentRepository = new MedicationRepository();