// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  IconClipboardCheck,
  IconUsers,
  IconHome,
  IconInfoSquare,
} from '@tabler/icons';

// constant
const icons = {
  IconClipboardCheck,
  IconUsers,
  IconHome,
  IconInfoSquare,
};

// ==============================|| UI FORMS MENU ITEMS ||============================== //

const Management = {
  id: 'ui-forms',
  title: <FormattedMessage id="Management" />,
  type: 'group',
  role: 'admin',
  children: [
    {
      id: 'clients',
      title: <FormattedMessage id="Clients" />,
      type: 'item',
      url: '/clients',
      icon: icons.IconUsers,
      role: 'admin',
    },
    {
      id: 'users',
      title: <FormattedMessage id="Users" />,
      type: 'item',
      url: '/users',
      icon: icons.IconUsers,
      role: 'admin',
    },
    {
      id: 'storesauto',
      title: <FormattedMessage id="stores Auto" />,
      type: 'item',
      url: '/storesauto',
      icon: icons.IconHome,
      role: 'admin',
    },
    {
      id: 'infomanagement',
      title: <FormattedMessage id="Information" />,
      type: 'item',
      url: '/infomanagement',
      icon: icons.IconInfoSquare,
      role: 'admin',
    },
  ],
};

export default Management;
