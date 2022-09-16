import * as React from "react";
import { ITileActions } from "./componentFacto";
export interface IDbInfo {}

export interface IClub extends IDbInfo {
  club_id?: string;
  club_name?: string;
  club_short_description?: string;
  club_pic?: string;
  club_description?: string;
  club_fb?: string;
  club_ig?: string;
}

export interface IEvent extends IDbInfo {
  event_id?: string;
  event_name?: string;
  event_short_description?: string;
  event_pic?: string;
  event_description?: string;
  event_date?: string;
  event_time?: string;
  event_place?: string;
  event_datetime?: string;
  event_price?: number;
  event_follower_price?: number;
  event_club_id?: string;
  club_name?: string;
}

export interface IGoodie extends IDbInfo {
  goodie_id?: string;
  goodie_name?: string;
  goodie_description?: string;
  goodie_pic?: string;
  goodie_price?: number;
}

export interface IPartner extends IDbInfo {
  partner_id?: string;
  partner_name?: string;
  partner_short_description?: string;
  partner_pic?: string;
  partner_description?: string;
  partner_mail?: string;
  partner_website?: string;
}

export interface IPrevTeam {
  name: string;
  img: string;
}

export interface ITileActionInfo {
  TileActions?: React.FC<ITileActions>;
  openForm?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IClubTile extends ITileActionInfo {
  club: IClub;
  setInfo?: React.Dispatch<React.SetStateAction<IClub>>;
}

export interface IEventTile extends ITileActionInfo {
  event: IEvent;
  setInfo?: React.Dispatch<React.SetStateAction<IEvent>>;
}

export interface IGoodieTile extends ITileActionInfo {
  goodie: IGoodie;
  setInfo?: React.Dispatch<React.SetStateAction<IGoodie>>;
}

export interface IPartnerTile extends ITileActionInfo {
  partner: IPartner;
  setInfo?: React.Dispatch<React.SetStateAction<IPartner>>;
}

export interface IFormParams {}

export interface IClubForm extends IFormParams {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  club: IClub;
}

export interface IEventForm extends IFormParams {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  event: IEvent;
}

export interface IGoodieForm extends IFormParams {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  goodie: IGoodie;
}

export interface IPartnerForm extends IFormParams {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  partner: IPartner;
}

export interface IUser {
  polyuser_id?: string;
  polyuser_name?: string;
  polyuser_mail?: string;
  role_id?: number;
  role_name?: string;
}

export interface IRole {
  role_id?: number;
  role_name?: string;
}
