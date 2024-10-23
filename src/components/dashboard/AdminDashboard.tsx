import React, { useState, useRef } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Grid,
  Typography,
  useMediaQuery,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';

// project imports
import ChartGoalsBilled from 'components/dashboard/ChartGoalsBilled';
import MainCard from 'ui-component/cards/MainCard';
import RevenueCard from 'ui-component/cards/RevenueCard';
import { gridSpacing } from 'store/constant';
import { FormattedMessage, injectIntl } from 'react-intl';
import useConfig from 'hooks/useConfig';
import { dispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import SubCard from 'ui-component/cards/SubCard';
import CalendarStyled from 'components/application/calendar/CalendarStyled';

// third party
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timelinePlugin from '@fullcalendar/timeline';
import moment from 'moment';

// assets
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import { IconCircles, IconCreditCard, IconShare } from '@tabler/icons';
import { GetGoals, SaveGoal } from 'api/goal';
import { Appointment } from 'types/appointment';
import { Goal } from 'types/goal';
import { Service } from 'types/service';
import { goalDataProps } from 'types/goalData';
import Loader from 'ui-component/Loader';

// ==============================|| GOALS ||============================== //
const AdminDashboard = (props: { intl: any }) => {
  const theme = useTheme();
  const { intl } = props;
  const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));
  const { locale } = useConfig();
  const [selectedGoal, setSelectedGoal] = React.useState<Goal>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const blockSX = {
    p: 2.5,
    borderLeft: '1px solid ',
    borderBottom: '1px solid ',
    borderLeftColor:
      theme.palette.mode === 'dark'
        ? theme.palette.dark.main
        : theme.palette.grey[200],
    borderBottomColor:
      theme.palette.mode === 'dark'
        ? theme.palette.dark.main
        : theme.palette.grey[200],
  };

  const { storeAuto } = useConfig();
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

  const calendarRef = useRef<FullCalendar>(null);

  const [events, setEvents] = useState<any[]>([]);

  const fetchAPI = () => {
    setLoading(true);
    if (storeAuto !== undefined) {
      GetGoals(storeAuto!).then((response) => {
        const result: goalDataProps = response.data.data;
        setData(result);

        var eventsGoals = result.goals.map((goal: Goal) => {
          return {
            title: `${intl.formatMessage({ id: 'Goal' })} ${goal.goal} €`,
            date: moment(goal.date).format('yyyy-MM-DD'),
            color: theme.palette.primary.main,
            sort: 0,
          };
        });

        var eventBilledServices = result.eventBilledServices.map(
          (service: Service) => {
            return {
              title: `${intl.formatMessage({ id: 'Services' })} ${
                service.virtualTotal
              } €`,
              date: `${service.deliverydate}`,
              color: theme.palette.secondary.main,
              sort: 2,
            };
          }
        );

        var eventBilledAppointments = result.eventBilledAppointments.map(
          (appointment: Appointment) => {
            return {
              title: `${intl.formatMessage({ id: 'Appointments' })} ${
                appointment.virtualTotal
              } €`,
              date: moment(appointment.appointmentdate).format('yyyy-MM-DD'),
              color: theme.palette.secondary.dark,
              sort: 1,
            };
          }
        );
        setEvents([
          ...eventsGoals,
          ...eventBilledAppointments,
          ...eventBilledServices,
        ]);
        setLoading(false);
      });
    }
  };

  React.useEffect(() => {
    fetchAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeAuto]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedGoal(undefined);
  };

  const saveGoalFunc = async () => {
    await SaveGoal(selectedGoal!);
    fetchAPI();
    dispatch(
      openSnackbar({
        open: true,
        message: <FormattedMessage id="Goal saved successfully" />,
        variant: 'alert',
        alert: {
          color: 'success',
        },
        close: false,
      })
    );

    handleModalClose();
  };

  const handleGoalChange = (dateStr: any) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }

    const goal = data.goals.find(
      (a: Goal) =>
        a.deleted == false &&
        a.store.id == storeAuto!.id &&
        new Date(a.date).getUTCDate() == new Date(dateStr).getUTCDate() &&
        new Date(a.date).getMonth() + 1 == new Date(dateStr).getMonth() + 1 &&
        new Date(a.date).getFullYear() == new Date(dateStr).getFullYear()
    );

    if (goal !== undefined) {
      setSelectedGoal(goal);
    } else {
      setSelectedGoal({
        id: undefined,
        goal: 0,
        date: new Date(dateStr),
        store: storeAuto!,
        deleted: false,
      });
    }

    setIsModalOpen(true);
  };

  const handleRangeSelect = (arg: any) => {
    handleGoalChange(arg.dateStr);
  };

  const handleEventSelect = (arg: any) => {
    handleGoalChange(arg.event.startStr);
  };

  return (
    <>
      {!loading ? (
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} lg={8} md={6}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <ChartGoalsBilled data={data} />
              </Grid>
              <Grid item xs={12} lg={6}>
                <RevenueCard
                  primary={intl.formatMessage({ id: 'Current Situation' })}
                  secondary={`€ ` + data.todayBilled}
                  iconPrimary={MonetizationOnTwoToneIcon}
                  color={
                    Number(data.todayBilled) < Number(data.todayGoal)
                      ? theme.palette.error.main
                      : theme.palette.secondary.main
                  }
                  content={`€ ` + data.lastMonthBilled + ` - Último Mês`}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <RevenueCard
                  primary={intl.formatMessage({ id: "Today's Goal" })}
                  secondary={`€ ` + data.todayGoal}
                  iconPrimary={EmojiEventsTwoToneIcon}
                  color={theme.palette.primary.main}
                  content={`€ ` + data.lastMonthGoal + ` - Último Mês`}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4} md={6}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <MainCard
                  content={false}
                  sx={{
                    '& svg': {
                      width: 50,
                      height: 50,
                      color: theme.palette.secondary.main,
                      borderRadius: '14px',
                      p: 1.25,
                      bgcolor:
                        theme.palette.mode === 'dark'
                          ? theme.palette.background.default
                          : 'primary.light',
                    },
                  }}
                >
                  <Grid container alignItems="center" spacing={0}>
                    <Grid item xs={12} sm={6} sx={blockSX}>
                      <Grid
                        container
                        alignItems="center"
                        spacing={1}
                        justifyContent={
                          matchDownXs ? 'space-between' : 'center'
                        }
                      >
                        <Grid item>
                          <IconShare stroke={1.5} />
                        </Grid>
                        <Grid item sm zeroMinWidth>
                          <Typography variant="h5" align="center">
                            {(
                              Number(data.todayBilled) - Number(data.todayGoal)
                            ).toString() + ' €'}
                          </Typography>
                          <Typography variant="subtitle2" align="center">
                            <FormattedMessage id="Daily Difference" />
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={blockSX}>
                      <Grid
                        container
                        alignItems="center"
                        spacing={1}
                        justifyContent={
                          matchDownXs ? 'space-between' : 'center'
                        }
                      >
                        <Grid item>
                          <IconShare stroke={1.5} />
                        </Grid>
                        <Grid item sm zeroMinWidth>
                          <Typography variant="h5" align="center">
                            {(
                              Number(data.monthlyBilled) -
                              Number(data.monthlyGoal)
                            ).toString() + ' €'}
                          </Typography>
                          <Typography variant="subtitle2" align="center">
                            <FormattedMessage id="Monthly Difference" />
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container alignItems="center" spacing={0}>
                    <Grid item xs={12} sm={6} sx={blockSX}>
                      <Grid
                        container
                        alignItems="center"
                        spacing={1}
                        justifyContent={
                          matchDownXs ? 'space-between' : 'center'
                        }
                      >
                        <Grid item>
                          <IconCircles stroke={1.5} />
                        </Grid>
                        <Grid item sm zeroMinWidth>
                          <Typography variant="h5" align="center">
                            {data.monthlyGoal + ' €'}
                          </Typography>
                          <Typography variant="subtitle2" align="center">
                            <FormattedMessage id="Daily Goal" />
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={blockSX}>
                      <Grid
                        container
                        alignItems="center"
                        spacing={1}
                        justifyContent={
                          matchDownXs ? 'space-between' : 'center'
                        }
                      >
                        <Grid item>
                          <IconCreditCard stroke={1.5} />
                        </Grid>
                        <Grid item sm zeroMinWidth>
                          <Typography variant="h5" align="center">
                            {data.monthlyBilled + ' €'}
                          </Typography>
                          <Typography variant="subtitle2" align="center">
                            <FormattedMessage id="Daily Billed" />
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container alignItems="center" spacing={0}>
                    <Grid item xs={12} sm={12} sx={blockSX}>
                      <Grid
                        container
                        alignItems="center"
                        spacing={1}
                        justifyContent={
                          matchDownXs ? 'space-between' : 'center'
                        }
                      >
                        <Grid item>
                          <IconCircles stroke={1.5} />
                        </Grid>
                        <Grid item sm zeroMinWidth>
                          <Typography variant="h5" align="center">
                            {data.monthlyTotalGoal + ' €'}
                          </Typography>
                          <Typography variant="subtitle2" align="center">
                            <FormattedMessage id="Monthly Goal Total" />
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </MainCard>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <MainCard title={<FormattedMessage id="Goals Management" />}>
              <CalendarStyled>
                <SubCard>
                  <FullCalendar
                    weekends
                    selectable
                    locale={locale}
                    initialDate={new Date()}
                    initialView={'dayGridMonth'}
                    eventDisplay="block"
                    events={events}
                    dateClick={handleRangeSelect}
                    eventClick={handleEventSelect}
                    plugins={[
                      listPlugin,
                      dayGridPlugin,
                      timelinePlugin,
                      interactionPlugin,
                    ]}
                    eventOrder="sort"
                  />
                </SubCard>
              </CalendarStyled>

              {/* Dialog renders its body even if not open */}
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
                      <FormattedMessage id="Edit Goal" />
                    </DialogTitle>
                    <DialogContent>
                      <Stack spacing={3}>
                        <DialogContentText>
                          {' '}
                          {moment(selectedGoal!.date).format('yyyy-MM-DD')}
                        </DialogContentText>
                        <TextField
                          autoFocus
                          size="small"
                          id="name"
                          label={<FormattedMessage id="Goal" />}
                          type="number"
                          value={selectedGoal?.goal || 0}
                          onChange={(e) => {
                            setSelectedGoal({
                              ...selectedGoal!,
                              goal: Number(e.target.value),
                            });
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
                        onClick={saveGoalFunc}
                      >
                        <FormattedMessage id="Save" />
                      </Button>
                    </DialogActions>
                  </>
                )}
              </Dialog>
            </MainCard>
          </Grid>
        </Grid>
      ) : (
        <Loader />
      )}
    </>
  );
};

AdminDashboard.Layout = 'authGuard';
export default injectIntl(AdminDashboard);
