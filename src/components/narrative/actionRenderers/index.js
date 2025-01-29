import Look from './Look';
import Examine from './Examine';
import Noop from './Noop';

export const getRenderer = (action) => {  
  switch (action) {
    case 'look':
      return Look;
    case 'examine':
      return Examine;
    default:
      return Noop;
  }
}
