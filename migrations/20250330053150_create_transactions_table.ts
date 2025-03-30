import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("transactions", function (table) {
        table.increments("id").primary();
        table.integer("patient_id").unsigned().notNullable();
        table.date("date_of_treatment").notNullable();
        table.decimal("total_cost", 10, 2).notNullable();
    
        table.foreign("patient_id").references("patients.id").onDelete("CASCADE");
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("transactions");
}

