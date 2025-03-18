exports.seed = async function (knex) {
  // Deletes ALL existing entries to prevent duplicates
  await knex('roles').del();

  // Insert predefined roles
  await knex('roles').insert([
    { role_name: 'System Architect' },
    { role_name: 'Fullstack Engineer' },
    { role_name: 'Project Manager' },
    { role_name: 'Backend Developer' },
    { role_name: 'Frontend Developer' },
    { role_name: 'QA' },
    { role_name: 'UI Designer' },
    { role_name: 'UX Researcher' },
  ]);
};