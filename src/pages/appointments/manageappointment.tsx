import React from 'react';

// material-ui
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
  createFilterOptions,
} from '@mui/material';

// third party
import { useFormik } from 'formik';
import * as yup from 'yup';

// project imports
import { FormattedMessage, injectIntl } from 'react-intl';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { Appointment } from 'types/appointment';
import AnimateButton from 'ui-component/extended/AnimateButton';

import { DateTimePicker } from '@mui/lab';
import { SaveAppointment, UpdateAppointment } from 'api/appointments';
import { GetAllClients } from 'api/clients';
import useConfig from 'hooks/useConfig';
import { Client } from 'types/client';

interface Props {
  open: boolean;
  handleDrawerOpen: () => void;
  appointment?: Appointment;
  intl: any;
}

// ==============================|| MANAGE APPOINTMENT ||============================== //

const ManageAppointment = ({
  open,
  handleDrawerOpen,
  appointment,
  intl,
}: Props) => {
  const validationSchema = yup.object({
    contact: yup
      .string()
      .required(intl.formatMessage({ id: 'Contact is required' })),
    client: yup.object({
      name: yup
        .string()
        .required(intl.formatMessage({ id: 'Client is required' })),
    }),
    registration: yup
      .string()
      .required(intl.formatMessage({ id: 'Registration is required' })),
    service: yup
      .string()
      .required(intl.formatMessage({ id: 'Service is required' })),
    price: yup
      .number()
      .required(intl.formatMessage({ id: 'Price is required' })),
  });
  const [dataClients, setClients] = React.useState<Client[]>([]);
  const [contacts, setContacts] = React.useState<string[]>([]);

  const dispatch = useDispatch();
  const { storeAuto } = useConfig();

  const formik = useFormik({
    initialValues: {
      id: appointment?.id ?? '',
      store: appointment?.store ?? storeAuto!,
      client: {
        name: appointment?.client.name ?? '',
        contact: appointment?.client.contact ?? '',
        registration: appointment?.client.registration ?? '',
      },
      contact: appointment?.contact ?? '',
      registration: appointment?.registration ?? '',
      appointmentdate: appointment?.appointmentdate ?? new Date(),
      pickingdate: appointment?.pickingdate ?? new Date(),
      service: appointment?.service ?? '',
      price: appointment?.price ?? 0,
      missed: false,
      obs: '',
      transfered: false,
      deleted: false,
    },
    validationSchema,
    onSubmit: async (values: Appointment) => {
      values.client = {
        ...values.client,
        contact: values.contact,
        registration: values.registration,
      };

      if (appointment !== undefined) {
        await UpdateAppointment(values);

        handleDrawerOpen();
      } else {
        await SaveAppointment(values);

        handleDrawerOpen();
        dispatch(
          openSnackbar({
            open: true,
            message: <FormattedMessage id="Appointment saved successfully" />,
            variant: 'alert',
            alert: {
              color: 'success',
            },
            close: false,
          })
        );
      }
    },
  });

  React.useEffect(() => {
    if (appointment === undefined) {
      formik.resetForm();
    } else if (appointment !== undefined) {
      formik.setValues(appointment);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  React.useEffect(() => {
    let clients: Client[] = [];
    GetAllClients().then((result) => {
      setClients(result.data.data);
      clients = result.data.data;

      const allContacts = clients
        .map((x: Client) => x.contacts!.map((y: string) => y))
        .flat();
      const contactsUnique = [...new Set(allContacts)];
      setContacts(contactsUnique);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterOptions = createFilterOptions({
    limit: 10,
  });

  return (
    <Drawer
      sx={{
        ml: open ? 3 : 0,
        flexShrink: 0,
        zIndex: 1200,
        overflowX: 'hidden',
        width: { xs: 320, md: 450 },
        '& .MuiDrawer-paper': {
          height: '100vh',
          width: { xs: 320, md: 450 },
          position: 'fixed',
          border: 'none',
          borderRadius: '0px',
        },
      }}
      variant="temporary"
      anchor="right"
      open={open}
      ModalProps={{ keepMounted: true }}
      onClose={handleDrawerOpen}
    >
      {open && (
        <Box sx={{ p: 3 }}>
          <form onSubmit={formik.handleSubmit}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h4">
                    {appointment === undefined ? (
                      <FormattedMessage id="New Appointment" />
                    ) : (
                      <FormattedMessage id="Edit Appointment" />
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Stack>
                    <InputLabel required>
                      <FormattedMessage id="Contact" />
                    </InputLabel>
                    <Autocomplete
                      id="contactAutoComplete"
                      value={formik.values.contact}
                      onChange={(event, value) => {
                        const selectedClient =
                          dataClients.find((x: Client) =>
                            x.contacts!.some((y: string) => y === value)
                          ) || null;
                        if (selectedClient == null) {
                          formik.resetForm();
                        } else {
                          formik.setFieldValue(
                            'client.name',
                            selectedClient?.name
                          );
                          formik.setFieldValue(
                            'client.registrations',
                            selectedClient?.registrations
                          );
                          formik.setFieldValue('contact', value);
                        }
                      }}
                      options={contacts}
                      freeSolo
                      handleHomeEndKeys
                      fullWidth
                      autoHighlight
                      size="small"
                      getOptionLabel={(option: any) => option}
                      filterOptions={filterOptions}
                      isOptionEqualToValue={(option) =>
                        option === formik.values.contact
                      }
                      renderOption={(props, option: any) => (
                        <Box
                          component="li"
                          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          {option}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          inputProps={{
                            ...params.inputProps,
                            type: 'search',
                          }}
                          id="contact"
                          name="contact"
                          onChange={formik.handleChange}
                          error={Boolean(
                            formik.touched.contact && formik.errors.contact
                          )}
                          helperText={
                            formik.touched.contact && formik.errors.contact
                          }
                        />
                      )}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack>
                    <InputLabel required>
                      <FormattedMessage id="Name" />
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="client.name"
                      name="client.name"
                      size="small"
                      value={formik.values.client.name}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={Boolean(
                        formik.touched.client?.name &&
                          formik.errors.client?.name
                      )}
                      helperText={
                        formik.touched.client?.name &&
                        formik.errors.client?.name
                      }
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack>
                    <InputLabel required>
                      <FormattedMessage id="Registration" />
                    </InputLabel>
                    <Autocomplete
                      id="registrationAutoComplete"
                      value={formik.values.registration}
                      onChange={(event, value) => {
                        formik.setFieldValue('registration', value);
                      }}
                      options={formik.values.client.registrations || ['']}
                      fullWidth
                      autoHighlight
                      freeSolo
                      size="small"
                      getOptionLabel={(option) => option}
                      isOptionEqualToValue={(option) =>
                        option === formik.values.registration
                      }
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          {option}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          inputProps={{
                            ...params.inputProps,
                            type: 'search',
                          }}
                          id="registration"
                          name="registration"
                          onChange={formik.handleChange}
                          error={Boolean(
                            formik.touched.registration &&
                              formik.errors.registration
                          )}
                          helperText={
                            formik.touched.registration &&
                            formik.errors.registration
                          }
                        />
                      )}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack>
                    <InputLabel required>
                      <FormattedMessage id="Service" />
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="service"
                      name="service"
                      size="small"
                      value={formik.values.service}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.service && Boolean(formik.errors.service)
                      }
                      helperText={
                        formik.touched.service && formik.errors.service
                      }
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack>
                    <InputLabel required>
                      <FormattedMessage id="Price" />
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="price"
                      name="price"
                      size="small"
                      type="number"
                      inputProps={{ inputMode: 'numeric' }}
                      value={formik.values.price}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.price && Boolean(formik.errors.price)
                      }
                      helperText={formik.touched.price && formik.errors.price}
                      onChange={formik.handleChange}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack>
                    <InputLabel required>
                      <FormattedMessage id="Appointment Date" />
                    </InputLabel>
                    <DateTimePicker
                      value={formik.values.appointmentdate}
                      label=" "
                      inputFormat="dd/MM/yyyy HH:mm"
                      ampm={false}
                      onChange={(date: any) => {
                        formik.setFieldValue('appointmentdate', date);
                      }}
                      renderInput={(props: any) => (
                        <TextField size="small" fullWidth {...props} />
                      )}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack>
                    <InputLabel required>
                      <FormattedMessage id="Picking Date" />
                    </InputLabel>
                    <DateTimePicker
                      label=" "
                      value={formik.values.pickingdate}
                      inputFormat="dd/MM/yyyy HH:mm"
                      ampm={false}
                      onChange={(date: any) => {
                        formik.setFieldValue('pickingdate', date);
                      }}
                      renderInput={(props: any) => (
                        <TextField size="small" fullWidth {...props} />
                      )}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack
                    direction="row"
                    justifyContent="flex-end"
                    columnGap="20px"
                  >
                    <AnimateButton>
                      <Button
                        variant="outlined"
                        onClick={() => handleDrawerOpen()}
                      >
                        <FormattedMessage id="Cancel" />
                      </Button>
                    </AnimateButton>
                    <AnimateButton>
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                      >
                        <FormattedMessage id="Save" />
                      </Button>
                    </AnimateButton>
                  </Stack>
                </Grid>
              </Grid>
            </LocalizationProvider>
          </form>
        </Box>
      )}
    </Drawer>
  );
};
export default injectIntl(ManageAppointment);
