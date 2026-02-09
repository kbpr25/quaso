/**
 * Quaso Database Schema
 *
 * Using Drizzle ORM with Neon PostgreSQL
 */

import { pgTable, text, timestamp, integer, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// Users table
export const users = pgTable('users', {
    id: text('id').primaryKey(),
    email: text('email').notNull().unique(),
    name: text('name'),
    image: text('image'),
    memoryCount: integer('memory_count').default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Memories table
export const memories = pgTable(
    'memories',
    {
        id: text('id').primaryKey(),
        userId: text('user_id')
            .notNull()
            .references(() => users.id),
        url: text('url').notNull(),
        title: text('title').notNull(),
        description: text('description').notNull(),
        contentText: text('content_text'),
        contentType: text('content_type'),
        aiModel: text('ai_model'),
        processingTimeMs: integer('processing_time_ms'),
        supermemoryId: text('supermemory_id'),
        status: text('status', { enum: ['processing', 'completed', 'failed'] }).default('processing'),
        createdAt: timestamp('created_at').defaultNow(),
        updatedAt: timestamp('updated_at').defaultNow(),
    },
    (table) => [
        index('memories_user_idx').on(table.userId),
        index('memories_url_idx').on(table.url),
        index('memories_created_idx').on(table.createdAt),
        index('memories_search_idx').using(
            'gin',
            sql`to_tsvector('english', ${table.title} || ' ' || ${table.description} || ' ' || ${table.url})`
        ),
    ]
);

// Search logs table (for vector DB trigger metrics)
export const searchLogs = pgTable('search_logs', {
    id: text('id').primaryKey(),
    userId: text('user_id').references(() => users.id),
    query: text('query').notNull(),
    resultCount: integer('result_count').default(0),
    createdAt: timestamp('created_at').defaultNow(),
});

// Type exports
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Memory = typeof memories.$inferSelect;
export type NewMemory = typeof memories.$inferInsert;
export type SearchLog = typeof searchLogs.$inferSelect;
