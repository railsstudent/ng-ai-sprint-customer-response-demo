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
    <div>
      <span class="label">Response:</span>
      <p>{{ response() }}</p>
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
  response = signal('');

  buttonState = computed(() => {
    return {
      text: this.isLoading() ? 'Processing...' : 'Submit',
      disabled: this.isLoading() || this.feedback().trim() === ''  
    }    
  })  
  
  async submit() {
    this.isLoading.set(true);
    this.response.set('');
    const result = await this.feedbackService.generateReply(this.feedback());
    this.response.set(result);
    this.isLoading.set  (false);
  }
}
