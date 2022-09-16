export interface User {
  id?: string;
  name?: string;
  mail?: string;
  role?: string;
  token?: string;
}

export interface SnackbarState {
  open: boolean;
  severity: string;
  message: string;
}

export interface NavbarParams {
  loggedUser: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  removeCookie: (name: "token") => void;
  setSnackbarState: React.Dispatch<React.SetStateAction<SnackbarState>>;
}

export interface InputError {
  component: string;
  error: string;
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
