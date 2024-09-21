import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { WINDOW_TOKEN } from './core.constant';

export function provideWindow(): EnvironmentProviders {
    return makeEnvironmentProviders([
        {
            provide: WINDOW_TOKEN,
            useValue: 'test'
        }
    ]);
}
