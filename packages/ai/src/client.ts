/**
 * Quaso AI Client
 *
 * Ollama Cloud integration for title/description generation
 */

import { Ollama } from 'ollama';
import { AI_MODELS } from '@quaso/shared';
import { SYSTEM_PROMPT } from './prompts';

// Initialize Ollama client
const ollama = new Ollama({
    host: process.env.OLLAMA_CLOUD_URL || 'https://cloud.ollama.com',
});

export interface AnalysisResult {
    title: string;
    description: string;
}

/**
 * Analyze content and generate title + description
 *
 * Uses primary model with fallback to secondary
 */
export async function analyzeContent(content: string): Promise<AnalysisResult> {
    const models = [AI_MODELS.PRIMARY, AI_MODELS.SECONDARY];

    for (const model of models) {
        try {
            const response = await ollama.chat({
                model,
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: content.slice(0, 8000) }, // Limit input
                ],
                options: { temperature: AI_MODELS.TEMPERATURE },
                format: 'json',
            });

            const result = JSON.parse(response.message.content);

            return {
                title: result.title?.slice(0, 80) || 'Untitled',
                description: result.description?.slice(0, 200) || 'No description available',
            };
        } catch (error) {
            console.error(`AI analysis failed with ${model}:`, error);
            // Continue to next model
        }
    }

    // Fallback if both models fail
    throw new Error('AI analysis failed with all available models');
}

export { ollama };
