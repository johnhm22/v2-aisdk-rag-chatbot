import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// const connectionString = process.env.DATABASE_URL;
const connectionString = process.env.SUPABASE_URL;
// if (host.includes("postgres:postgres@supabase_db_")) {
// 	const url = URL.parse(host)!;
// 	url.hostname = url.hostname.split("_")[1];
// 	connectionString = url.href;
// }

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString!, { prepare: false });
export const db = drizzle(client);
