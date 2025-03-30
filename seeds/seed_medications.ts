import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("medications").del();

    await knex("medications").insert([
      { name: "Paracetamol", cost: 10000 },
      { name: "Ibuprofen", cost: 15000 },
      { name: "Aspirin", cost: 12500 },
      { name: "Amoxicillin", cost: 20000 },
      { name: "Ciprofloxacin", cost: 25000 },
      { name: "Lisinopril", cost: 30000 },
      { name: "Metformin", cost: 22000 },
      { name: "Atorvastatin", cost: 35000 },
      { name: "Prednisone", cost: 18000 },
      { name: "Omeprazole", cost: 27000 },
      { name: "Losartan", cost: 24000 },
      { name: "Sertraline", cost: 28000 },
      { name: "Hydrochlorothiazide", cost: 19000 },
      { name: "Amlodipine", cost: 23000 },
      { name: "Clonazepam", cost: 29000 },
      { name: "Furosemide", cost: 21000 },
      { name: "Albuterol", cost: 26000 },
      { name: "Montelukast", cost: 31000 },
      { name: "Cetirizine", cost: 14000 },
      { name: "Ranitidine", cost: 16000 },
    ]);
};
