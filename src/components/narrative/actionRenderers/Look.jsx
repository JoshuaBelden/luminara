import PropTypes from 'prop-types';

function Look({ narratives }) {
  return (
    <div className="desc">
      <div>You look around and see...</div>
      <ul>
        {narratives.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
    </div>
  );
}

Look.propTypes = {
  narratives: PropTypes.array.isRequired,
};

export default Look;
