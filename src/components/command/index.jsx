import PropTypes from 'prop-types';
import './style.scss';

function Command({ onPlayerInput }) {
  const handleKeyUp = async (e) => {
    if (e.key !== 'Enter') {
      return;
    }

    onPlayerInput(e.target.value);
    e.target.value = '';
  };

  return (
    <div className="command chrome">
      <input id="playerInput" autoFocus={true} className="input" onKeyUp={handleKeyUp}></input>
    </div>
  );
}

Command.propTypes = {
  onPlayerInput: PropTypes.func.isRequired,
};

export default Command;
