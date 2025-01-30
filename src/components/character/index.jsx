import PropTypes from 'prop-types';
import Inventory from './Inventory';

function Character({ character }) {
  return (
    <div className="character chrome">
      <div className="character__name">{character.name}</div>
      <div className="character__inventory">
        <Inventory character={character} />
      </div>
    </div>
  );
}

Character.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Character;
