import { inject } from '@angular/core';
import { AI_ASSISTANT_TOKEN } from '../constants/core.constant';

export function isPromptAPISupported(): boolean {
   console.log('ai' in globalThis);
   const raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
   const version = raw ? parseInt(raw[2], 10) : 0;
   console.log(version);
   return !!inject(AI_ASSISTANT_TOKEN);
}