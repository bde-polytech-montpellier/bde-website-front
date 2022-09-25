import { DbInfo } from "./index";

export interface TileActions {
  api?: string;
  entity?: DbInfo;
  openForm?: Function;
  setInfo?: React.Dispatch<React.SetStateAction<DbInfo>>;
}

export interface CardArgs {
  id: string;
  img?: string;
  header?: React.FC;
  name: string;
  body: React.FC;
  footer: React.FC;
  dialogTitle: React.FC;
  dialogBodyText: string;
}

export interface CardContainer {
  title: string;
  subtitle: string;
  cards: JSX.Element[];
}
