import React from 'react';

// project imports
import ClientTable from './clientstable';
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| APPOINTMENTS ||============================== //

const Clients = () => {
  return (
    <>
      <MainCard>
        <ClientTable />
      </MainCard>
    </>
  );
};

Clients.Layout = 'authGuard';
export default Clients;
