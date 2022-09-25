import { ITileActions } from "./componentFacto";

export interface SnackbarState {
  open: boolean;
  severity: string;
  message: string;
}

export interface InputError {
  component: string;
  error: string;
}

export interface IDbInfo {}

export interface IPrevTeam {
  name: string;
  img: string;
}

export interface ITileActionInfo {
  TileActions?: React.FC<ITileActions>;
  setOpenForm?: React.Dispatch<React.SetStateAction<boolean>>;
}
