import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("candidates", (table) => {
    table.string("candidate_resume_url").notNullable()
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("candidates", (table) => {
    table.dropColumn("candidate_resume_url");
  });
}