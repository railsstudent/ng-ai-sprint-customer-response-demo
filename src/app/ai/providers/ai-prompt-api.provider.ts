import { isPlatformBrowser } from '@angular/common';
import { EnvironmentProviders, inject, makeEnvironmentProviders, PLATFORM_ID } from '@angular/core';
import { AI_PROMPT_API_TOKEN } from '../constants/core.constant';

export function provideAIAssistant(): EnvironmentProviders {
    return makeEnvironmentProviders([
        {
            provide: AI_PROMPT_API_TOKEN,
            useFactory: () => {
                const platformId = inject(PLATFORM_ID);
                const objWindow = isPlatformBrowser(platformId) ? window : undefined;
                if (objWindow && 'ai' in objWindow) {
                    const ai = objWindow.ai as any;
                    if (ai.assistant) {
                        return ai.assistant;
                    } else if (ai.languageModel) {
                        return ai.languageModel;
                    }
                }
                return undefined;
            },
        }
    ]);
}
