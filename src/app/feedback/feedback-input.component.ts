import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-feedback-input',
  standalone: true,
  imports: [],
  template: `
    <p>
      feedback-input works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackInputComponent {

}
