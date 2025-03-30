import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("treatments").del();

  await knex("treatments").insert([
    { name: "Physical Therapy", cost: 200000 },
    { name: "Surgery", cost: 5000000 },
    { name: "Chemotherapy", cost: 10000000 },
    { name: "Radiation Therapy", cost: 7000000 },
    { name: "Dialysis", cost: 3000000 },
    { name: "Blood Transfusion", cost: 1500000 },
    { name: "Vaccination", cost: 250000 },
    { name: "MRI Scan", cost: 1200000 },
    { name: "CT Scan", cost: 1000000 },
    { name: "X-Ray", cost: 300000 },
    { name: "Ultrasound", cost: 400000 },
    { name: "Endoscopy", cost: 2000000 },
    { name: "Colonoscopy", cost: 1800000 },
    { name: "Dental Surgery", cost: 800000 },
    { name: "Orthopedic Surgery", cost: 6000000 },
    { name: "Heart Bypass Surgery", cost: 15000000 },
    { name: "Liver Transplant", cost: 50000000 },
    { name: "Kidney Transplant", cost: 40000000 },
    { name: "Psychiatric Therapy", cost: 500000 },
    { name: "Skin Treatment", cost: 700000 },
  ]);
};
