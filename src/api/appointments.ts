import { Appointment } from 'types/appointment';
import { StoreAuto } from 'types/storeauto';
import axios from '../utils/axios';

export const GetAppointments = async (
  page: any,
  limit: any,
  sorter: any,
  store: StoreAuto,
  globalFilters: string,
  filters?: string
) =>
  axios.get(
    `appointment/store/${page}/${limit}/${store.id}?filter=${JSON.stringify({
      missed: false,
      deleted: false,
    })}&sorter=${sorter}&globalFilters=${globalFilters}&filters=${filters}`
  );

export const GetMissedAppointments = async (
  page: any,
  limit: any,
  sorter: any,
  store: StoreAuto,
  globalFilters: string,
  filters?: string
) =>
  axios.get(
    `appointment/store/${page}/${limit}/${store.id}?filter=${JSON.stringify({
      missed: true,
      deleted: false,
    })}&sorter=${sorter}&globalFilters=${globalFilters}&filters=${filters}`
  );

export const UpdateAppointment = async (appointment: Appointment) =>
  axios.put('/Appointment/' + appointment.id, appointment);

export const DeleteAppointment = async (appointment: Appointment) =>
  axios.delete('/Appointment/' + appointment.id);

export const SaveAppointment = async (appointment: Appointment) =>
  axios.post('/Appointment/', appointment);

export const GetAllAppointments = async (store: StoreAuto) =>
  axios.get(`/Appointment/store/${store.id}`);

export const DeleteManyAppointments = async (store: StoreAuto) =>
  axios.delete(`/Appointment/deleteMany/${store.id}`);
