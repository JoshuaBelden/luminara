import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';
import { buildCommandPrompt } from './promptTemplates';

const openAiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

export const COMMANDS = {
  DESCRIBE: 'describe',
  MOVE: 'move',
  INTERACT: 'interact',
  USE: 'use',
  PICKUP: 'pickup',
  DROP: 'drop',
};

const CommandSchema = z.object({
  command: z.enum(Object.values(COMMANDS)),
  target: z.string(),
});

const createCommand = async (playerInput) => {
  if (!openAiApiKey) {
    throw new Error('OpenAI API key is missing');
  }

  try {
    const client = new OpenAI({
      dangerouslyAllowBrowser: true,
      apiKey: openAiApiKey,
    });

    const prompt = buildCommandPrompt(playerInput);
    const completion = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      response_format: zodResponseFormat(CommandSchema, 'CommandSchema'),
    });

    const output = completion.choices[0].message.content;
    const command = JSON.parse(output);

    console.log(command);
  } catch (e) {
    console.error(e);
  }
};

function createCommandManager() {
  return {
    createCommand,
  };
}

export default createCommandManager;
