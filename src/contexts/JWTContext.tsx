import React, { createContext, useEffect, useReducer } from 'react';

// third-party
import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'ui-component/Loader';
import axios from 'utils/axios';
import { InitialLoginContextProps, KeyedObject } from 'types';
import { JWTContextType } from 'types/auth';

// constant
const initialState: InitialLoginContextProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
};

const verifyToken: (st: string) => boolean = (serviceToken) => {
  if (!serviceToken) {
    return false;
  }

  const decoded: KeyedObject = jwtDecode(serviceToken);
  /**
   * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
   */
  return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken?: string | null) => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem('serviceToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = window.localStorage.getItem('serviceToken');
        if (serviceToken && verifyToken(serviceToken)) {
          setSession(serviceToken);

          const responseInfo = await axios.get('/info');
          const user = responseInfo.data.data.user;
          if (!user) {
            dispatch({
              type: LOGOUT,
            });
            return;
          }

          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user: {
                email: user.email,
                id: user.id,
                name: user.name,
                role: user.role,
                storesauto: responseInfo.data.data.stores,
                store: user.store,
              },
            },
          });
        } else {
          dispatch({
            type: LOGOUT,
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: LOGOUT,
        });
      }
    };

    init();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post('/auth/login/', {
      email,
      password,
    });

    if (response == undefined) {
      throw new TypeError('Wrong password!');
    }

    const serviceToken = response.data.data.token;
    setSession(serviceToken);

    const responseInfo = await axios.get('/info');
    const user = responseInfo.data.data.user;

    setSession(serviceToken);
    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        user: {
          email: user.email,
          id: user.id,
          name: user.name,
          role: user.role,
          storesauto: responseInfo.data.data.stores,
          store: user.store,
        },
      },
    });
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  const resetPassword = (email: string) => console.log(email);

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return (
    <JWTContext.Provider value={{ ...state, login, logout, resetPassword }}>
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;
