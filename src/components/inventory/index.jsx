import PropTypes from 'prop-types';

function Inventory({ character }) {
  return (
    <div className="inventory chrome">
      {character.inventory.map((item, index) => (
        <div key={index} className="inventory__item">
          {item.name}
        </div>
      ))}
    </div>
  );
}

Inventory.propTypes = {
  character: PropTypes.shape({
    inventory: PropTypes.array.isRequired,
  }).isRequired,
};

export default Inventory;
