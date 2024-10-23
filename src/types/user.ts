import { StoreAuto } from './storeauto';

export interface UserStateProps {
  users: User[];
  error: object | string | null;
}

export enum RoleDescription {
  admin,
  super_admin,
  user,
}
export type Role = {
  description: RoleDescription;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  storesauto: StoreAuto[];
  store: StoreAuto;
};
