import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const globalForDb = globalThis as unknown as { __pelie_pool?: Pool };

function getPool(): Pool {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }
  if (!globalForDb.__pelie_pool) {
    const url = process.env.DATABASE_URL;
    const needsSsl =
      url.includes('sslmode=require') ||
      url.includes('.supabase.co') ||
      url.includes('.pooler.supabase.com');
    globalForDb.__pelie_pool = new Pool({
      connectionString: url,
      ssl: needsSsl ? { rejectUnauthorized: false } : undefined,
    });
  }
  return globalForDb.__pelie_pool;
}

export const db = drizzle(getPool(), { schema });
export { schema };
