const searchAction = () => {
  const transform = (action, targets, scene, character) => {
    const actionTransformResult = {
      updatedScene: scene,
      updatedCharacter: character,
      narratives: [],
    };

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
        const found = discoverables.some(
          (discoverable) => discoverable.id === sceneDiscoverable.id
        );
        if (found) {
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
  };

  return {
    id: 'search',
    prompt: `- Input: "Search the specific area for hidden items"/n  Output: '{ actionId: "SEARCH", targetId: "discoverable" }'`,
    transform,
  };
};

export default searchAction;
