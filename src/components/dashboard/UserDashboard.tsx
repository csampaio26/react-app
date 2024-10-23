import React from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';

// project imports
import { GetGoals } from 'api/goal';
import useConfig from 'hooks/useConfig';
import { FormattedMessage, injectIntl } from 'react-intl';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { IconEye } from '@tabler/icons';
import { dispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { goalDataProps } from 'types/goalData';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.dark.dark
      : theme.palette.secondary.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background:
      theme.palette.mode === 'dark'
        ? `linear-gradient(210.04deg, ${theme.palette.secondary.dark} -50.94%, rgba(144, 202, 249, 0) 95.49%)`
        : theme.palette.secondary[800],
    borderRadius: '50%',
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140,
    },
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background:
      theme.palette.mode === 'dark'
        ? `linear-gradient(140.9deg, ${theme.palette.secondary.dark} -14.02%, rgba(144, 202, 249, 0) 85.50%)`
        : theme.palette.secondary[800],
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70,
    },
  },
}));

// ==============================|| GOALS ||============================== //

const UserDashboard = (props: { intl: any }) => {
  const theme = useTheme();
  const { storeAuto } = useConfig();

  const [showData, setShowData] = React.useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [strpass, setStrpass] = React.useState('');
  const [data, setData] = React.useState<goalDataProps>({
    services: [],
    appointments: [],
    goals: [],
    todayBilled: 0,
    todayGoal: 0,
    monthlyBilled: 0,
    monthlyGoal: 0,
    monthlyTotalGoal: 0,
    lastMonthBilled: 0,
    lastMonthGoal: 0,
    controls: [],
    eventBilledAppointments: [],
    eventBilledServices: [],
  });

  const fetchAPI = () => {
    if (storeAuto !== undefined) {
      GetGoals(storeAuto!).then((response) => {
        const result: goalDataProps = response.data.data;
        setData(result);
      });
    }
  };

  React.useEffect(() => {
    fetchAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeAuto]);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Grid container spacing={gridSpacing} marginBottom={2}>
        <Grid item xs={12} lg={12} md={12}>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => {
              if (!showData) {
                setIsModalOpen(true);
              } else {
                setShowData(!showData);
              }
            }}
            endIcon={<IconEye />}
          >
            {!showData ? (
              <FormattedMessage id="Show Information" />
            ) : (
              <FormattedMessage id="Hide Information" />
            )}
          </Button>
        </Grid>
        <Dialog
          maxWidth="sm"
          fullWidth
          onClose={handleModalClose}
          open={isModalOpen}
          sx={{ '& .MuiDialog-paper': { p: 0 } }}
        >
          {isModalOpen && (
            <>
              <DialogTitle id="form-dialog-title">
                <FormattedMessage id="Password" />
              </DialogTitle>
              <DialogContent>
                <Stack spacing={3}>
                  <TextField
                    autoFocus
                    size="small"
                    id="name"
                    label={<FormattedMessage id="Password" />}
                    type="text"
                    onChange={(e) => {
                      setStrpass(e.target.value);
                    }}
                    fullWidth
                  />
                </Stack>
              </DialogContent>
              <DialogActions sx={{ pr: 2.5 }}>
                <Button
                  sx={{ color: theme.palette.primary.dark }}
                  onClick={handleModalClose}
                  color="secondary"
                >
                  <FormattedMessage id="Cancel" />
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => {
                    if (strpass == process.env.NEXT_PUBLIC_GOALS_PASSWORD) {
                      setShowData(!showData);
                      setTimeout(() => {
                        setShowData(false);
                      }, 10000);
                      setIsModalOpen(false);
                    } else {
                      dispatch(
                        openSnackbar({
                          open: true,
                          message: <FormattedMessage id="Wrong Password" />,
                          variant: 'alert',
                          alert: {
                            color: 'error',
                          },
                          close: false,
                        })
                      );
                    }
                  }}
                >
                  <FormattedMessage id="Show" />
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Grid>
      {showData && (
        <Grid container spacing={gridSpacing}>
          <Grid item xs={6} lg={6} md={6}>
            <CardWrapper border={false} content={false}>
              <Box sx={{ p: 2.25 }}>
                <Grid container direction="column">
                  <Grid item>
                    <Grid container alignItems="center">
                      <Grid item>
                        <Typography
                          sx={{
                            fontSize: '2.125rem',
                            fontWeight: 500,
                            mr: 1,
                            mt: 1.75,
                            mb: 0.75,
                          }}
                          color={
                            data.todayBilled > data.todayGoal
                              ? theme.palette.success.main
                              : theme.palette.error.main
                          }
                        >
                          {data.todayBilled} €
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sx={{ mb: 1.25 }}>
                    <Typography
                      sx={{
                        fontSize: '1rem',
                        fontWeight: 500,
                        color:
                          theme.palette.mode === 'dark'
                            ? theme.palette.text.secondary
                            : theme.palette.secondary[200],
                      }}
                    >
                      <FormattedMessage id="Current Situation" />
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </CardWrapper>
          </Grid>
          <Grid item xs={6} lg={6} md={6}>
            <CardWrapper border={false} content={false}>
              <Box sx={{ p: 2.25 }}>
                <Grid container direction="column">
                  <Grid item>
                    <Grid container alignItems="center">
                      <Grid item>
                        <Typography
                          sx={{
                            fontSize: '2.125rem',
                            fontWeight: 500,
                            mr: 1,
                            mt: 1.75,
                            mb: 0.75,
                          }}
                        >
                          {data.todayGoal} €
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sx={{ mb: 1.25 }}>
                    <Typography
                      sx={{
                        fontSize: '1rem',
                        fontWeight: 500,
                        color:
                          theme.palette.mode === 'dark'
                            ? theme.palette.text.secondary
                            : theme.palette.secondary[200],
                      }}
                    >
                      <FormattedMessage id="Today's Goal" />
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </CardWrapper>
          </Grid>
          <Grid item xs={6} lg={6} md={6}>
            <CardWrapper border={false} content={false}>
              <Box sx={{ p: 2.25 }}>
                <Grid container direction="column">
                  <Grid item>
                    <Grid container alignItems="center">
                      <Grid item>
                        <Typography
                          sx={{
                            fontSize: '2.125rem',
                            fontWeight: 500,
                            mr: 1,
                            mt: 1.75,
                            mb: 0.75,
                          }}
                          color={
                            Number(data.todayBilled) - Number(data.todayGoal) >
                            0
                              ? theme.palette.success.main
                              : theme.palette.error.main
                          }
                        >
                          {(
                            Number(data.todayBilled) - Number(data.todayGoal)
                          ).toString() + ` €`}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sx={{ mb: 1.25 }}>
                    <Typography
                      sx={{
                        fontSize: '1rem',
                        fontWeight: 500,
                        color:
                          theme.palette.mode === 'dark'
                            ? theme.palette.text.secondary
                            : theme.palette.secondary[200],
                      }}
                    >
                      <FormattedMessage id="Daily Difference" />
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </CardWrapper>
          </Grid>
          <Grid item xs={6} lg={6} md={6}>
            <CardWrapper border={false} content={false}>
              <Box sx={{ p: 2.25 }}>
                <Grid container direction="column">
                  <Grid item>
                    <Grid container alignItems="center">
                      <Grid item>
                        <Typography
                          color={
                            Number(data.monthlyBilled) -
                              Number(data.monthlyGoal) >
                            0
                              ? theme.palette.success.main
                              : theme.palette.error.main
                          }
                          sx={{
                            fontSize: '2.125rem',
                            fontWeight: 500,
                            mr: 1,
                            mt: 1.75,
                            mb: 0.75,
                          }}
                        >
                          {(
                            Number(data.monthlyBilled) -
                            Number(data.monthlyGoal)
                          ).toString() + ` €`}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sx={{ mb: 1.25 }}>
                    <Typography
                      sx={{
                        fontSize: '1rem',
                        fontWeight: 500,
                        color:
                          theme.palette.mode === 'dark'
                            ? theme.palette.text.secondary
                            : theme.palette.secondary[200],
                      }}
                    >
                      <FormattedMessage id="Monthly Difference" />
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </CardWrapper>
          </Grid>
        </Grid>
      )}
    </>
  );
};

UserDashboard.Layout = 'authGuard';
export default injectIntl(UserDashboard);
