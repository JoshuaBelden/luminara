const searchAction = () => {
  const transform = (action, targetId, targets, scene, character) => {
    const actionTransformResult = {
      updatedScene: scene,
      updatedCharacter: character,
      narratives: [],
    };

    const items = scene.items.filter((d) => d.location === targetId);
    if (!items?.length) {
      return {
        ...actionTransformResult,
        narratives: ['You do not find anything of interest.'],
      };
    }

    const updatedScene = {
      ...scene,
      items: scene.items.map((sceneItem) => {
        sceneItem.hidden = items.some((i) => i.id === sceneItem.id);
        return sceneItem;
      }),
    };

    return {
      ...actionTransformResult,
      updatedScene,
      narratives: items.map((d) => d.narrative),
    };
  };

  return {
    id: 'search',
    prompt: `- Input: "Search the specific area for hidden items"/n  Output: '{ actionId: "SEARCH", targetId: "discoverable" }'`,
    transform,
  };
};

export default searchAction;
