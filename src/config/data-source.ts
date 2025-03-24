import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import mysql from "mysql2/promise"; 
import { User } from "../model/user.model";

dotenv.config();

async function ensureDatabaseExists() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
  await connection.end();
}

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME,
  synchronize: true, 
  logging: true,
  entities: [User], 
});

ensureDatabaseExists().then(() => {
  AppDataSource.initialize()
    .then(() => console.log("Database connected successfully!"))
    .catch((error) => console.error("Database connection error:", error));
});