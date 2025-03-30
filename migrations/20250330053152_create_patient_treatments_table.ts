import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("patient_treatments", function (table) {
        table.increments("id").primary();
        table.integer("patient_id").unsigned().notNullable();
        table.integer("treatment_id").unsigned().notNullable();
    
        table.foreign("patient_id").references("patients.id").onDelete("CASCADE");
        table.foreign("treatment_id").references("treatments.id").onDelete("CASCADE");
    
        table.unique(["patient_id", "treatment_id"]);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("patient_treatments");
}

