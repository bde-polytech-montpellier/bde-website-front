import { users } from "./roots";

export const getUser = (id: string) => users + id;
export const getUsersFromName = (name: string) => users + "name/" + name;
export const updateUserPermission = () => users + "permissions";
