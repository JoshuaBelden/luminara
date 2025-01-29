import { useParams } from 'react-router';
import createStoryManager from 'modules/storyManager';
import createSceneManager from 'modules/sceneManager';
import createCharacterManager from 'modules/characterManager';
import Character from 'components/character';
import Inventory from 'components/inventory';
import Command from 'components/command';
import Dialog from 'components/dialog';
import './style.scss';

function Story() {
  const storyId = useParams().storyId;
  const storyManager = createStoryManager(storyId);
  const story = storyManager.currentStory;

  const sceneManager = createSceneManager(story.startingScene);
  const scene = sceneManager.currentScene;

  const characterManager = createCharacterManager();
  const character = characterManager.currentCharacter;

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
          <Dialog />
        </div>
      </div>
      <div className="story__command">
        <Command />
      </div>
    </div>
  );
}

export default Story;
