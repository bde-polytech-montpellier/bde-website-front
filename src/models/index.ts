import { TileActions } from "./componentFacto";

export interface SnackbarState {
  open: boolean;
  severity: string;
  message: string;
}

export interface InputError {
  component: string;
  error: string;
}

export interface DbInfo {}

export interface PrevTeam {
  name: string;
  img: string;
}

export interface TileActionsInfo {
  TileActions?: React.FC<TileActions>;
  setOpenForm?: React.Dispatch<React.SetStateAction<boolean>>;
}
