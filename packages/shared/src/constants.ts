/**
 * Quaso Constants
 *
 * Shared configuration values across the monorepo
 */

// Rate limiting (NFR-014)
export const RATE_LIMIT = {
    URLS_PER_HOUR: 50,
    WINDOW_MS: 60 * 60 * 1000, // 1 hour
} as const;

// Processing constraints
export const PROCESSING = {
    FETCH_TIMEOUT_MS: 10_000, // 10 seconds (REQ-010)
    MAX_RETRIES: 3, // (NFR-009)
    TARGET_TIME_MS: 8_000, // Target processing time (PRD KPI)
} as const;

// Content constraints
export const CONTENT = {
    TITLE_MAX_LENGTH: 80, // (REQ-012)
    DESCRIPTION_MIN_LENGTH: 100, // (REQ-013)
    DESCRIPTION_MAX_LENGTH: 200, // (REQ-013)
} as const;

// Pagination
export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 50,
} as const;

// AI Models (via Ollama Cloud)
export const AI_MODELS = {
    PRIMARY: 'gpt-oss:120b-cloud',
    SECONDARY: 'deepseek-v3.1:671b-cloud',
    TEMPERATURE: 0.3, // Low temp for consistency (REQ-014)
} as const;

// Vector DB triggers (PRD §11.1)
export const VECTOR_DB_TRIGGERS = {
    AVG_MEMORIES_PER_USER: 100,
    SEARCH_ATTEMPT_RATE: 0.3, // 30% of users
    ZERO_RESULT_RATE: 0.4, // 40% of searches
    FEATURE_REQUESTS: 10,
} as const;

// Content types
export const CONTENT_TYPES = ['article', 'video', 'repo', 'docs', 'unknown'] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];
