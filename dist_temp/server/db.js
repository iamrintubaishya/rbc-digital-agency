import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "../shared/schema.js";
neonConfig.webSocketConstructor = ws;
let db = null;
let pool = null;
if (process.env.DATABASE_URL) {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle({ client: pool, schema });
}
else {
    console.warn('DATABASE_URL not found. Database operations will be unavailable.');
}
export { pool, db };
