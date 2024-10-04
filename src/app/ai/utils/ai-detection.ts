import { inject } from '@angular/core';
import { catchError, from, Observable, of } from 'rxjs';
import { AI_ASSISTANT_TOKEN } from '../constants/core.constant';
import { CAPABILITIES } from '../enums/capabilities.enum';
import { getChromVersion, isChromeBrowser } from './user-agent-data';

const CHROME_VERSION = 128

export async function checkChromeBuiltInAI(): Promise<''> {
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

   return '';
}

export function isPromptAPISupported(): Observable<string> {
   return from(checkChromeBuiltInAI()).pipe(
      catchError(
         (e) => {
            console.error(e);
            if (e instanceof Error) {
               return of(e.message);
            }
            return of('If you are on Chrome, join the Early Preview Program to enable it. The URL is https://developer.chrome.com/docs/ai/built-in#get_an_early_preview.');
         }
      )
   );
}
