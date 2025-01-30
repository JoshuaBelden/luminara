import PropTypes from 'prop-types';

function Look({ narratives }) {
  return (
    <div className="desc">
      <i>You look around and see...</i>
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
