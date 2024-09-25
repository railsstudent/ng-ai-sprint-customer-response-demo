import { inject, Injectable, signal } from '@angular/core';
import { ModelService } from '~app/ai/services/model.service';
import { PromptService } from '~app/ai/services/prompt.service';
import { FeedbackType } from '../types/feedback-state.type';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  promptService = inject(PromptService);
  modelService = inject(ModelService);

  state = signal<FeedbackType>({
    categories: [],
    language: '',
    prompt: '',
    response: '',
  })

  async generateReply(query: string): Promise<void> {
    this.state.set({
      categories: [],
      language: '',
      prompt: '',
      response: '',
    })

    const language = this.modelService.detectLanguage(query);
    const categories = this.modelService.classifyText(query);
    const sentiment = categories[0].sentiment;
    const responsePrompt = `
      The customer wrote a ${sentiment} feedback in ${language}. 
      Please write the response in one paragraph in ${language}, 100 words max.
      Feedback: ${query} 
    `;

    const answer = await this.promptService.prompt(responsePrompt);

    this.state.set({
      categories,
      language,
      prompt: responsePrompt,
      response: answer,
    })
  }
}
