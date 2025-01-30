import { z } from 'zod';

export const ACTIONS = {
  LOOK: 'look', // Describes the scene and surroundings
  EXAMINE: 'examine', // Provides more detail about an item or object
  SEARCH: 'search', // Looks for discoverables or hidden items
  PICKUP: 'pickup',
  INTERACT: 'interact',
  DROP: 'drop',
  USE: 'use',
  MOVE: 'move',
};

export const actionPromptDescriptors = Object.values(ACTIONS)
  .map((action) => {
    switch (action) {
      case ACTIONS.LOOK:
        return `  - Input: "Take a look around"/n  Output: '{ action: "LOOK", targetId: "area" }'`;
      case ACTIONS.EXAMINE:
        return `  - Input: "Look closer at the item"/n  Output: '{ action: "EXAMINE", targetId: "item" }'`;
      case ACTIONS.SEARCH:
        return `  - Input: "Search the specific area for hidden items"/n  Output: '{ action: "SEARCH", targetId: "discoverable" }'`;
      case ACTIONS.INTERACT:
      case ACTIONS.USE:
      case ACTIONS.MOVE:
      case ACTIONS.PICKUP:
      default:
    }
  })
  .join('\n');

export const actionTransform = (action, targets, scene, character) => {
  const actionTransformResult = {
    updatedScene: scene,
    updatedCharacter: character,
    narratives: [],
  };

  switch (action) {
    case ACTIONS.LOOK:
      return {
        ...actionTransformResult,
        narratives: targets.map((t) => t.description),
      };
    case ACTIONS.EXAMINE:
      return {
        ...actionTransformResult,
        narratives: targets.map((t) => t.narrative),
      };
    case ACTIONS.SEARCH: {
      const discoverables = scene.discoverables.filter(
        (d) => d.location === targets[0].id
      );
      if (!discoverables?.length) {
        return {
          ...actionTransformResult,
          narratives: ['You do not find anything of interest.'],
        };
      }

      const updatedScene = {
        ...scene,
        discoverables: scene.discoverables.map((sceneDiscoverable) => {
          if (
            discoverables.some(
              (discoverable) => discoverable.id !== sceneDiscoverable.id
            )
          ) {
            sceneDiscoverable.discovered = true;
          }
          return sceneDiscoverable;
        }),
      };

      return {
        ...actionTransformResult,
        updatedScene,
        narratives: discoverables.map((d) => d.narrative),
      };
    }
  }

  console.debug(
    '[actions::actionTransform] actionTransformResult',
    actionTransformResult
  );
  return actionTransformResult;
};

export const ActionCompletionSchema = z.object({
  action: z.enum(Object.values(ACTIONS)),
  targetId: z.string(),
});
