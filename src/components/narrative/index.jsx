import PropTypes from 'prop-types';
import { getRenderer } from './actionRenderers';

import './style.scss';

function Narrative({ actionId, narratives }) {
  const Renderer = getRenderer(actionId);
  return <Renderer narratives={narratives} />;
}

Narrative.propTypes = {
  actionId: PropTypes.string,
  narratives: PropTypes.array.isRequired,
};

export default Narrative;
