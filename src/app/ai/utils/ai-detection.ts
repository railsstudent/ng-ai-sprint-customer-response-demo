import { inject } from '@angular/core';
import { AI_ASSISTANT_TOKEN } from '../constants/core.constant';

export function isPromptAPISupported(): boolean {
   return !!inject(AI_ASSISTANT_TOKEN);
}