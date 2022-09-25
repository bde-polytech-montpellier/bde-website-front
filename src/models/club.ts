import { IDbInfo, ITileActionInfo } from "./index";

export interface IClub extends IDbInfo {
  club_id?: string;
  club_name?: string;
  club_short_description?: string;
  club_pic?: string;
  club_description?: string;
  club_fb?: string;
  club_ig?: string;
}

export interface IClubTile extends ITileActionInfo {
  club: IClub;
  setInfo?: React.Dispatch<React.SetStateAction<IClub>>;
}

export interface IClubForm extends IClubTile {
  open: boolean;
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IClubFormData {
  name: string;
  pic: File | undefined;
  imgChanged: boolean;
  short_description: string;
  description: string;
  fb: string;
  ig: string;
}
