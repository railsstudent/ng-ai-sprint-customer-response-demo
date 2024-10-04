import { inject } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AI_ASSISTANT_TOKEN } from '../constants/core.constant';
import { CAPABILITIES } from '../enums/capabilities.enum';
import { getChromVersion, isChromeBrowser } from './user-agent-data';

const CHROME_VERSION = 128

export async function checkChromeBuiltInAI(): Promise<boolean> {
   if (!isChromeBrowser()) {
      throw new Error('Your browser is not supported. Please use Google Chrome Dev or Canary.');
   }

   if (getChromVersion() < CHROME_VERSION) {
      throw new Error(`Please upgrade the Chrome version to at least ${CHROME_VERSION}.`);
   }

   if (!('ai' in globalThis)) {
      throw new Error('Prompt API is not available, check your configuration in chrome://flags/#prompt-api-for-gemini-nano');
   }

   const assistant = inject(AI_ASSISTANT_TOKEN);
   const status = (await assistant?.capabilities())?.available;
   if (status === CAPABILITIES.AFTER_DOWNLOAD) {
      throw new Error('Built-in AI is not ready, please go to chrome://components and start downloading Optimization Guide On Device Model');
   } else if (status === CAPABILITIES.NO) {
      throw new Error('The model of the Prompt API is not implemented. Please check your configuration in chrome://flags/#optimization-guide-on-device-model');
   }

   return true;
}

export function isPromptAPISupported(): Observable<boolean> {
   return from(checkChromeBuiltInAI());
}
