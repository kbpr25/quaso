/**
 * Quaso Shared Schemas
 *
 * Zod schemas used across frontend and backend
 */

import { z } from 'zod';

// URL input validation (REQ-001, REQ-002, REQ-003)
export const urlInputSchema = z.object({
    url: z
        .string()
        .url('Please enter a valid URL')
        .refine(
            (url) => url.startsWith('http://') || url.startsWith('https://'),
            'URL must start with http:// or https://'
        ),
});

export type UrlInput = z.infer<typeof urlInputSchema>;

// Memory creation response
export const memoryResponseSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    url: z.string(),
    createdAt: z.string(),
    status: z.enum(['processing', 'completed', 'failed']),
    duplicate: z.boolean().optional(),
});

export type MemoryResponse = z.infer<typeof memoryResponseSchema>;

// Memory list query params
export const memoryListQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(50).default(20),
    sort: z.enum(['recent', 'alpha']).default('recent'),
    q: z.string().optional(),
});

export type MemoryListQuery = z.infer<typeof memoryListQuerySchema>;

// AI analysis output
export const aiAnalysisSchema = z.object({
    title: z.string().max(80),
    description: z.string().min(100).max(200),
});

export type AiAnalysis = z.infer<typeof aiAnalysisSchema>;
