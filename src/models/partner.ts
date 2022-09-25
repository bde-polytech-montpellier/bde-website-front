import { IDbInfo, ITileActionInfo } from "./index";

export interface IPartner extends IDbInfo {
  partner_id?: string;
  partner_name?: string;
  partner_short_description?: string;
  partner_pic?: string;
  partner_description?: string;
  partner_mail?: string;
  partner_website?: string;
}

export interface IPartnerTile extends ITileActionInfo {
  partner: IPartner;
  setInfo?: React.Dispatch<React.SetStateAction<IPartner>>;
}

export interface IPartnerForm extends IPartnerTile {
  open: boolean;
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IPartnerFormData {
  name: string;
  pic: File | undefined;
  imgChanged: boolean;
  short_description: string;
  description: string;
  mail: string;
  website: string;
}
