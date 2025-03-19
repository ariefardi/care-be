import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("candidates", (table) => {
    table.string("candidate_image_url").defaultTo(
      "https://i.pinimg.com/736x/0a/5c/75/0a5c75ecc0fae4e75f87002b5640be89.jpg"
    );
  });

  // Update existing records to use the default image
  await knex("candidates")
    .whereNull("candidate_image_url")
    .update({
      candidate_image_url:
        "https://i.pinimg.com/736x/0a/5c/75/0a5c75ecc0fae4e75f87002b5640be89.jpg",
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("candidates", (table) => {
    table.dropColumn("candidate_image_url");
  });
}
