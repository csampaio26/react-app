import dashboard from './dashboard';
import application from './application';
import management from './management';
import { NavItemType } from 'types';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [dashboard, application, management]
};

export default menuItems;
