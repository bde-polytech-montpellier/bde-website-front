import { DbInfo, TileActionsInfo } from "./index";

export interface ClubResponse extends DbInfo {
  club_id?: string;
  club_name?: string;
  club_short_description?: string;
  club_pic?: string;
  club_description?: string;
  club_fb?: string;
  club_ig?: string;
}

export interface ClubTileActions extends TileActionsInfo {
  club: ClubResponse;
  setInfo?: React.Dispatch<React.SetStateAction<ClubResponse>>;
}
