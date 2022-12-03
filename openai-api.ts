import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY || '',
});

const openai = new OpenAIApi(configuration);

export const askOpenAI = (prompt: string) =>
  openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    temperature: 0.7,
    max_tokens: 512,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
