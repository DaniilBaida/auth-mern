import { config } from "dotenv";

config({ path: "./backend/.env" });

export const { PORT, DB_URI } = process.env;
