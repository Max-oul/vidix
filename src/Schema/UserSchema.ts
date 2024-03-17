import { pgTable, serial, text, varchar, jsonb } from "drizzle-orm/pg-core";

export const UserSchema= pgTable('users', {
  id: serial('id').primaryKey(),
  f_name: text('f_name'),
  l_name: text('l_name'),
  email: varchar('email', { length: 256 }),
  password: text('password'),
  role: jsonb('role'),
});