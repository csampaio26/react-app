// project imports
import { User } from 'types/user';

export interface JWTData {
  userId: string;
}

export type JWTContextType = {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: User | null | undefined;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => void;
};

export type ResetPassword = { user: User; repeat_password?: string; new_password?: string };
