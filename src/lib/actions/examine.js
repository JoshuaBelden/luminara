const examineAction = () => {
  return {
    id: 'examine',
    prompt: `- Input: "Look closer at the item"/n  Output: '{ actionId: "examine", targetId: "item" }'`,
    transform: (action, targetId, targets, scene, character) => {
      return {
        updatedScene: scene,
        updatedCharacter: character,
        narratives: targets.map((t) => t.narrative),
      };
    },
  };
};

export default examineAction;
