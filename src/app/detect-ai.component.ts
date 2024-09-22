import { ChangeDetectionStrategy, Component } from '@angular/core';
import { isPromptAPISupported } from './ai/utils/ai-detection';
import { FeedbackInputComponent } from './feedback/feedback-input.component';

@Component({
  selector: 'app-detect-ai',
  standalone: true,
  imports: [FeedbackInputComponent],
  template: `
    <div>
      @if (hasCapability) {
        <app-feedback-input />
      } @else {
          <p>Your browser doesn't support the Prompt API.</p>
          <p>If you're on Chrome, join the <a href="https://developer.chrome.com/docs/ai/built-in#get_an_early_preview" target="_blank">
            Early Preview Program</a> to enable it.
          </p>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetectAIComponent {
  hasCapability = isPromptAPISupported();
}
