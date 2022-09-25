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

export interface ClubFormActions extends ClubTileActions {
  open: boolean;
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CreateUpdateClubRequest {
  name: string;
  pic: File | undefined;
  imgChanged: boolean;
  short_description: string;
  description: string;
  fb: string;
  ig: string;
}
