import { IDbInfo, SnackbarState } from "./index";

export interface IUser extends IDbInfo {
  polyuser_id?: string;
  polyuser_name?: string;
  polyuser_mail?: string;
  role_id?: number;
  role_name?: string;
}

export interface User {
  id?: string;
  name?: string;
  mail?: string;
  role?: string;
  token?: string;
}

export interface NavbarParams {
  loggedUser: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  removeCookie: (name: "token") => void;
  setSnackbarState: React.Dispatch<React.SetStateAction<SnackbarState>>;
}

export interface SignInParams {
  setSnackbarState: React.Dispatch<React.SetStateAction<SnackbarState>>;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setCookie: (name: "token", value: any, options?: any) => void;
}

export interface SignupParams {
  setSnackbarState: React.Dispatch<React.SetStateAction<SnackbarState>>;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  user: User;
  removeCookie: (name: "token") => void;
}
