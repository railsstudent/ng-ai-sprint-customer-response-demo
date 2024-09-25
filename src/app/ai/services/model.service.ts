import { Injectable, signal } from '@angular/core';
import { LanguageDetector, TextClassifier } from '@mediapipe/tasks-text';
import Iso639Type from 'iso-639-language';
import config from '~assets/config.json';
import { Sentiment } from '../types/sentiment.type';
import { createLanguageDetector, createTextClassifier } from '../utils/load-models';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  #textClassifer = signal<TextClassifier | null>(null);
  #languageDetector = signal<LanguageDetector | null>(null);
  textClassiferName = signal(config.textClassifier.name);
  languageDetectorName = signal(config.languageDetector.name);

  async init() {
    const [textClassifier, languageDetector] = await Promise.all([createTextClassifier(), createLanguageDetector()]);
    this.#textClassifer.set(textClassifier);
    this.#languageDetector.set(languageDetector);
  }

  classifyText(query: string): Sentiment[] {
    const classifer = this.#textClassifer();
    if (classifer) {
      const result = classifer.classify(query);
      if (result.classifications.length) {
        return result.classifications[0].categories.map(({ categoryName, score }) => ({
          sentiment: categoryName,
          score,
        }));
      }
    }

    return [];
  }

  detectLanguage(query: string): string {
    const langDetector = this.#languageDetector();
    if (langDetector) {
      const result = langDetector.detect(query);
      if (result.languages.length) {
        const iso639_1 = Iso639Type.getType(1); 
        return iso639_1.getNameByCodeEnglish(result.languages[0].languageCode);
      }
    }

    return '';
  }
}
