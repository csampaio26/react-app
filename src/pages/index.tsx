import React from 'react';
import useAuth from 'hooks/useAuth';
import AdminDashboard from 'components/dashboard/AdminDashboard';
import UserDashboard from 'components/dashboard/UserDashboard';
// ==============================|| GOALS ||============================== //

const Goals = (props: { intl: any }) => {
  const { user } = useAuth();
  return (
    <>
      {user?.role != undefined && (user?.role.description.toString() == 'admin' || user?.role.description.toString() == 'super_admin') ? (
        <AdminDashboard />
      ) : (
        <UserDashboard />
      )}
    </>
  );
};

Goals.Layout = 'authGuard';
export default Goals;
