import './style.scss';

function Command() {
  const handleKeyUp = async (e) => {
    if (e.key !== 'Enter') {
      return;
    }

    // const command = await commandManager.createCommand(e.target.value);
    e.target.value = '';
  };

  return (
    <div className="command chrome">
      <input className="input" onKeyUp={handleKeyUp}></input>
    </div>
  );
}

export default Command;
