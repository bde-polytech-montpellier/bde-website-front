import { DbInfo, TileActionsInfo } from "./index";

export interface PartnerResponse extends DbInfo {
  partner_id?: string;
  partner_name?: string;
  partner_short_description?: string;
  partner_pic?: string;
  partner_description?: string;
  partner_mail?: string;
  partner_website?: string;
}

export interface PartnerTileActions extends TileActionsInfo {
  partner: PartnerResponse;
  setInfo?: React.Dispatch<React.SetStateAction<PartnerResponse>>;
}
