import { InjectionToken } from '@angular/core';

export const AI_ASSISTANT_TOKEN = new InjectionToken<{ create: Function, capabilities: Function }>('AI_ASSISTANT_TOKEN');
