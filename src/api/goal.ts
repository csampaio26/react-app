import { Goal } from 'types/goal';
import { StoreAuto } from 'types/storeauto';
import axios from '../utils/axios';

export const GetGoals = async (store: StoreAuto) =>
  axios.get(`/Goal/store/${store.id}`);
export const GetGoalsAll = async (store: StoreAuto) =>
  axios.get(`/Goal/storeAll/${store.id}`);
export const SaveGoal = async (goal: Goal) => axios.post('/Goal/', goal);
export const DeleteManyGoals = async (store: StoreAuto) =>
  axios.delete(`/Goal/deleteMany/${store.id}`);
