import { DbInfo, SnackbarState } from "./index";

export interface UserResponse extends DbInfo {
  polyuser_id?: string;
  polyuser_name?: string;
  polyuser_mail?: string;
  role_id?: number;
  role_name?: string;
}

export interface CookieUser {
  id?: string;
  name?: string;
  mail?: string;
  role?: string;
  token?: string;
}

export interface NavbarParams {
  loggedUser: CookieUser;
  setUser: React.Dispatch<React.SetStateAction<CookieUser>>;
  removeCookie: (name: "token") => void;
  setSnackbarState: React.Dispatch<React.SetStateAction<SnackbarState>>;
}

export interface SignInParams {
  setSnackbarState: React.Dispatch<React.SetStateAction<SnackbarState>>;
  setUser: React.Dispatch<React.SetStateAction<CookieUser>>;
  setCookie: (name: "token", value: any, options?: any) => void;
}

export interface SignupParams {
  setSnackbarState: React.Dispatch<React.SetStateAction<SnackbarState>>;
  setUser: React.Dispatch<React.SetStateAction<CookieUser>>;
  user: CookieUser;
  removeCookie: (name: "token") => void;
}
