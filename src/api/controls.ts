import { Control } from 'types/control';
import { StoreAuto } from 'types/storeauto';
import axios from '../utils/axios';

export const GetControls = async (
  page: number,
  limit: number,
  store: StoreAuto,
  sorter: String
) => axios.get(`/Control/store/${page}/${limit}/${store.id}?&sorter=${sorter}`);

export const DeleteControl = async (control: Control) =>
  axios.delete('/Control/' + control.id);

export const SaveControl = async (control: Control) =>
  axios.post('/Control/', control);
export const GetAllControls = async (store: StoreAuto) =>
  axios.get(`/Control/store/${store.id}`);
export const DeleteManyControl = async (store: StoreAuto) =>
  axios.delete(`/Control/deleteMany/${store.id}`);
