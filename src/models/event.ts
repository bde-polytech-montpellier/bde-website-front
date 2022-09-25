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
