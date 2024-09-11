import { Sequelize } from "sequelize";
import path from "path";

export const sequelize = new Sequelize({
  dialect: process.env.NODE_ENV === "production" ? "postgres" : "sqlite",
  storage:
    process.env.NODE_ENV === "production"
      ? undefined
      : path.join(__dirname, "../..", "mydb.sqlite"),
  logging: false,
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ...(process.env.NODE_ENV === "production" && process.env.DB_USE_SSL === "true"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {}),
});
