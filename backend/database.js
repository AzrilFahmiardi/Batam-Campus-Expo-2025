const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0, 
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Database connected successfully!");
    connection.release();
  } catch (err) {
    console.error("Failed to connect to the database:", err.message);
  }
})();


pool.on("error", (err) => {
  console.error("Database error: ", err);
});

module.exports = pool;
    