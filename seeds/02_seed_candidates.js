const { faker } = require('@faker-js/faker');

exports.seed = async function (knex) {
  await knex('candidates').del();

  const roles = await knex('roles').select('id');

  const statuses = [
    'Applied',
    'Contacted',
    'Interview Scheduled',
    'Candidate Rejected',
    'Offer Made',
    'Offer Accepted',
    'Offer Rejected',
    'Interview Done',
    'Hired',
  ];

  const candidates = [];
  for (let i = 0; i < 50; i++) {
    candidates.push({
      candidate_full_name: faker.person.fullName(),
      candidate_email_address: faker.internet.email(),
      candidate_yoe: faker.number.int({ min: 1, max: 15 }),
      candidate_phone_number: faker.phone.number(),
      candidate_role_id: roles[Math.floor(Math.random() * roles.length)].id,
      candidate_location: faker.location.country(),
      candidate_application_status: statuses[Math.floor(Math.random() * statuses.length)],
      candidate_resume_url: "https://ariefardi.com" ,
      candidate_image_url: "https://i.pinimg.com/736x/0a/5c/75/0a5c75ecc0fae4e75f87002b5640be89.jpg",
      updatedAt: knex.fn.now(),
      createdAt: knex.fn.now(),
    });
  }

  await knex('candidates').insert(candidates);
};
