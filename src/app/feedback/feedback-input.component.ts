import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeedbackService } from './services/feedback.service';

@Component({
  selector: 'app-feedback-input',
  standalone: true,
  imports: [FormsModule],
  template: `
    <label class="label" for="input">Input customer feedback: </label>
    <textarea rows="8" id="input" name="input" [(ngModel)]="feedback"></textarea>
    <button (click)="submit()" [disabled]="buttonState().disabled">{{ buttonState().text }}</button>
    @let state = feedbackState();
    <div>
      <p>
        <span class="label">Language: </span>{{ state.language }}
      </p>
      <p>
        <span class="label">Categories: </span>
        @for (category of state.categories; track $index) {
          <p>{{ category.sentiment }}, {{ category.score }}</p>
        }
      </p>
      <p>
        <span class="label">Prompt: </span>{{ state.prompt }}
      </p>
    </div>
    <div>
      <span class="label">Response:</span>
      <p>{{ state.response }}</p>
    </div>
  `,
  styles: `
    textarea {
      width: 100%;
    }

    .label, button {
      margin-bottom: 0.5rem;
    }

    .label {
      color: #4a4a4a; 
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackInputComponent {
  feedbackService = inject(FeedbackService);

  feedback = signal('', { equal: () => false });
  isLoading = signal(false);

  feedbackState = this.feedbackService.state;

  buttonState = computed(() => {
    return {
      text: this.isLoading() ? 'Processing...' : 'Submit',
      disabled: this.isLoading() || this.feedback().trim() === ''  
    }    
  })  
  
  async submit() {
    this.isLoading.set(true);
    await this.feedbackService.generateReply(this.feedback());
    this.isLoading.set  (false);
  }
}
