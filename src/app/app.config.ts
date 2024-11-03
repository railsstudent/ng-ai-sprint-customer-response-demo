import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideAIAssistant } from './ai/providers/ai-prompt-api.provider';
import { provideModels } from './ai/providers/models.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideAIAssistant(),
    provideModels(),
  ]
};
