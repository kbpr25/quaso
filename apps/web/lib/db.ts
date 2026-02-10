/**
 * Database client for apps/web
 *
 * Re-exports the Neon connection from @quaso/db
 */

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '@quaso/db/schema';

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
