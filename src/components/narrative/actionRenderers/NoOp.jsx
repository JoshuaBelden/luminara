import PropTypes from 'prop-types';

function NoOp({ narratives }) {
  return (
    <div className="desc">
      <ul>
        {narratives.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
    </div>
  );
}

NoOp.propTypes = {
  narratives: PropTypes.array.isRequired,
};

export default NoOp;
