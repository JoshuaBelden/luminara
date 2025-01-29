import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { buildActionPromptTemplate } from 'data/promptTemplates/action';

const promptManager = () => {
  const openAiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const completePromptAsync = async (scene, playerInput, ResponseFormatSchema) => {
    if (!openAiApiKey) {
      throw new Error('OpenAI API key is missing');
    }
    try {
      const client = new OpenAI({
        dangerouslyAllowBrowser: true,
        apiKey: openAiApiKey,
      });

      const actionTemplate = buildActionPromptTemplate(scene, playerInput);
      const completion = await client.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: actionTemplate }],
        response_format: zodResponseFormat(
          ResponseFormatSchema,
          'ResponseFormatSchema'
        ),
      });

      const result = JSON.parse(completion.choices[0].message.content);
      console.debug('[promptManager::completePromptAsync] result', result);

      return result;
    } catch (e) {
      console.error(e);
    }
  };

  return {
    completePromptAsync,
  };
};

const createPromptManager = () => {
  return promptManager();
};

export default createPromptManager;
