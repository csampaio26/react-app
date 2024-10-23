export interface storeAutoStateProps {
  storesauto: StoreAuto[];
  error: object | string | null;
}

export type StoreAuto = {
  description: string;
  id: string;
};
