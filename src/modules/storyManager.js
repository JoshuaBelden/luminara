import storyPacks from 'modules/storyPacks';

const StoryManager = (story) => ({
  currentStory: story,
});

const createStoryManager = (storyId) => {
  return StoryManager(storyPacks.find((story) => story.id === storyId));
};

export default createStoryManager;
