/**
 * Quaso AI Prompts
 *
 * System prompts for title and description generation
 */

export const SYSTEM_PROMPT = `You are a memory crystallizer. Given web page content, generate:

1. A clean, human-readable title (max 80 characters, no clickbait)
2. A concise description (100-200 characters, purpose-oriented)

Output JSON: { "title": "...", "description": "..." }

Rules:
- Title should tell the user WHY this page is useful
- Description captures the key value proposition
- No marketing fluff, no emojis, no question marks
- Be specific about the technology/topic covered
- If content is unclear, extract the main topic and purpose
- For documentation, focus on what users will learn
- For articles, capture the main insight or solution
- For videos, describe the content topic
- For repositories, describe what the project does`;

export const TITLE_REFINEMENT_PROMPT = `Refine this title to be more descriptive and useful:
- Remove generic words like "Guide", "Tutorial", "How to" unless essential
- Make it specific to the actual content
- Keep under 80 characters`;

export const DESCRIPTION_REFINEMENT_PROMPT = `Refine this description:
- Focus on what the reader will gain
- Be specific about the topic/technology
- Keep between 100-200 characters
- Avoid vague phrases like "This article discusses..."`;
