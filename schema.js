import { mysqlTable, int, varchar, text, timestamp } from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("users", {
  // Primary Key: Unique ID for every user
  id: int("id").autoincrement().primaryKey(),
  
  // Username: Must be unique so we don't have duplicate accounts
  username: varchar("username", { length: 255 }).notNull().unique(),


  email: varchar("email", { length: 255 }).notNull().unique(),
  
  // Password: Stored as a string
  password: varchar("password", { length: 255 }).notNull(),
  
  // Face Data: Using 'text' here for Drizzle, 
  // but remember to run the ALTER TABLE command in MySQL to make it LONGTEXT
  faceData: text("face_data"),
  
  // Automatically tracks when the user signed up
  createdAt: timestamp("created_at").defaultNow(),
});