import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, from, of } from 'rxjs';
import { isPromptAPISupported } from './ai/utils/ai-detection';
import { FeedbackInputComponent } from './feedback/feedback-input.component';

@Component({
  selector: 'app-detect-ai',
  standalone: true,
  imports: [FeedbackInputComponent],
  template: `
    <div>
      @if (hasCapability()) {
        <app-feedback-input />
      } @else {
        {{ error() }}
        <p>If you're on Chrome, join the <a href="https://developer.chrome.com/docs/ai/built-in#get_an_early_preview" target="_blank">
          Early Preview Program</a> to enable it.
        </p>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetectAIComponent {
  error = signal('');
  isSupported$ = isPromptAPISupported().pipe(
    catchError((e) => {
      if (e instanceof Error) {
        this.error.set(e.message);
      } else {
        this.error.set('Unknown error.');
      }
      return of('');
    })
  )
  hasCapability = toSignal(this.isSupported$, { initialValue: false });
}
