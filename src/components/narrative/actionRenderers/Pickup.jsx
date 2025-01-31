import PropTypes from 'prop-types';

function Pickup({ narratives }) {
  return (
    <div className="desc">
      <i>You&apos;ve picked up an item...</i>
      <ul>
        {narratives.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
    </div>
  );
}

Pickup.propTypes = {
  narratives: PropTypes.array.isRequired,
};

export default Pickup;
