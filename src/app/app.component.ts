import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PromptService } from './ai/services/prompt.service';
import { ModelService } from './ai/services/model.service';

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
  modelService = inject(ModelService);

  constructor() {
    const query = `It is ${new Date().getFullYear()}. When is the next leap year`;
    this.promptService.prompt(query)
      .then((answer) => console.log(answer));

    const categories = this.modelService.classifyText(query);
    console.log(categories);

    const code = this.modelService.detectLanguage('我的母語是粵語。');
    console.log(code);
  }
}
