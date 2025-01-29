import createPromptManager from './promptManager';
import { ACTIONS, ActionCompletionSchema } from './actions';

const actionManager = () => {
  const executeActionAsync = async (playerInput, scene, character) => {
    const promptManager = createPromptManager();
    const { action, targetId } = await promptManager.completePromptAsync(
      scene,
      playerInput,
      ActionCompletionSchema
    );

    if (!action || !targetId) {
      throw new Error('[actionManager::executeActionAsync] Invalid action or targetId');
    }

    const actionTargets = [
      ...scene.pointsOfInterest,
      ...scene.interactables,
    ].filter((t) => targetId === 'area' || t.id === targetId);

    const executeActionResult = {
      action,
      targetId,
      updatedScene: scene,
      updatedCharacter: character,
    };

    switch (action) {
      case ACTIONS.LOOK:
        return {
          ...executeActionResult,
          narratives: actionTargets.map((t) => t.description),
        };
      case ACTIONS.EXAMINE:
        return {
          ...executeActionResult,
          narratives: actionTargets.map((t) => t.narrative),
        };
    }
  };

  return {
    executeActionAsync,
  };
};

function createActionManager() {
  return actionManager();
}

export default createActionManager;
