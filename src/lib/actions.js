import { z } from 'zod';

export const ACTIONS = {
  LOOK: 'look',
  EXAMINE: 'examine',
  SEARCH: 'search',
  MOVE: 'move',
  INTERACT: 'interact',
  PICKUP: 'pickup',
  DROP: 'drop',
  USE: 'use',
};

export const actionDescriptors = Object.values(ACTIONS)
  .map((action) => {
    switch (action) {
      case ACTIONS.LOOK:
        return `  - Input: "Take a look around"/n  Output: '{ action: "LOOK", targetId: "area" }'`;
      case ACTIONS.EXAMINE:
        return `  - Input: "Look closer at the item"/n  Output: '{ action: "EXAMINE", targetId: "item" }'`;
      case ACTIONS.SEARCH:
      case ACTIONS.INTERACT:
      case ACTIONS.USE:
      case ACTIONS.MOVE:
      case ACTIONS.PICKUP:
      default:
    }
  })
  .join('\n');

export const ActionCompletionSchema = z.object({
  action: z.enum(Object.values(ACTIONS)),
  targetId: z.string(),
});
