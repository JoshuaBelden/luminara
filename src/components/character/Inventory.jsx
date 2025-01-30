import PropTypes from 'prop-types';

function Inventory({ character }) {
  return (
    <div className="">
      <h3>Inventory</h3>
      {character.inventory.map((item, index) => (
        <div key={index} className="item">
          {item.description}
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
