import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PromptService } from './core/prompt.service';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <p>Testing</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  promptService = inject(PromptService);

  constructor() {
    this.promptService.prompt(`It is ${new Date().getFullYear()}. When is the next leap year`)
      .then((answer) => console.log(answer));
  }
}
