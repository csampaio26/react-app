import { Client } from 'types/client';
import { StoreAuto } from 'types/storeauto';
import axios from '../utils/axios';

export const GetClients = async (
  page: any,
  limit: any,
  sorter: any,
  store: StoreAuto,
  globalFilters: string,
  filter: String = ''
) =>
  axios.get(
    `/Client/store/${page}/${limit}/${store.id}?filter=${filter}&sorter=${sorter}&globalFilters=${globalFilters}`
  );

export const UpdateClient = async (client: Client) =>
  axios.put('/Client/' + client.id, client);

export const DeleteClient = async (client: Client) =>
  axios.delete('/Client/' + client.id);

export const SaveClient = async (client: Client) =>
  axios.post('/Client/', client);

export const GetAllClients = async () => axios.get(`/Client/`);
