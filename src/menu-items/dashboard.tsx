// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDeviceAnalytics, IconTrophy } from '@tabler/icons';
import { OverrideIcon } from 'types';

// constant
const icons = {
  IconDeviceAnalytics,
  IconTrophy
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

interface DashboardMenuProps {
  id: string;
  title: React.ReactNode | string;
  type: string;
  children: {
    id: string;
    title: React.ReactNode | string;
    type: string;
    url: string;
    icon: OverrideIcon;
    breadcrumbs: boolean;
  }[];
}

const dashboard: DashboardMenuProps = {
  id: 'dashboard',
  title: <FormattedMessage id="Dashboard" />,
  type: 'group',
  children: [
    {
      id: 'goals',
      title: <FormattedMessage id="Goals" />,
      type: 'item',
      url: '/',
      icon: icons.IconTrophy,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
