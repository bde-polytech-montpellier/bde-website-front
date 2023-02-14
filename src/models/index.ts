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

/**
 * Allows to use a single "edit/delete" component for each entity types
 * @param api the api call to use
 * @param entity the associated entity
 * @param openForm function to fill and open the form
 * @param setInfo the setter for the entity (will soon be removed)
 */
export interface TileActionsArgs {
  api?: string;
  entity?: DbInfo;
  openForm?: Function;
  setInfo?: React.Dispatch<React.SetStateAction<DbInfo>>;
}

export interface TileActionsInfo {
  TileActions?: React.FC<TileActionsArgs>;
  setOpenForm?: React.Dispatch<React.SetStateAction<boolean>>;
}
