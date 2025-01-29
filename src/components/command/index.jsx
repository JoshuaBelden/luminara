import './style.scss';

import PropTypes from 'prop-types';

function Command({ onPrompt }) {
  const handleKeyUp = async (e) => {
    if (e.key !== 'Enter') {
      return;
    }

    // const command = await commandManager.createCommand(e.target.value);
    onPrompt(e.target.value);
    e.target.value = '';
  };

  return (
    <div className="command chrome">
      <input className="input" onKeyUp={handleKeyUp}></input>
    </div>
  );
}

Command.propTypes = {
  onPrompt: PropTypes.func.isRequired,
};

export default Command;
