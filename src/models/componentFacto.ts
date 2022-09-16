import { IDbInfo } from "./tiles";

export interface ITileActions {
  api?: string;
  entity?: IDbInfo;
  openForm?: React.Dispatch<React.SetStateAction<boolean>>;
  setInfo?: React.Dispatch<React.SetStateAction<IDbInfo>>;
}

export interface ICard {
  id: string;
  img?: string;
  header: React.FC;
  body: React.FC;
  footer?: React.FC;
  dialogTitle?: React.FC;
  dialogBodyText?: string;
}
