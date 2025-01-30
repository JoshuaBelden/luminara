const CharacterManager = (character) => ({
  currentCharacter: character
})

const createCharacterManager = () => {
  const character = {
    name: 'John Doe',
    discoverables: [{
      id: 'note-from-friend',
      description: 'A note from a friend',
      narrative: 'A note from your old friend. It reads: "Meet me at the old oak tree by the cabin."'
    }],
    inventory: [{
      id: 1,
      description: 'A compass.',
      narrative: 'A compass that points to the north.'
    }]
  }
  return CharacterManager(character);
}

export default createCharacterManager;
