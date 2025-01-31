import OpenAI from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

const promptCache = new Map();

const promptManager = (actions) => {
  const openAiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const actionIds = actions.map((action) => action.id);
  const ActionCompletionSchema = z.object({
    actionId: z.enum(actionIds),
    targetId: z.string(),
  });
  console.debug(
    '[Luminara][promptManager] ActionCompletionSchema',
    ActionCompletionSchema
  );

  const buildPromptTemplate = (actionPrompts, scene, prompt) => {
    const pointsOfInterest = scene.pointsOfInterest
      .map((poi) => ` - ${poi.id}`)
      .join('\n');

    const interactables = scene.interactables
      .map((i) => ` - ${i.id}`)
      .join('\n');

    const items = scene.items
      .filter((i) => !i.hidden)
      .map((i) => ` - ${i.id}`)
      .join('\n');

    const promptTemplate = `
You are a natural language parser for a text-based game. Convert player inputs into a structured format related to the scene information.
Scene:
- PointsOfInterest
${pointsOfInterest}
- Interactables
${interactables}
- Items
${items}
Examples:
${actionPrompts}
      Player Input: "${prompt}"`;

    console.debug(
      '[Luminara][promptTemplates::action::buildPrompttemplate] promptTemplate',
      promptTemplate
    );

    return promptTemplate;
  };

  const completePromptAsync = async (scene, playerInput) => {
    if (promptCache.has(playerInput)) {
      console.debug('[Luminara][promptManager::completePromptAsync] prompt cache hit');
      return promptCache.get(playerInput);
    }
    
    if (!openAiApiKey) {
      throw new Error('OpenAI API key is missing');
    }
    try {
      const client = new OpenAI({
        dangerouslyAllowBrowser: true,
        apiKey: openAiApiKey,
      });

      const actionPrompts = actions.map((action) => action.prompt).join('\n');
      const actionTemplate = buildPromptTemplate(
        actionPrompts,
        scene,
        playerInput
      );
      const completion = await client.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: actionTemplate }],
        response_format: zodResponseFormat(
          ActionCompletionSchema,
          'ActionCompletionSchema'
        ),
      });

      const result = JSON.parse(completion.choices[0].message.content);
      console.debug(
        '[Luminara][promptManager::completePromptAsync] result',
        result
      );

      promptCache.set(playerInput, result);
      return result;
    } catch (e) {
      console.error(e);
    }
  };

  return {
    completePromptAsync,
  };
};

const createPromptManager = (actions) => {
  return promptManager(actions);
};

export default createPromptManager;
