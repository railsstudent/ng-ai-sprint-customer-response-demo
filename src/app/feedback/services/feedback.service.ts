import { inject, Injectable, signal } from '@angular/core';
import { ModelService } from '~app/ai/services/model.service';
import { PromptService } from '~app/ai/services/prompt.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  promptService = inject(PromptService);
  modelService = inject(ModelService);

  categories = signal<{ sentiment: string; score: number }[]>([]);
  language = signal('');
  prompt = signal('');

  async generateReply(query: string): Promise<string> {
    this.categories.set([]);
    this.language.set('');
    this.prompt.set('');

    const language = this.modelService.detectLanguage(query);
    const categories = this.modelService.classifyText(query);
    const sentiment = categories[0].sentiment;
    const responsePrompt = `
      The customer wrote a ${sentiment} feedback in ${language}. 
      Please write the response in one paragraph in ${language}, 100 words max.
      Feedback: ${query} 
    `;

    const response = await this.promptService.prompt(responsePrompt);

    this.categories.set(categories);
    this.language.set(language);
    this.prompt.set(responsePrompt);

    return response;
  }
}
