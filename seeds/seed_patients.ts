import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    
    await knex("patients").del();

    await knex("patients").insert([
        { name: "John Doe", patient_id: "P001" },
        { name: "Jane Smith", patient_id: "P002" },
        { name: "Michael Johnson", patient_id: "P003" },
        { name: "Emily Davis", patient_id: "P004" },
        { name: "David Wilson", patient_id: "P005" },
        { name: "Sophia Martinez", patient_id: "P006" },
        { name: "Daniel Brown", patient_id: "P007" },
        { name: "Olivia Taylor", patient_id: "P008" },
        { name: "James Anderson", patient_id: "P009" },
        { name: "Isabella Thomas", patient_id: "P010" },
    ]);
};
