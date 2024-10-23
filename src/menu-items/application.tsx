// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconChartArcs, IconClipboardList, IconChartInfographic } from '@tabler/icons';

// constant
const icons = {
  IconChartArcs,
  IconClipboardList,
  IconChartInfographic
};

// ==============================|| WIDGET MENU ITEMS ||============================== //

const Application = {
  id: 'application',
  title: <FormattedMessage id="Application" />,
  type: 'group',
  children: [
    {
      id: 'appointments',
      title: <FormattedMessage id="Appointments" />,
      type: 'item',
      url: '/appointments',
      icon: icons.IconChartArcs
    },
    {
      id: 'missedappointments',
      title: <FormattedMessage id="Missed Appointments" />,
      type: 'item',
      url: '/missedappointments',
      icon: icons.IconChartArcs
    },
    {
      id: 'servicemanagement',
      title: <FormattedMessage id="Service Management" />,
      type: 'item',
      url: '/servicemanagement',
      icon: icons.IconClipboardList
    },
    {
      id: 'control',
      title: <FormattedMessage id="Control" />,
      type: 'item',
      url: '/control',
      icon: icons.IconChartInfographic
    }
  ]
};

export default Application;
