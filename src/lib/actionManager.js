import createPromptManager from './promptManager';
import { ActionCompletionSchema, actionTransform } from './actions';

const actionManager = () => {
  const promptManager = createPromptManager();

  const executeActionAsync = async (playerInput, scene, character) => {
    const { action, targetId } = await promptManager.completePromptAsync(
      scene,
      playerInput,
      ActionCompletionSchema
    );

    if (!action || !targetId) {
      throw new Error('[actionManager::executeActionAsync] Invalid action or targetId');
    }

    const targets = [
      ...scene.pointsOfInterest,
      ...scene.interactables,
    ].filter((t) => targetId === 'area' || t.id === targetId);

    const { updatedScene, updatedCharacter, narratives } = actionTransform(action, targets, scene, character);
    const executeActionResult = {
      action,
      targetId,
      updatedScene,
      updatedCharacter,
      narratives
    };

    console.debug('[actionManager::executeActionAsync] executeActionResult', executeActionResult);
    return executeActionResult;
  };

  return {
    executeActionAsync,
  };
};

function createActionManager() {
  return actionManager();
}

export default createActionManager;
