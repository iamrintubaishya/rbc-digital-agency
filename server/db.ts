import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "../shared/schema.js";

neonConfig.webSocketConstructor = ws;

let db: any = null;
let pool: Pool | null = null;

if (process.env.DATABASE_URL) {
  try {
    // Extract the actual connection string from psql command format if needed
    let connectionString = process.env.DATABASE_URL;
    
    // Check if it's in psql command format (starts with "psql")
    if (connectionString.startsWith('psql ')) {
      // Extract the connection string from the psql command
      const match = connectionString.match(/'([^']+)'/);
      if (match) {
        connectionString = match[1];
      }
    }
    
    pool = new Pool({ connectionString });
    db = drizzle({ client: pool, schema });
    console.log('✓ Database connection configured successfully');
  } catch (error: any) {
    console.error('Database configuration error:', error?.message || error);
    console.warn('DATABASE_URL format issue - falling back to MemStorage');
  }
} else {
  console.warn('DATABASE_URL not found. Database operations will be unavailable.');
}

export { pool, db };