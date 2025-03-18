exports.up = function (knex) {
    return knex.schema.createTable('candidates', (table) => {
      table.increments('id').primary(); // Auto-increment primary key
      table.string('candidate_full_name').notNullable();
      table.string('candidate_email_address').notNullable().unique();
      table.integer('candidate_yoe').notNullable(); // Years of experience
      table.string('candidate_phone_number').notNullable();
      
      // Foreign key to roles table
      table.integer('candidate_role_id').unsigned().notNullable();
      table.foreign('candidate_role_id').references('id').inTable('roles').onDelete('CASCADE');
  
      table.string('candidate_location').notNullable();
  
      // Enum for application status
      table.enu('candidate_application_status', [
        'Applied',
        'Contacted',
        'Interview Scheduled',
        'Interview Done',
        'Candidate Rejected',
        'Offer Made',
        'Offer Accepted',
        'Offer Rejected',
        'Hired',
      ]).notNullable();
  
      table.timestamps(true, true, true); // created_at, updated_at, deleted_at
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('candidates');
  };
  