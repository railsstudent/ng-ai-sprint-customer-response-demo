import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DetectAIComponent } from './detect-ai.component';
import { FeedbackService } from './feedback/services/feedback.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DetectAIComponent],
  template: `
    <h2>Generate Response for Customer Feedback</h2>
    <h3>Use MediaPipe Text Classifier and Language Detection Tasks, and Chrome Built-In AI to </h3>
    <app-detect-ai />
  `,
  styles: `
    :host {
      display: block;
      padding-left: 1rem;
      padding-right: 1rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  feedbackService = inject(FeedbackService);

  constructor() {
    const query = `
    資料的完整可追溯性和數位稽核可以深入至儲存格層級，再加上即時變更，讓我們能掌握在報表中更新的動態並提供透明度。
    `;
    this.feedbackService.generateReply(query).then((topic) => console.log(topic));
  }
}
