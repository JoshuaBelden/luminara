const lookAction = () => {
  return {
    id: 'look',
    prompt: `- Input: "Take a look around"/n  Output: '{ actionId: "LOOK", targetId: "area" }'`,
    transform: (action, targets, scene, character) => {
      return {
        updatedScene: scene,
        updatedCharacter: character,
        narratives: targets.map((t) => t.description),
      };
    },
  };
};

export default lookAction;