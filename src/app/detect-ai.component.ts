import { ChangeDetectionStrategy, Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { isPromptAPISupported } from './ai/utils/ai-detection';
import { FeedbackInputComponent } from './feedback/feedback-input.component';
import { UserAgentComponent } from './ai/user-agent.component';

@Component({
  selector: 'app-detect-ai',
  standalone: true,
  imports: [FeedbackInputComponent, UserAgentComponent],
  template: `
    <app-user-agent />
    <div>
      @let text = hasCapability();
      @if (!text) {
        <app-feedback-input />
      } @else if (text !== 'unknown') {
        {{ text }}
      } @else {
        <p>If you're on Chrome, join the <a href="https://developer.chrome.com/docs/ai/built-in#get_an_early_preview" target="_blank">
          Early Preview Program</a> to enable it.
        </p>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetectAIComponent {
  hasCapability = toSignal(isPromptAPISupported(), { initialValue: '' });
}
