import config from '~assets/config.json';
import { TextClassifier, FilesetResolver, LanguageDetector } from "@mediapipe/tasks-text";

export async function createTextClassifier(): Promise<TextClassifier> {
    const text = await FilesetResolver.forTextTasks(config.taskTextUrl);
    return TextClassifier.createFromOptions(text, {
      baseOptions: {
        modelAssetPath: config.textClassifier.path
      },
      maxResults: config.textClassifier.maxResults,
    });
}

export async function createLanguageDetector(): Promise<LanguageDetector> {
  const text = await FilesetResolver.forTextTasks(config.taskTextUrl);
  return LanguageDetector.createFromOptions(text, {
    baseOptions: {
      modelAssetPath: config.languageDetector.path,
    },
    maxResults: config.languageDetector.maxResults,
  });
}
