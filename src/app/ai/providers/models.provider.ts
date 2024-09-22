import { APP_INITIALIZER, Provider } from '@angular/core';
import { ModelService } from '../services/model.service';

export function provideModels(): Provider {
    return {
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: (service: ModelService) => () => service.init(),
        deps: [ModelService]
    } as Provider;
}
