/**
 * Quaso Database Schema
 *
 * Using Drizzle ORM with Neon PostgreSQL
 * Includes Auth.js adapter tables + application tables
 */

import {
    pgTable,
    text,
    timestamp,
    integer,
    index,
    primaryKey,
    boolean,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import type { AdapterAccountType } from 'next-auth/adapters';

// ============================================
// Auth.js Adapter Tables
// ============================================

// Users table (shared: Auth.js + application data)
export const users = pgTable('users', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text('name'),
    email: text('email').unique(),
    emailVerified: timestamp('email_verified', { mode: 'date' }),
    image: text('image'),
    memoryCount: integer('memory_count').default(0).notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

// OAuth accounts table (Auth.js)
export const accounts = pgTable(
    'accounts',
    {
        userId: text('user_id')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        type: text('type').$type<AdapterAccountType>().notNull(),
        provider: text('provider').notNull(),
        providerAccountId: text('provider_account_id').notNull(),
        refresh_token: text('refresh_token'),
        access_token: text('access_token'),
        expires_at: integer('expires_at'),
        token_type: text('token_type'),
        scope: text('scope'),
        id_token: text('id_token'),
        session_state: text('session_state'),
    },
    (account) => [
        primaryKey({ columns: [account.provider, account.providerAccountId] }),
    ]
);

// Sessions table (Auth.js)
export const sessions = pgTable('sessions', {
    sessionToken: text('session_token').primaryKey(),
    userId: text('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
});

// Verification tokens table (Auth.js - email verification)
export const verificationTokens = pgTable(
    'verification_tokens',
    {
        identifier: text('identifier').notNull(),
        token: text('token').notNull(),
        expires: timestamp('expires', { mode: 'date' }).notNull(),
    },
    (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })]
);

// ============================================
// Application Tables
// ============================================

// Memories table
export const memories = pgTable(
    'memories',
    {
        id: text('id')
            .primaryKey()
            .$defaultFn(() => crypto.randomUUID()),
        userId: text('user_id')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        url: text('url').notNull(),
        title: text('title').notNull(),
        description: text('description').notNull(),
        contentText: text('content_text'),
        contentType: text('content_type'),
        aiModel: text('ai_model'),
        processingTimeMs: integer('processing_time_ms'),
        supermemoryId: text('supermemory_id'),
        status: text('status', {
            enum: ['processing', 'completed', 'failed'],
        })
            .default('processing')
            .notNull(),
        createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
        updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
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

// Search logs table (for vector DB trigger metrics — PRD §11.1)
export const searchLogs = pgTable('search_logs', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
    query: text('query').notNull(),
    resultCount: integer('result_count').default(0).notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// ============================================
// Type Exports
// ============================================

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Memory = typeof memories.$inferSelect;
export type NewMemory = typeof memories.$inferInsert;
export type SearchLog = typeof searchLogs.$inferSelect;
export type NewSearchLog = typeof searchLogs.$inferInsert;
export type Account = typeof accounts.$inferSelect;
export type Session = typeof sessions.$inferSelect;
