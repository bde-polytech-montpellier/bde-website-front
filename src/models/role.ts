import { IDbInfo } from "./index";

export interface IRole extends IDbInfo {
  role_id?: number;
  role_name?: string;
}
