import { Configuration, OpenAIApi } from 'openai';

let openAi: OpenAIApi | null = null;

export const createOpenAiConnection = () => {
  const configuration = new Configuration({
    organization: process.env.OPEN_AI_ORGANIZATION,
    apiKey: process.env.OPEN_AI_API_KEY,
  });

  openAi = new OpenAIApi(configuration);
};

export const runGPT35 = async (prompt: string) => {
  if (!openAi) {
    createOpenAiConnection();
  }
  const response = await openAi!.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });
  return response.data.choices[0].message?.content;
};
