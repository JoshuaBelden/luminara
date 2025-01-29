import { NavLink } from 'react-router';
import PropTypes from 'prop-types';
import "./style.scss";

function Menu({ storyPacks }) {
  return (
    <div className="menu">
      <h1>Luminara</h1>
      {storyPacks.map((storyPack) => (
        <NavLink key={storyPack.id} to={`/story/${storyPack.id}`}>
          {storyPack.title}
        </NavLink>
      ))}
    </div>
  );
}

Menu.propTypes = {
  storyPacks: PropTypes.array.isRequired,
};

export default Menu;
