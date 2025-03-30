import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("patient_medications", function (table) {
        table.increments("id").primary();
        table.integer("patient_id").unsigned().notNullable();
        table.integer("medication_id").unsigned().notNullable();
    
        table.foreign("patient_id").references("patients.id").onDelete("CASCADE");
        table.foreign("medication_id").references("medications.id").onDelete("CASCADE");
    
        table.unique(["patient_id", "medication_id"]);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("patient_medications");
}

