import PropTypes from 'prop-types';
import { getRenderer } from './actionRenderers';

import './style.scss';

function Narrative({ action, narratives }) {
  const Renderer = getRenderer(action);
  return <Renderer narratives={narratives} />;
}

Narrative.propTypes = {
  action: PropTypes.string.isRequired,
  narratives: PropTypes.array.isRequired,
};

export default Narrative;
