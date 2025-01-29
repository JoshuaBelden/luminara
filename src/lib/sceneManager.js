const SceneManager = (scene) => ({
  currentScene: scene
});

const createSceneManager = (scene) => {
  return SceneManager(scene);
}
export default createSceneManager;
