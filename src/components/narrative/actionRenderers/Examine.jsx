import PropTypes from 'prop-types';

function Examine({ narratives }) {
  return (
    <div className="desc">
      <i>You look closer and see...</i>
      <ul>
        {narratives.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
    </div>
  );
}

Examine.propTypes = {
  narratives: PropTypes.array.isRequired,
};

export default Examine;
