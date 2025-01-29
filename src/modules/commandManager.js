import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';
import createPromptManager from './promptManager';

const openAiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

export const COMMANDS = {
  EXAMINE: 'examine',
  SEARCH: 'search',
  MOVE: 'move',
  INTERACT: 'interact',
  PICKUP: 'pickup',
  DROP: 'drop',
  USE: 'use',
};

const CommandSchema = z.object({
  command: z.enum(Object.values(COMMANDS)),
  targetId: z.string(),
});

const commandManager = (scene) => {
  const createCommand = async (playerInput) => {
    if (!openAiApiKey) {
      throw new Error('OpenAI API key is missing');
    }

    try {
      const client = new OpenAI({
        dangerouslyAllowBrowser: true,
        apiKey: openAiApiKey,
      });

      const promptManager = createPromptManager();
      const prompt = promptManager.buildCommandPrompt(playerInput);
      const completion = await client.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        response_format: zodResponseFormat(CommandSchema, 'CommandSchema'),
      });

      const output = completion.choices[0].message.content;
      const command = JSON.parse(output);

      return command;
    } catch (e) {
      console.error(e);
    }
  };

  return {
    createCommand,
  };
};

function createCommandManager() {
  return commandManager();
}

export default createCommandManager;
