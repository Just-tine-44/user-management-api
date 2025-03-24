import pool from "../config/database";
import { User } from "../models/user.model";

export const getAllUsers = async (): Promise<User[]> => {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows as User[];
};

export const getUserById = async (id: number): Promise<User | null> => {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  const users = rows as User[];
  return users.length > 0 ? users[0] : null;
};
