import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",         // Update if your database is on a different host
  user: "root",              // Replace with your MySQL username
  password: "", 
  database: "user-management",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
