import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideAIAssistant } from './core/ai-assistant.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideAIAssistant(),
  ]
};
