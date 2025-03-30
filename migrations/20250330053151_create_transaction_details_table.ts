import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("transaction_details", function (table) {
        table.increments("id").primary();
        table.integer("transaction_id").unsigned().notNullable();
        table.integer("treatment_id").unsigned();
        table.integer("medication_id").unsigned();
        table.decimal("cost", 10, 2).notNullable();
    
        table.foreign("transaction_id").references("transactions.id").onDelete("CASCADE");
        table.foreign("treatment_id").references("treatments.id").onDelete("CASCADE");
        table.foreign("medication_id").references("medications.id").onDelete("CASCADE");
    
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("transaction_details");
}

