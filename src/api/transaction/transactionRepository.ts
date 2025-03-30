import db from "@/config/db";
import type { Transaction } from "./transactionModel";
import type { TransactionDetail } from "./transactionDetailModel";

interface FilterQuery {
    limit?: number;
    page?: number;
}
export class TransactionRepository {
  async createTransaction(transactionData: Partial<Transaction>) {
    const [createdTransaction] = await db<Transaction>("transactions")
      .insert(transactionData)
      .returning("*");
    return createdTransaction;
  }

  async createTransactionDetails(transactionDetails: Partial<TransactionDetail>[]) {
    const insertedDetails = await db<TransactionDetail>("transaction_details")
      .insert(transactionDetails)
      .returning("*");
    return insertedDetails;
  }
  async findAll({ limit = 10, page = 1 }: FilterQuery): Promise<Transaction[]> {
    const offset = (page - 1) * limit;

    
    try {const transactions = await db("transactions")
        .select("transactions.*", "patients.name as patient_name")
        .leftJoin("patients", "transactions.patient_id", 'patients.id')
        .limit(limit)
        .offset(offset)
        .orderBy("created_at");

        for (const transaction of transactions) {
            transaction.details = await db("transaction_details as td")
              .leftJoin("medications as m", "td.medication_id", "m.id")
              .leftJoin("treatments as t", "td.treatment_id", "t.id")
              .where("td.transaction_id", transaction.id)
              .select(
                "td.transaction_id",
                "td.cost",
                "td.medication_id",
                "td.treatment_id",
                "m.name as medication_name",
                "t.name as treatment_name",
            );
        }
    
        return transactions;
        
    } catch (error) {
        console.log('error', error)
        return []
    }
  }

  async countTransactions(): Promise<number> {
    const [{ total }] = await db("transactions").count("* as total");
    return Number(total);
  }
  async updateTotalCost(transactionId: number, totalCost: number) {
    return db("transactions").where("id", transactionId).update({ total_cost: totalCost });
  }
}
