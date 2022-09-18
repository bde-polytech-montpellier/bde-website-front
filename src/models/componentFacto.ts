import { IDbInfo } from "./tiles";

export interface ITileActions {
  api?: string;
  entity?: IDbInfo;
  openForm?: Function;
  setInfo?: React.Dispatch<React.SetStateAction<IDbInfo>>;
}

export interface ICard {
  id: string;
  img?: string;
  header?: React.FC;
  name: string;
  body: React.FC;
  footer: React.FC;
  dialogTitle: React.FC;
  dialogBodyText: string;
}

export interface ICardContainer {
  title: string;
  subtitle: string;
  cards: JSX.Element[];
}
