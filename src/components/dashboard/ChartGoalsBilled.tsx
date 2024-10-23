import React, { useEffect, useState } from 'react';

// material-ui
import { Box, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// third-party
import dynamic from 'next/dynamic';
import { Props as ChartProps } from 'react-apexcharts';
import { FormattedMessage, injectIntl } from 'react-intl';

// project imports
import useConfig from 'hooks/useConfig';
import MainCard from 'ui-component/cards/MainCard';

// assets
import { Appointment } from 'types/appointment';
import { Goal } from 'types/goal';
import { Service } from 'types/service';
import { IconCircles, IconCreditCard } from '@tabler/icons';
import { goalDataProps } from 'types/goalData';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const chartOptions: ChartProps = {
  chart: {
    height: 200,
    type: 'area',
    id: 'market-share-area-chart',
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    sparkline: {
      enabled: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    width: 2,
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.5,
      opacityTo: 0,
      stops: [0, 80, 100],
    },
  },
  legend: {
    show: false,
  },
  yaxis: {
    min: 1,
    labels: {
      show: false,
    },
  },
};

// ===========================|| DASHBOARD ANALYTICS - MARKET SHARE AREA CHART CARD ||=========================== //

const ChartGoalsBilled = (props: { intl: any; data: goalDataProps }) => {
  const theme = useTheme();
  const { intl, data } = props;
  const { storeAuto } = useConfig();
  const { navType } = useConfig();
  const [series, setSeries] = React.useState<any>([]);

  const secondaryMain = theme.palette.secondary.main;
  const errorMain = theme.palette.error.main;
  const primaryDark = theme.palette.primary.dark;

  const [options, setOptions] = useState<ChartProps>(chartOptions);

  React.useEffect(() => {
    let goalsSeries: number[] = new Array(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      ).getUTCDate()
    );
    for (let i = 0; i < goalsSeries.length; ++i) goalsSeries[i] = 0;

    goalsSeries = goalsSeries.map((item: number, index: number) => {
      return data.goals
        .filter(
          (a: Goal) =>
            a.deleted == false &&
            new Date(a.date).getUTCDate() == index + 1 &&
            new Date(a.date).getMonth() + 1 == new Date().getMonth() + 1 &&
            new Date(a.date).getFullYear() == new Date().getFullYear()
        )
        .reduce((sum, current: Goal) => sum + current.goal, 0);
    });

    let appointmentsSeries: number[] = new Array(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      ).getUTCDate()
    );
    for (let i = 0; i < appointmentsSeries.length; ++i)
      appointmentsSeries[i] = 0;

    appointmentsSeries = appointmentsSeries.map(
      (item: number, index: number) => {
        return data.appointments
          .filter(
            (appointment: Appointment) =>
              appointment.missed == false &&
              appointment.deleted == false &&
              appointment.transfered == false &&
              new Date(appointment.appointmentdate).getUTCDate() == index + 1 &&
              new Date(appointment.appointmentdate).getMonth() + 1 ==
                new Date().getMonth() + 1 &&
              new Date(appointment.appointmentdate).getFullYear() ==
                new Date().getFullYear()
          )
          .reduce((sum, current: Appointment) => sum + current.price, 0);
      }
    );

    let servicesSeries: number[] = new Array(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      ).getUTCDate()
    );
    for (let i = 0; i < servicesSeries.length; ++i) servicesSeries[i] = 0;

    servicesSeries = servicesSeries.map((item: number, index: number) => {
      return data.services
        .filter(
          (service: Service) =>
            service.deleted == false &&
            new Date(service.deliverydate).getUTCDate() == index + 1 &&
            new Date(service.deliverydate).getMonth() + 1 ==
              new Date().getMonth() + 1 &&
            new Date(service.deliverydate).getFullYear() ==
              new Date().getFullYear()
        )
        .reduce(
          (sum, current: Service) =>
            sum +
            current.services.reduce((c: any, d: any) => {
              return c + (d !== null ? d.value : 0);
            }, 0),
          0
        );
    });

    const billed = servicesSeries.map(function (num, idx) {
      return num + appointmentsSeries[idx];
    });

    setSeries([
      {
        name: intl.formatMessage({ id: 'Goal' }),
        data: goalsSeries,
      },
      {
        name: intl.formatMessage({ id: 'Billed' }),
        data: billed,
      },
    ]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.goals, data.appointments, data.services]);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeAuto]);

  useEffect(() => {
    setOptions((prevState: any) => ({
      ...prevState,
      colors: [primaryDark, secondaryMain, primaryDark],
      tooltip: {
        theme: navType === 'dark' ? 'dark' : 'light',
      },
    }));
  }, [navType, secondaryMain, errorMain, primaryDark]);

  return (
    <MainCard sx={{ '&>div': { p: 0, pb: '0px !important' } }}>
      <Box
        sx={{
          p: 3,
        }}
      >
        <Grid container direction="column" spacing={3}>
          <Grid item container spacing={1} alignItems="center">
            <Grid item>
              <Typography variant="h3">
                <FormattedMessage id="Monthly Billed" />
              </Typography>
            </Grid>
            <Grid item xs zeroMinWidth />
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ mt: -2.5, fontWeight: 400 }}
              color="inherit"
              variant="h5"
            >
              <FormattedMessage id="Monthly Billed Obtained" />
            </Typography>
          </Grid>
          <Grid
            item
            container
            justifyContent="space-around"
            alignItems="center"
            spacing={3}
          >
            <Grid item>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Typography
                    sx={{
                      width: 40,
                      height: 40,
                      color: theme.palette.secondary.main,
                      borderRadius: '12px',
                      padding: 1,
                      backgroundColor:
                        theme.palette.mode === 'dark'
                          ? theme.palette.background.default
                          : theme.palette.secondary.light,
                    }}
                  >
                    <IconCreditCard stroke={1.5} />
                  </Typography>
                </Grid>
                <Grid item sm zeroMinWidth>
                  <Typography variant="h4">
                    {data.monthlyBilled + ' €'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Typography
                    sx={{
                      width: 40,
                      height: 40,
                      color: theme.palette.primary.main,
                      borderRadius: '12px',
                      padding: 1,
                      backgroundColor:
                        theme.palette.mode === 'dark'
                          ? theme.palette.background.default
                          : theme.palette.primary.light,
                    }}
                  >
                    <IconCircles stroke={1.5} />
                  </Typography>
                </Grid>
                <Grid item sm zeroMinWidth>
                  <Typography variant="h4">
                    {data.monthlyGoal + ' €'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs zeroMinWidth />
          </Grid>
        </Grid>
      </Box>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={200}
      />
    </MainCard>
  );
};
export default injectIntl(ChartGoalsBilled);
