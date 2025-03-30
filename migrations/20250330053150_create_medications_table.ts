import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("medications", function (table) {
        table.increments("id").primary();
        table.string("name").notNullable().unique();
        table.decimal("cost", 10, 2).notNullable();
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("medications");
}

