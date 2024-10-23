import { ResetPassword } from 'types/auth';
import axios from '../utils/axios';

export const GetUsers = async () => axios.get(`/User`);

export const ChangeUserPassword = async (values: ResetPassword) => axios.post('/auth/change-password', values);
