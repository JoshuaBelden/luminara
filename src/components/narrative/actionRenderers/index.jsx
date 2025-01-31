import Look from './Look';
import Examine from './Examine';
import Search from './Search';
import Pickup from './Pickup';
import NoOp from './NoOp';

export const getRenderer = (actionId) => {
  switch (actionId) {
    case 'look':
      return Look;
    case 'examine':
      return Examine;
    case 'search':
      return Search;
    case 'pickup':
      return Pickup;
    default:
      return NoOp;
  }
};
