import PropTypes from 'prop-types';

function Search({ narratives }) {
  return (
    <div className="desc">
      <i>You uncover...</i>
      <ul>
        {narratives.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
    </div>
  );
}

Search.propTypes = {
  narratives: PropTypes.array.isRequired,
};

export default Search;
