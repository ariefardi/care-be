import Knex from "knex";
import knexConfig from "../../knexfile"; // Use ".js" even in TypeScript if using ES Modules


const db = Knex(knexConfig.development);

export default db;