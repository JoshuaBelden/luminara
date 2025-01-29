import PropTypes from 'prop-types';

function Character({ character }) {
  return (
    <div className="character chrome">
      <div className="character__name">{character.name}</div>
    </div>
  );
}

Character.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Character;
