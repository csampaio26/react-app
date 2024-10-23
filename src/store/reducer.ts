// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project imports
import menuReducer from './slices/menu';
import snackbarReducer from './slices/snackbar';
import storeautoReducer from './slices/storeauto';
import userReducer from './slices/userSlice';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  snackbar: snackbarReducer,
  user: userReducer,
  storeauto: persistReducer(
    {
      key: 'storeauto',
      storage,
      keyPrefix: 'berry-',
    },
    storeautoReducer
  ),
  menu: menuReducer,
});

export default reducer;
