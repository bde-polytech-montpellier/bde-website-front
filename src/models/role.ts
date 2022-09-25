import { DbInfo } from "./index";

export interface RoleResponse extends DbInfo {
  role_id?: number;
  role_name?: string;
}
