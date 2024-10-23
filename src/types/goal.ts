import { StoreAuto } from './storeauto';

export interface GoalStateProps {
  goals: Goal[];
  error: object | string | null;
}

export type Goal = {
  id?: string;
  store: StoreAuto;
  goal: number;
  deleted: boolean;
  date: Date;
};
