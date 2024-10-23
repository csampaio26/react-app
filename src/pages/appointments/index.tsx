import { Button } from '@mui/material';
import React, { useState } from 'react';

// project imports
import AppointmentTable from './appointmenttable';
import AddIcon from '@mui/icons-material/Add';
import ManageAppointment from './manageappointment';
import { Appointment } from 'types/appointment';
import { FormattedMessage } from 'react-intl';
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| APPOINTMENTS ||============================== //

const Appointments = () => {
  const [appointment, setAppointment] = useState<Appointment>();

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const handleDrawerOpen = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  const addItem = () => {
    setAppointment(undefined);
    handleDrawerOpen();
  };

  const handleSetAppointment = (selectedAppointment: Appointment) => {
    setAppointment(selectedAppointment);
  };

  return (
    <MainCard>
      <Button variant="contained" size="small" color="secondary" onClick={addItem} endIcon={<AddIcon />}>
        <FormattedMessage id="Add Appointment" />
      </Button>
      <AppointmentTable handleSetAppointment={handleSetAppointment} handleDrawerOpen={handleDrawerOpen} />
      <ManageAppointment open={openDrawer} appointment={appointment} handleDrawerOpen={handleDrawerOpen} />
    </MainCard>
  );
};

Appointments.Layout = 'authGuard';
export default Appointments;
