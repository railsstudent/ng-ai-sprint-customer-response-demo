import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FeedbackService } from './feedback/services/feedback.service';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <p>Testing</p>
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
