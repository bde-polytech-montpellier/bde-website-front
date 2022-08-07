import {users} from "./roots"

export const getUser = (id) => users + id
export const getUsersFromName = (name) => users + "name/" + name
export const updateUserPermission = () => users + "permissions"