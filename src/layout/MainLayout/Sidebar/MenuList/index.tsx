import { memo } from 'react';

// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import useAuth from 'hooks/useAuth';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const { user } = useAuth();

  let menuItems = menuItem.items;

  if (user?.role != undefined && user?.role.description.toString() == 'user') {
    menuItems = menuItems.filter((x) => x.role != 'admin');
  }

  const navItems = menuItems.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default memo(MenuList);
