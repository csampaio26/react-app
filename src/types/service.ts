import { Appointment } from './appointment';
import { Client } from './client';
import { StoreAuto } from './storeauto';
import { Pagination } from './pagination';

export interface ServiceStateProps {
  services: Service[];
  allServices: Service[];
  pagination: Pagination;
  error: object | string | null;
}

export type Service = {
  id: string;
  client: Client;
  contact: string;
  registration: string;
  deliverydate: Date;
  services: { service: string; value: number }[];
  store: StoreAuto;
  done: boolean;
  payed: boolean;
  appointment?: Appointment;
  deleted: boolean;
  virtualTotal?: number;
};
