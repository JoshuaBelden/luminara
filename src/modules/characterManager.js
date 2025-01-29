const CharacterManager = (character) => ({
  currentCharacter: character
})

const createCharacterManager = () => {
  const character = {
    name: 'John Doe',
    inventory: [{
      id: 1,
      name: 'Compass',
      description: 'A compass that points to the north.'
    }]
  }
  return CharacterManager(character);
}

export default createCharacterManager;
