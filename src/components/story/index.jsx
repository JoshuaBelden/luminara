import { useParams } from 'react-router';
import { useEffect, useRef, useState } from 'react';

import createStoryManager from 'lib/storyManager';
import createSceneManager from 'lib/sceneManager';
import createCharacterManager from 'lib/characterManager';
import createActionManager from 'lib/actionManager';

import Character from 'components/character';
import Inventory from 'components/inventory';
import Command from 'components/command';
import Narrative from 'components/Narrative';

import './style.scss';

function Story() {
  const storyId = useParams().storyId;
  const [story, setStory] = useState();
  const [scene, setScene] = useState();
  const [character, setCharacter] = useState();
  const [action, setAction] = useState('');
  const [narratives, setNarratives] = useState([]);

  const actionMaager = useRef();

  useEffect(() => {
    const storyManager = createStoryManager(storyId);
    const startingScene = storyManager.currentStory.startingScene;
    setStory(storyManager.currentStory);

    const sceneManager = createSceneManager(startingScene);
    setScene(sceneManager.currentScene);

    const characterManager = createCharacterManager();
    setCharacter(characterManager.currentCharacter);

    actionMaager.current = createActionManager(sceneManager.currentScene);
  }, [storyId]);

  const onPlayerInput = async (playerInput) => {
    const { action, updatedScene, updatedCharacter, narratives } =
      await actionMaager.current.executeActionAsync(
        playerInput,
        scene,
        character
      );
    setScene(updatedScene);
    setCharacter(updatedCharacter);
    setAction(action);
    setNarratives(narratives);
  };

  return (
    <div className="story">
      <div className="story__header">
        <h2>{story?.title}</h2>
        <h3>{scene?.title}</h3>
      </div>
      <div className="story__container">
        <div className="story__tools">
          {character && <Character character={character} />}
          {character && <Inventory character={character} />}
        </div>
        <div className="story__dialog">
          <div className="narrative">
            <div className="narrative__container">
              {scene && <div className="desc">{scene.narrative}</div>}
              {action && <Narrative action={action} narratives={narratives} />}
            </div>
          </div>
        </div>
      </div>
      <div className="story__command">
        <Command onPlayerInput={onPlayerInput} />
      </div>
    </div>
  );
}

export default Story;
