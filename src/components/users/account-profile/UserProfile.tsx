// material-ui
import { Grid, TextField } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';

// assets
import { IconUser } from '@tabler/icons';
import useAuth from 'hooks/useAuth';
import { FormattedMessage } from 'react-intl';

// ==============================|| PROFILE 2 - USER PROFILE ||============================== //

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <IconUser size="70px" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField disabled fullWidth label={<FormattedMessage id="Name" />} value={user?.name} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField disabled fullWidth label="Email" value={user?.email} />
      </Grid>
    </Grid>
  );
};

export default UserProfile;
