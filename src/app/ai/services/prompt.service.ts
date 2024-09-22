import { inject, Injectable } from '@angular/core';
import { AI_ASSISTANT_TOKEN } from '../constants/core.constant';

@Injectable({
  providedIn: 'root'
})
export class PromptService {
  #aiAssistant = inject(AI_ASSISTANT_TOKEN);

  async prompt(query: string): Promise<string> {
    if (!this.#aiAssistant) {
      throw new Error(`Your browser doesn't support the Prompt API. If you are on Chrome, join the Early Preview Program to enable it.`);
    }

    const session = await this.#aiAssistant.create();
    if (!session) {
      throw new Error('Failed to create AITextSession.');
    }

    const answer = await session.prompt(query);
    session.destroy();

    return answer;
  }
}
