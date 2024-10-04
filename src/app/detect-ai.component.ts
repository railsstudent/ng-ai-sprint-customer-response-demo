import { ChangeDetectionStrategy, Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { isPromptAPISupported } from './ai/utils/ai-detection';
import { FeedbackInputComponent } from './feedback/feedback-input.component';

@Component({
  selector: 'app-detect-ai',
  standalone: true,
  imports: [FeedbackInputComponent],
  template: `
    <div>
      @let text = hasCapability();
      @if (!text) {
        <app-feedback-input />
      } @else {
        {{ text }}
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetectAIComponent {
  hasCapability = toSignal(isPromptAPISupported(), { initialValue: '' });
}
