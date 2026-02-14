
import { mysqlTable, int, varchar, longtext, timestamp } from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  // 'longtext' ensures the image string fits perfectly
  faceData: longtext("face_data"), 
  createdAt: timestamp("created_at").defaultNow(),
});