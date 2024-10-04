import { isPlatformBrowser } from '@angular/common';
import { EnvironmentProviders, inject, makeEnvironmentProviders, PLATFORM_ID } from '@angular/core';
import { AI_ASSISTANT_TOKEN } from '../constants/core.constant';

export function provideAIAssistant(): EnvironmentProviders {
    return makeEnvironmentProviders([
        {
            provide: AI_ASSISTANT_TOKEN,
            useFactory: () => {
                const platformId = inject(PLATFORM_ID);
                const objWindow = isPlatformBrowser(platformId) ? window : undefined;
                if (objWindow && 'ai' in objWindow && (objWindow.ai as any).assistant) {
                    return (objWindow.ai as any).assistant;
                }

                return undefined;
            },
        }
    ]);
}
