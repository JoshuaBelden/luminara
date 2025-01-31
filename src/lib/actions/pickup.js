const pickupAction = () => {
  const transform = (action, targetId, targets, scene, character) => {
    const actionTransformResult = {
      updatedScene: scene,
      updatedCharacter: character,
      narratives: [],
    };

    const foundItem = scene.items.find((d) => d.id === targetId);
    if (!foundItem) {
      return {
        ...actionTransformResult,
        narratives: ['You do not find anything of interest.'],
      };
    }
    
    const updatedScene = {
      ...scene,
      items: scene.items.filter(item => item.id !== foundItem.id),
    };

    const updatedCharacter = {
      ...character,
      inventory: [
        ...character.inventory,
        foundItem
      ]
    }

    return {
      updatedScene,
      updatedCharacter,
      narratives: [foundItem.narrative],
    };
  }

  return {
    id: 'pickup',
    prompt: `- Input: "Take the item", "Pick up the item"/n  Output: '{ actionId: "pickup", targetId: "item" }'`,
    transform
  };
};

export default pickupAction;