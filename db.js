
// import { drizzle } from "drizzle-orm/mysql2";
// import mysql from "mysql2/promise";
// import * as schema from "./schema.js";

// const connection = await mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root",
//   password: "Vijay1878#",
//   database: "bio_secure_db",
// });

// export const db = drizzle(connection, { schema, mode: "default" });


// import { drizzle } from "drizzle-orm/mysql2";
// import mysql from "mysql2/promise";
// import * as schema from "./schema.js";
// // 1. You MUST import and configure dotenv at the top of your server.js 
// // for this process.env to work here.

// const connection = await mysql.createConnection({
//   host: process.env.DB_HOST || "127.0.0.1",
//   user: process.env.DB_USER || "root",
//   password: process.env.DB_PASSWORD, // No more "Vijay1878#"!
//   database: process.env.DB_NAME || "bio_secure_db",
// });

// export const db = drizzle(connection, { schema, mode: "default" });

import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema.js";

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
port: Number(process.env.DB_PORT) // 👈 Converts string to number
});

export const db = drizzle(connection, { schema, mode: "default" });