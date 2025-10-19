import { IUserAuthResponse } from "../../dto/auth/auth.dto";

export interface IAuthState {
  user: IUserAuthResponse | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}