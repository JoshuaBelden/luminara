import Look from './Look';
import Examine from './Examine';
import Search from './Search';

export const getRenderer = (action) => {
  switch (action) {
    case 'look':
      return Look;
    case 'examine':
      return Examine;
    case 'search':
      return Search;
  }
};
