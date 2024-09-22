import { isPlatformBrowser } from '@angular/common';
import { EnvironmentProviders, inject, makeEnvironmentProviders, PLATFORM_ID } from '@angular/core';
import { AI_ASSISTANT_TOKEN } from './core.constant';

export function provideAIAssistant(): EnvironmentProviders {
    return makeEnvironmentProviders([
        {
            provide: AI_ASSISTANT_TOKEN,
            useFactory: () => {
                const platformId = inject(PLATFORM_ID);
                const objWindow = isPlatformBrowser(platformId) ? window : undefined;
                if (objWindow) {
                    const winWithAI = objWindow as any;
                    if (winWithAI?.ai?.assistant) {
                        return winWithAI.ai.assistant;
                    }
                }

                return undefined;
            },
        }
    ]);
}
