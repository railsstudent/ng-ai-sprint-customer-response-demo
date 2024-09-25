import { Sentiment } from '~app/ai/types/sentiment.type';

export type FeedbackType = {
    categories: Sentiment[];
    language: string;
    prompt: string;
    response: string;
}
