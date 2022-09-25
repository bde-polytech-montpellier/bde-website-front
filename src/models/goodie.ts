import { IDbInfo, ITileActionInfo } from "./index";

export interface IGoodie extends IDbInfo {
  goodie_id?: string;
  goodie_name?: string;
  goodie_description?: string;
  goodie_pic?: string;
  goodie_price?: number;
}

export interface IGoodieTile extends ITileActionInfo {
  goodie: IGoodie;
  setInfo?: React.Dispatch<React.SetStateAction<IGoodie>>;
}

export interface IGoodieForm extends IGoodieTile {
  open: boolean;
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IGoodieFormData {
  name: string;
  pic: File | undefined;
  imgChanged: boolean;
  description: string;
  price: number | undefined;
}
