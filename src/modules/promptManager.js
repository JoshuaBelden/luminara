const promptManager = (scene) => {
  const buildCommandPrompt = (playerInput) => `
    You are a natural language parser for a text-based game. Convert player inputs into a structured format related to scene information.
    Scene:
    - PointsOfInterest
      - porch
      - tree-line
      - stone-well
    - Interactables
      - cabin-door
      - well-bucket
      - tree-markings
    Examples:
    - Input: "Take a look around"
      Output: '{ command: "EXAMINE", targetId: "area" }'
    - Input: "Look around the porch"
      Output: '{ command: "SEARCH", target: "porch" }'
    - Input: "Try to open the cabin door"
      Output: '{ command: "INTERACT", target: "cabin-door" }'   
    - Input: "Unlock the cabin door with the key"
      Output: '{ command: "USE", target: "cabin-door-key" }'
    - Input: "Go east"
      Output: '{ command: "MOVE", target: "cabin-door" }'
    - Input: "Take the key"
      Output: '{ command: "PICKUP", target: "cabin-door-key" }'

    Player Input: "${playerInput}"
    Output:`;

  return {
    buildCommandPrompt,
  };
};

const createPromptManager = () => {
  return promptManager();
};

export default createPromptManager;
