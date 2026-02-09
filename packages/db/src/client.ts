/**
 * Quaso Database Client
 *
 * Neon serverless PostgreSQL connection
 */

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Create database connection
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });

export type Database = typeof db;
