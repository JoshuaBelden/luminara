import { actionDescriptors } from 'lib/actions';

export const buildActionPromptTemplate = (scene, prompt) => {
  const pointsOfInterest = scene.pointsOfInterest
    .map((poi) => `    - ${poi.id}`)
    .join('\n');

  const interactables = scene.interactables
    .map((interactable) => `    - ${interactable.id}`)
    .join('\n');

  const promptTemplate = `You are a natural language parser for a text-based game. Convert player inputs into a structured format related to the scene information.
  Scene:
  - PointsOfInterest
${pointsOfInterest}
  - Interactables
${interactables}
  Examples:
${actionDescriptors}
  Player Input: "${prompt}"`;

  console.debug(
    '[promptTemplates::action::buildActionPrompttemplate] promptTemplate',
    promptTemplate
  );

  return promptTemplate;
};
