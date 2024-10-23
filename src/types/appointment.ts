import { Client } from './client';
import { StoreAuto } from './storeauto';

export type Appointment = {
  id: string;
  client: Client;
  appointmentdate: Date;
  pickingdate: Date;
  service: string;
  price: number;
  obs: string;
  missed: boolean;
  transfered: boolean;
  store: StoreAuto;
  registration: string;
  contact: string;
  deleted: boolean;
  virtualTotal?: number;
};
