import { DbInfo, TileActionsInfo } from "./index";

export interface EventResponse extends DbInfo {
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
  event_price_follower?: number;
  event_club_id?: string;
  club_name?: string;
}

export interface EventTileActions extends TileActionsInfo {
  event: EventResponse;
  setInfo?: React.Dispatch<React.SetStateAction<EventResponse>>;
}

export interface EventFormActions extends EventTileActions {
  open: boolean;
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CreateUpdateEventRequest {
  name: string;
  short_description: string;
  imgChanged: boolean;
  pic: File | undefined;
  description: string;
  date: string;
  time: string;
  place: string;
  datetime: string;
  price: number | undefined;
  follower_price: number | undefined;
  club_id: string;
  club_name: string;
}
