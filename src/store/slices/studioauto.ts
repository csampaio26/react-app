// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from '../../utils/axios';
import { dispatch } from '../index';

// types
import { DefaultRootStateProps } from '../../types';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['storeauto'] = {
  error: null,
  storesauto: [],
};

const slice = createSlice({
  name: 'storeauto',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // GET storeS AUTO
    getstoresAutoSuccess(state, action) {
      state.storesauto = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getstoresAuto() {
  return async () => {
    try {
      const response = await axios.get('/store');
      dispatch(slice.actions.getstoresAutoSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
