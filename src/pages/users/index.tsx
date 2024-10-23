import React from 'react';
import MainCard from 'ui-component/cards/MainCard';

// project imports
import UsersTable from './userstable';

// ==============================|| USERS ||============================== //

const Users = () => {
  return (
    <>
      <MainCard>
        <UsersTable />
      </MainCard>
    </>
  );
};

Users.Layout = 'authGuard';
export default Users;
