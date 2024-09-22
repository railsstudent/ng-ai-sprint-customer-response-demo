import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AI_ASSISTANT_TOKEN } from './core/core.constant';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <p>Testing</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  aiAssistant = inject(AI_ASSISTANT_TOKEN);
}
