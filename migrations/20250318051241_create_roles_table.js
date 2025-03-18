exports.up = function (knex) {
    return knex.schema.createTable('roles', (table) => {
      table.increments('id').primary(); // Auto-increment primary key
      table.string('role_name').notNullable();
      table.timestamps(true, true, true); // created_at, updated_at, deleted_at
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('roles');
  };
  