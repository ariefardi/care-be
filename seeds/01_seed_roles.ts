import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes existing entries
    await knex("roles").del();

    // Inserts seed entries
    await knex("roles").insert([
        { id: 1, role_name: "Software Engineer", createdAt: new Date(), updatedAt: new Date() },
        { id: 2, role_name: "Fullstack Developer", createdAt: new Date(), updatedAt: new Date() },
        { id: 3, role_name: "QA Engineer", createdAt: new Date(), updatedAt: new Date() },
        { id: 4, role_name: "Data Scientist", createdAt: new Date(), updatedAt: new Date() },
        { id: 5, role_name: "Data Engineer", createdAt: new Date(), updatedAt: new Date() },
        { id: 6, role_name: "Project Manager", createdAt: new Date(), updatedAt: new Date() },
        { id: 7, role_name: "Database Engineer", createdAt: new Date(), updatedAt: new Date() },
        { id: 8, role_name: "Talent Acquisition", createdAt: new Date(), updatedAt: new Date() },
        { id: 9, role_name: "Backend Developer", createdAt: new Date(), updatedAt: new Date() },
    ]);
}
