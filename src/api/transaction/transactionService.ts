import { StatusCodes } from "http-status-codes";
import type { Transaction } from "./transactionModel";
import type { TransactionDetail } from "./transactionDetailModel";
import { TransactionRepository } from "./transactionRepository";
import { ServiceResponse, Page } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { MedicationRepository } from "../medication/medicationRepository";
import { TreatmentRepository } from "../treatment/treatmentRepository";

export class TransactionService {
  private transactionRepository: TransactionRepository;
  private treatmentRepository: TreatmentRepository;
  private medicationRepository: MedicationRepository;

  constructor(
    transactionRepo: TransactionRepository = new TransactionRepository(),
    treatmentRepo: TreatmentRepository = new TreatmentRepository(),
    medicationRepo: MedicationRepository = new MedicationRepository()
  ) {
    this.transactionRepository = transactionRepo;
    this.treatmentRepository = treatmentRepo;
    this.medicationRepository = medicationRepo;
  }

  // Create Transaction Controller
  public async createTransaction(
    transactionData: Omit<Transaction, "id" | "createdAt" | "updatedAt"> & {
      treatments: number[];
      medications: number[];
    }
  ) {
    try {
        // Step 1: Create transaction (without total_cost)
        const newTransaction = await this.transactionRepository.createTransaction({
            patient_id: transactionData.patient_id,
            date_of_treatment: transactionData.date_of_treatment,
            total_cost: 0 // temporary
        });

        // Step 2: Get costs from medication & treatment tables
        const transactionDetails: Partial<TransactionDetail>[] = [];
        const treatmentsWithCost = await this.treatmentRepository.getTreatmentsWithCost(transactionData.treatments);
        const medicationsWithCost = await this.medicationRepository.getMedicationsWithCost(transactionData.medications);
        let totalCost = 0;


        // Step 3: Insert treatment details & accumulate total cost
        treatmentsWithCost.forEach((treatment) => {
            transactionDetails.push({
                transaction_id: newTransaction.id,
                treatment_id: treatment.id,
                cost: treatment.cost,
            });
            totalCost += Number(treatment.cost);
        });

        // Step 4: Insert medication details & accumulate total cost
        medicationsWithCost.forEach((medication) => {
            transactionDetails.push({
                transaction_id: newTransaction.id,
                medication_id: medication.id,
                cost: medication.cost,
            });
            totalCost += Number(medication.cost);
        });

         // Step 5: Insert transaction details
        await this.transactionRepository.createTransactionDetails(transactionDetails);
        

        // Step 6: Update total_cost in transactions table
        await this.transactionRepository.updateTotalCost(newTransaction.id, totalCost);

        return ServiceResponse.success(
            "Transaction created successfully",
            { transaction: { ...newTransaction, total_cost: totalCost }, details: transactionDetails },
            StatusCodes.CREATED
        );
    } catch (error) {
      logger.error(`Error creating transaction: ${error}`);
      return ServiceResponse.failure("Error creating transaction", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(query: { limit: number; page: number }): Promise<ServiceResponse<any>> {
    try {
      const transactions = await this.transactionRepository.findAll(query);
      const total = await this.transactionRepository.countTransactions();

      const pageInfo: Page = { total };

      if (!transactions || transactions.length === 0) {
        return ServiceResponse.failure(
          "No transactions found",
          [],
          StatusCodes.NOT_FOUND
        );
      }

      return ServiceResponse.success(
        "Transactions retrieved successfully",
        transactions,
        StatusCodes.OK,
        pageInfo
      );
    } catch (error) {
      logger.error("Error fetching transactions:", error);
      return ServiceResponse.failure(
        "An error occurred while retrieving transactions.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const transactionService = new TransactionService();
