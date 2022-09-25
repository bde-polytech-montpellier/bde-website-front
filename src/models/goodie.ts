import { DbInfo, TileActionsInfo } from "./index";

export interface GoodieResponse extends DbInfo {
  goodie_id?: string;
  goodie_name?: string;
  goodie_description?: string;
  goodie_pic?: string;
  goodie_price?: number;
}

export interface GoodieTileActions extends TileActionsInfo {
  goodie: GoodieResponse;
  setInfo?: React.Dispatch<React.SetStateAction<GoodieResponse>>;
}

export interface GoodieFormActions extends GoodieTileActions {
  open: boolean;
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CreateUpdateGoodieRequest {
  name: string;
  pic: File | undefined;
  imgChanged: boolean;
  description: string;
  price: number | undefined;
}
