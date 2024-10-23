import { Service } from 'types/service';
import { StoreAuto } from 'types/storeauto';
import axios from '../utils/axios';

export const GetServices = async (
  page: any,
  limit: any,
  sorter: any,
  store: StoreAuto,
  globalFilters: string
) =>
  axios.get(
    `service/store/${page}/${limit}/${store.id}?filter=${JSON.stringify({
      deleted: false,
    })}&sorter=${sorter}&globalFilters=${globalFilters}`
  );

export const UpdateService = async (service: Service) =>
  axios.put('/Service/' + service.id, service);

export const DeleteService = async (service: Service) =>
  axios.delete('/Service/' + service.id);

export const SaveService = async (service: Service) =>
  axios.post('/Service/', service);

export const GetAllServices = async (store: StoreAuto) =>
  axios.get(`/Service/store/${store.id}`);

export const DeleteManyService = async (store: StoreAuto) =>
  axios.delete(`/Service/deleteMany/${store.id}`);
