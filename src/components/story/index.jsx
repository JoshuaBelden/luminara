import { useParams } from 'react-router';
import createStoryManager from 'modules/storyManager';
import createSceneManager from 'modules/sceneManager';
import createCharacterManager from 'modules/characterManager';
import createCommandManager from 'modules/commandManager';
import Character from 'components/character';
import Inventory from 'components/inventory';
import Command from 'components/command';
import Dialog from 'components/dialog';
import './style.scss';
import { useState } from 'react';

function Story() {
  const storyManager = createStoryManager(useParams().storyId);
  const story = storyManager.currentStory;

  const sceneManager = createSceneManager(story.startingScene);
  const scene = sceneManager.currentScene;

  const characterManager = createCharacterManager();
  const character = characterManager.currentCharacter;
  
  const commandManager = createCommandManager(sceneManager.currentScene);

  const [dialog, setDialog] = useState([
    {
      isNarrator: true,
      text: scene.narrative,
    },
  ]);

  const onPrompt = async (input) => {
    
    const command = await commandManager.createCommand(input);
    const str = JSON.stringify(command);
    setDialog([
      ...dialog,
      { isNarrator: false, text: input },
      { isNarrator: true, text: str },
    ]);
  }

  return (
    <div className="story">
      <div className="story__header">
        <h2>{story.title}</h2>
        <h3>{scene.title}</h3>
      </div>
      <div className="story__container">
        <div className="story__tools">
          <Character character={character} />
          <Inventory character={character} />
        </div>
        <div className="story__dialog">
          <Dialog dialog={dialog} />
        </div>
      </div>
      <div className="story__command">
        <Command onPrompt={onPrompt} />
      </div>
    </div>
  );
}

export default Story;
