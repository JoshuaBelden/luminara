import createPromptManager from './promptManager';
import { actions } from './actions';

const actionManager = () => {
  const executeActionAsync = async (playerInput, scene, character) => {
    const promptManager = createPromptManager(actions);
    const { actionId, targetId } = await promptManager.completePromptAsync(
      scene,
      playerInput,
    );

    if (!actionId || !targetId) {
      throw new Error('[actionManager::executeActionAsync] Invalid action or targetId');
    }

    const targets = [
      ...scene.pointsOfInterest,
      ...scene.interactables,
      ...scene.items.filter(d => !d.hidden),
    ].filter((t) => targetId === 'area' || t.id === targetId);

    if (!targets.length) {
      return {
        action: null,
        targetId,
        updatedScene: scene,
        updatedCharacter: character,
        narratives: ['There is nothing of interest.'],
      };
    }
    
    const action = actions.find((a) => a.id === actionId);
    const { updatedScene, updatedCharacter, narratives } = action.transform(action, targetId, targets, scene, character);
    const executeActionResult = {
      action,
      targetId,
      updatedScene,
      updatedCharacter,
      narratives
    };

    console.debug('[Luminara][actionManager::executeActionAsync] executeActionResult', executeActionResult);
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
