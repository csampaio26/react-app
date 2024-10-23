// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from '../../utils/axios';
import { dispatch } from '../index';

// types
import { DefaultRootStateProps } from '../../types';
import { ResetPassword } from 'types/auth';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['user'] = {
  error: null,
  users: []
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // GET USERS
    getUsersSuccess(state, action) {
      state.users = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getUsers() {
  return async () => {
    try {
      const response = await axios.get('/User');
      dispatch(slice.actions.getUsersSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function resetPassword(values: ResetPassword) {
  return async () => {
    try {
      await axios.post('/auth/change-password', values);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
