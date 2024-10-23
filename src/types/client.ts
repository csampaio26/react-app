import { Pagination } from './pagination';
import { StoreAuto } from './storeauto';

export interface ClientStateProps {
  clients: Client[];
  error: object | string | null;
  clientsPaginated: Client[];
  pagination: Pagination;
}

export type Client = {
  id?: string;
  name: string;
  contacts?: string[];
  taxpayer?: number;
  address?: string;
  registrations?: string[];
  store?: StoreAuto;
  registration?: string;
  contact?: string;
};
