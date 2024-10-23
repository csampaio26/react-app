// action - state management
import { LOGIN, LOGOUT } from './actions';
import { InitialLoginContextProps } from 'types';

// ==============================|| ACCOUNT REDUCER ||============================== //

const initialState: InitialLoginContextProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

interface AccountReducerActionProps {
  type: string;
  payload?: InitialLoginContextProps;
}

const accountReducer = (state = initialState, action: AccountReducerActionProps) => {
  switch (action.type) {
    case LOGIN: {
      const { user } = action.payload!;
      return {
        ...state,
        isLoggedIn: true,
        isInitialized: true,
        user
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isInitialized: true,
        isLoggedIn: false,
        user: null
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default accountReducer;
