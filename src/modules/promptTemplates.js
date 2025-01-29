export const buildCommandPrompt = (playerInput) => `
  You are a natural language parser for a text-based game. Convert player inputs into a structured format.
  Examples:
  - Input: "Take a look around the room"
    Output: '{ command: "describe", target: "area" }'
  - Input: "Open the door to the north"
    Output: '{ command: "interact", target: "door", direction: "north" }'
  - Input: "Pick up the rusty key"
    Output: '{ command: "interact", target: "rusty key" }'
  - Input: "Go east"
    Output: '{ command: "move", direction: "east" }'
  - Input: "Talk to the guard"
    Output: '{ command: "interact", target: "guard" }'

  Player Input: "${playerInput}"
  Output:`;
