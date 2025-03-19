import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes existing entries
    await knex("roles").del();

    // Inserts seed entries
    await knex("roles").insert([
        { id: 1, role_name: "Applied", createdAt: new Date(), updatedAt: new Date() },
        { id: 2, role_name: "Contacted", createdAt: new Date(), updatedAt: new Date() },
        { id: 3, role_name: "Interview Scheduled", createdAt: new Date(), updatedAt: new Date() },
        { id: 4, role_name: "Candidate Rejected", createdAt: new Date(), updatedAt: new Date() },
        { id: 5, role_name: "Offer Made", createdAt: new Date(), updatedAt: new Date() },
        { id: 6, role_name: "Offer Accepted", createdAt: new Date(), updatedAt: new Date() },
        { id: 7, role_name: "Offer Rejected", createdAt: new Date(), updatedAt: new Date() },
        { id: 8, role_name: "Interview Done", createdAt: new Date(), updatedAt: new Date() },
        { id: 9, role_name: "Hired", createdAt: new Date(), updatedAt: new Date() },
    ]);
}
