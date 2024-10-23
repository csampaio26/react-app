import React from 'react';

// material-ui
import { Button, Grid, Stack, TextField } from '@mui/material';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import { FormattedMessage } from 'react-intl';
import { dispatch } from 'store';
import { resetPassword } from 'store/slices/userSlice';
import { ResetPassword } from 'types/auth';
import { openSnackbar } from 'store/slices/snackbar';
import useAuth from 'hooks/useAuth';

// ==============================|| CHANGE PASSWORD ||============================== //

const ChangePassword = () => {
  const { user } = useAuth();
  const [resetPass, setResetPass] = React.useState<ResetPassword>({ user: { ...user! }, repeat_password: '', new_password: '' });

  const changePassword = () => {
    if (
      resetPass.new_password == resetPass.repeat_password &&
      resetPass?.new_password !== undefined &&
      resetPass?.new_password?.length >= 6
    ) {
      dispatch(resetPassword(resetPass!));
      dispatch(
        openSnackbar({
          open: true,
          message: <FormattedMessage id="Password saved successfully" />,
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    } else {
      if (resetPass.new_password != resetPass.repeat_password) {
        dispatch(
          openSnackbar({
            open: true,
            message: <FormattedMessage id="Passwords don't match" />,
            variant: 'alert',
            alert: {
              color: 'error'
            },
            close: false
          })
        );
      } else {
        dispatch(
          openSnackbar({
            open: true,
            message: <FormattedMessage id="Password not strong enough" />,
            variant: 'alert',
            alert: {
              color: 'error'
            },
            close: false
          })
        );
      }
    }
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={6}>
        <TextField
          type="password"
          value={resetPass?.new_password || ''}
          onChange={(e) => {
            setResetPass({ ...resetPass, new_password: e.target.value });
          }}
          id="new_password"
          fullWidth
          label={<FormattedMessage id="New Password" />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          type="password"
          id="repeat_password"
          value={resetPass?.repeat_password || ''}
          onChange={(e) => {
            setResetPass({ ...resetPass, repeat_password: e.target.value });
          }}
          fullWidth
          label={<FormattedMessage id="Confirm Password" />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Stack direction="row">
          <AnimateButton>
            <Button variant="outlined" size="large" onClick={changePassword}>
              <FormattedMessage id="Change Password" />
            </Button>
          </AnimateButton>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ChangePassword;
