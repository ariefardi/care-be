import type { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    // conn: 20,  // Increase from default (10) to 20
    
    connection: {
      host: process.env.DB_HOST || "127.0.0.1",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "password",
      database: process.env.DB_NAME || "my_database",
      port: Number(process.env.DATABASE_PORT) || 3306,
    },
    pool: {
      min: 2,   // Minimum number of connections
      max: 20,  // Increase from default (10) to 20
      acquireTimeoutMillis: 30000, // Timeout for acquiring a connection
      idleTimeoutMillis: 60000, // Close unused connections after 60s
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};

export default config;
