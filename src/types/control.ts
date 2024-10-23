import { Pagination } from './pagination';
import { StoreAuto } from './storeauto';

export interface ControlStateProps {
  controls: Control[];
  error: object | string | null;
  pagination: Pagination;
}

export type Control = {
  id?: string;
  date: Date;
  store: StoreAuto;
};
